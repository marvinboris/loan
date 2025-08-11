import xlsx from 'xlsx';
import {
  BorrowValidationInput,
  KycValidationInput,
  ManualAssignmentInput,
  ReleaseInput,
} from './interfaces';
import { config } from '../../../../config';
import { supabase } from '../../../../lib';
import {
  CreateCustomerInput,
  CustomerType,
  KycStatus,
  LoanStatus,
} from '../../../../types';
import { payCustomer, sendSms } from '../../../../utils';

export const telemarketingService = {
  async importCustomers(type: CustomerType, buffer: Buffer) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return {
        success: false,
        message: 'The file contains no sheet',
      };
    }

    const worksheet = workbook.Sheets[sheetName];
    const rows: object[] = xlsx.utils.sheet_to_json(worksheet);

    if (rows.length === 0) {
      return { success: false, message: 'File is empty or wrong formatted' };
    }

    await processCustomers(type)(rows);

    return {
      success: true,
      message: 'The file has been successfully imported',
    };
  },

  async kycValidation(input: KycValidationInput) {
    const { data: kyc, error } = await supabase
      .from('kyc')
      .update({
        status: input.validated ? KycStatus.SUCCESS : KycStatus.FAILED,
      })
      .eq('id', input.id)
      .select(
        `
        *,
        customers:customer_id (mobile)
        `
      )
      .single();

    if (input.validated)
      await supabase
        .from('customers')
        .update({
          app_name: config.appName,
          name: [kyc.first_name, kyc.last_name].filter(Boolean).join(' '),
        })
        .eq('id', kyc.customer_id);

    if (error)
      return {
        success: false,
        message: 'KYC validation response not submitted',
      };

    let message;
    if (input.validated) message = 'Your KYC request has been validated.';
    else
      message =
        [
          'Your KYC application has been denied',
          input.reason
            ? 'for the following reason: ' + input.reason
            : undefined,
        ]
          .filter(Boolean)
          .join(' ') + '.';

    await sendSms(kyc.customers.mobile, message);

    return {
      success: true,
      message: 'KYC validation response submitted successfully',
    };
  },

  async borrowValidation(input: BorrowValidationInput) {
    const { data: loan, error } = await supabase
      .from('loans')
      .update({
        loan_status: input.validated ? LoanStatus.ACCEPTED : LoanStatus.DENIED,
      })
      .eq('id', input.id)
      .select(
        `
        *,
        customers:customer_id (mobile, account)
        `
      )
      .single();

    if (input.validated) {
      const customerPaid = await payCustomer(
        loan.customers.account,
        loan.loan_amount
      );
      console.log(customerPaid ? 'Customer paid' : 'Customer not paid');
    }

    if (error)
      return {
        success: false,
        message: 'Borrow validation response not submitted',
      };

    let message;
    if (input.validated) message = 'Your borrow request has been validated.';
    else
      message =
        [
          'Your borrow application has been denied',
          input.reason
            ? 'for the following reason: ' + input.reason
            : undefined,
        ]
          .filter(Boolean)
          .join(' ') + '.';

    await sendSms(loan.customers.mobile, message);

    return {
      success: true,
      message: 'Borrow validation response submitted successfully',
    };
  },

  async manualAssignment(input: ManualAssignmentInput) {
    const { error } = await supabase
      .from('customers')
      .update({
        telemarketer_id: input.id,
        allocation_time: new Date().toISOString(),
      })
      .in('id', input.selected)
      .select();

    if (error) return { success: false, message: 'Manual assignment failed' };

    return { success: true, message: 'Manual assignment done successfully' };
  },

  async release(input: ReleaseInput) {
    const { error } = await supabase
      .from('customers')
      .update({
        telemarketer_id: null,
      })
      .in('id', input.selected)
      .select();

    if (error) return { success: false, message: 'Release failed' };

    return { success: true, message: 'Release done successfully' };
  },
};

function processCustomers(type: CustomerType) {
  return async function (rows: object[]) {
    const report = {
      total: rows.length,
      success: 0,
      duplicates: 0,
      invalid: 0,
      errors: 0,
      details: [] as any[],
    };

    const dataToInsert: Record<string, CreateCustomerInput> = {};

    const isFirstColClientName = isNaN(+Object.values(rows[0])[0]);
    const clientNameIdx = isFirstColClientName ? 0 : 1;
    const clientPhoneNumberIdx = isFirstColClientName ? 1 : 0;

    let index = 0;
    for (const obj of rows) {
      const values = Object.values(obj);

      const clientName = values[clientNameIdx];
      const clientPhoneNumber = values[clientPhoneNumberIdx];

      const lineNumber = index + 1; // +1 car Excel commence à 1
      const rowData = {
        name: clientName?.toString().trim(),
        mobile: clientPhoneNumber?.toString().trim(),
      };

      // Validation des données
      if (!rowData.mobile) {
        report.invalid++;
        report.details.push({
          line: lineNumber,
          status: 'invalid',
          message: 'Mobile is missing',
        });
        continue;
      }

      // Création du client
      dataToInsert[rowData.mobile] = {
        name: rowData.name,
        mobile: rowData.mobile,
        type, // Valeur par défaut
        app_name: config.appName,
        whether_apply: false,
        whether_assigned: false,
      };

      index++;
    }

    const allCustomersMobile = await supabase
      .from('customers')
      .select('mobile');

    if (allCustomersMobile.error) throw allCustomersMobile.error;

    allCustomersMobile.data.forEach((item) => {
      if (item.mobile in dataToInsert) delete dataToInsert[item.mobile];
    });

    const { error } = await supabase
      .from('customers')
      .insert(Object.values(dataToInsert));

    if (error) throw error;

    return report;
  };
}
