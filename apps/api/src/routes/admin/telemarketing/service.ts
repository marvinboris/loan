import xlsx from 'xlsx';
import { config } from '../../../config';
import { supabase } from '../../../lib/supabase';
import { CreateCustomerInput, CustomerType } from '../../../types';

export const telemarketingService = {
  async importCustomers(type: CustomerType, buffer: Buffer) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return {
        success: false,
        message: 'Le fichier ne contient aucune feuille',
      };
    }

    const worksheet = workbook.Sheets[sheetName];
    const rows: object[] = xlsx.utils.sheet_to_json(worksheet);

    if (rows.length === 0) {
      return { success: false, message: 'Le fichier est vide ou mal formaté' };
    }

    const results = await processCustomers(type)(rows);

    return { success: true, message: 'Le fichier a été bien importé', results };
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

    let index = 0;
    for (const obj of rows) {
      const [clientName, clientPhoneNumber, clientId] = Object.values(obj);

      const lineNumber = index + 1; // +1 car Excel commence à 1
      const rowData = {
        name: clientName?.toString().trim(),
        mobile: clientPhoneNumber?.toString().trim(),
        externalId: clientId ? Number(clientId) : null,
      };

      // Validation des données
      if (!rowData.name || !rowData.mobile) {
        report.invalid++;
        report.details.push({
          line: lineNumber,
          status: 'invalid',
          message:
            !rowData.name && !rowData.mobile
              ? 'Nom et téléphone manquants'
              : !rowData.name
              ? 'Nom manquant'
              : 'Téléphone manquant',
        });
        continue;
      }

      // Vérification des doublons
      const { data: existingCustomer, error: duplicateError } = await supabase
        .from('customers')
        .select('id')
        .eq('mobile', rowData.mobile)
        .single();

      if (existingCustomer) {
        report.duplicates++;
        report.details.push({
          line: lineNumber,
          status: 'duplicate',
          mobile: rowData.mobile,
          existingId: existingCustomer.id,
        });
        index++;
        continue;
      }

      // Création du client
      const customerData: CreateCustomerInput = {
        name: rowData.name,
        mobile: rowData.mobile,
        type, // Valeur par défaut
        app_name: config.appName,
        whether_apply: false,
        whether_assigned: false,
        ...(rowData.externalId && { external_id: rowData.externalId }), // Stockage optionnel de l'ID externe
      };

      try {
        const { data: newCustomer, error } = await supabase
          .from('customers')
          .insert([customerData])
          .select('id')
          .single();

        if (error) throw error;

        report.success++;
        report.details.push({
          line: lineNumber,
          status: 'success',
          customerId: newCustomer.id,
          mobile: rowData.mobile,
        });
      } catch (error) {
        report.errors++;
        report.details.push({
          line: lineNumber,
          status: 'error',
          message: error.message,
          mobile: rowData.mobile,
        });
      }

      index++;
    }

    return report;
  };
}
