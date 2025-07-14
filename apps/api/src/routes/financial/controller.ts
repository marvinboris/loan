import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../lib/supabase';

export class FinancialController {
  async getRepaymentInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        mobile,
        name,
        daysOverdue,
        repaymentCodeVaLink,
        tradingStatus,
        paymentChannel,
        repayment,
        creationTime,
        paybackTime,
        loanNumber,
        repaymentNumber,
        collector,
        paymentCompanySerialNumber,
        numPayment,
        product,
      } = req.query;

      // Construire la requête avec jointures
      let query = supabase.from('repayments').select(`
          *,
          loans:loan_id (
            *,
            customers:customer_id (
              name,
              mobile
            ),
            collectors:collector_id (name)
          )
        `);

      // Appliquer les filtres
      if (mobile) query = query.eq('loans.customer.mobile', mobile);
      if (name) query = query.ilike('loans.customer.name', `%${name}%`);
      if (daysOverdue) query = query.eq('loans.days_overdue', daysOverdue);
      if (repaymentCodeVaLink)
        query = query.ilike(
          'repayment_code_va_link',
          `%${repaymentCodeVaLink}%`
        );
      if (tradingStatus) query = query.eq('trading_status', tradingStatus);
      if (paymentChannel) query = query.eq('payment_channel', paymentChannel);
      if (repayment) query = query.eq('repayment_amount', repayment);
      if (creationTime) query = query.eq('creation_time', creationTime);
      if (paybackTime) query = query.eq('payback_time', paybackTime);
      if (loanNumber) query = query.eq('loans.loan_number', loanNumber);
      if (repaymentNumber)
        query = query.eq('repayment_number', repaymentNumber);
      if (collector) query = query.eq('collector_id', collector);
      if (paymentCompanySerialNumber)
        query = query.eq(
          'payment_company_serial_number',
          paymentCompanySerialNumber
        );
      if (product) query = query.eq('loans.product_name', product);

      const { data: repayments, error } = await query;

      if (error) throw error;

      const items =
        repayments?.map((repayment) => ({
          repaymentNum: repayment.repayment_number,
          loanNum: repayment.loan?.loan_number,
          product: repayment.loan?.product_name,
          name: repayment.loan?.customer?.name,
          mobile: repayment.loan?.customer?.mobile,
          tradingStatus: repayment.trading_status,
          repaymentCodeVaLink: repayment.repayment_code_va_link,
          repaymentAmt: repayment.repayment_amount,
          realAmt: repayment.real_amount,
          latestFollowUpTime: repayment.latest_follow_up_time,
          followUpResults: repayment.follow_up_results,
          descFollowUp: repayment.desc_follow_up,
          whetherAssigned: repayment.whether_assigned,
        })) || [];

      res.json({
        success: true,
        items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLoanInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        mobile,
        name,
        daysOverdue,
        repaymentCodeVaLink,
        tradingStatus,
        paymentChannel,
        repayment,
        creationTime,
        paybackTime,
        loanNumber,
        repaymentNumber,
        collector,
        paymentCompanySerialNumber,
        numPayment,
        product,
      } = req.query;

      // Construire la requête avec jointures
      let query = supabase.from('loans').select(`
          *,
          customers:customer_id (name, mobile),
          collectors:collector_id (name),
          repayments:repayments (
            *,
            collectors:collector_id (name)
          )
        `);

      // Appliquer les filtres
      if (mobile) query = query.eq('customers.mobile', mobile);
      if (name) query = query.ilike('customers.name', `%${name}%`);
      if (daysOverdue) query = query.eq('days_overdue', daysOverdue);
      if (repaymentCodeVaLink)
        query = query.ilike(
          'repayments.repayment_code_va_link',
          `%${repaymentCodeVaLink}%`
        );
      if (tradingStatus)
        query = query.eq('repayments.trading_status', tradingStatus);
      if (paymentChannel)
        query = query.eq('repayments.payment_channel', paymentChannel);
      if (repayment) query = query.eq('repayments.repayment_amount', repayment);
      if (creationTime)
        query = query.eq('repayments.creation_time', creationTime);
      if (paybackTime) query = query.eq('repayments.payback_time', paybackTime);
      if (loanNumber) query = query.eq('loan_number', loanNumber);
      if (repaymentNumber)
        query = query.eq('repayments.repayment_number', repaymentNumber);
      if (collector) query = query.eq('collector_id', collector);
      if (paymentCompanySerialNumber)
        query = query.eq(
          'repayments.payment_company_serial_number',
          paymentCompanySerialNumber
        );
      if (product) query = query.eq('product_name', product);

      const { data: loans, error } = await query;

      if (error) throw error;

      // Aplatir les données pour chaque remboursement
      const items =
        loans?.flatMap(
          (loan) =>
            loan.repayments?.map((repayment) => ({
              repaymentNum: repayment.repayment_number,
              loanNum: loan.loan_number,
              product: loan.product_name,
              name: loan.customer?.name,
              mobile: loan.customer?.mobile,
              tradingStatus: repayment.trading_status,
              repaymentCodeVaLink: repayment.repayment_code_va_link,
              repaymentAmt: repayment.repayment_amount,
              realAmt: repayment.real_amount,
              latestFollowUpTime: repayment.latest_follow_up_time,
              followUpResults: repayment.follow_up_results,
              descFollowUp: repayment.desc_follow_up,
              whetherAssigned: repayment.whether_assigned,
            })) || []
        ) || [];

      res.json({
        success: true,
        items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getReconciliation(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { mobile, loanNum, masterLoanNum } = req.query;

      // Construire la requête avec jointures
      let query = supabase.from('repayments').select(`
          *,
          loans:loan_id (
            *,
            customers:customer_id (name, mobile)
          )
        `);

      // Appliquer les filtres
      if (mobile) query = query.eq('loans.customer.mobile', mobile);
      if (loanNum) query = query.eq('loans.loan_number', loanNum);
      if (masterLoanNum)
        query = query.eq('loans.master_loan_number', masterLoanNum);

      const { data: repayments, error } = await query;

      if (error) throw error;

      const items =
        repayments?.map((repayment) => ({
          repaymentNum: repayment.repayment_number,
          loanNum: repayment.loan?.loan_number,
          product: repayment.loan?.product_name,
          name: repayment.loan?.customer?.name,
          mobile: repayment.loan?.customer?.mobile,
          tradingStatus: repayment.trading_status,
          repaymentCodeVaLink: repayment.repayment_code_va_link,
          repaymentAmt: repayment.repayment_amount,
          realAmt: repayment.real_amount,
          latestFollowUpTime: repayment.latest_follow_up_time,
          followUpResults: repayment.follow_up_results,
          descFollowUp: repayment.desc_follow_up,
          whetherAssigned: repayment.whether_assigned,
        })) || [];

      res.json({
        success: true,
        items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }
}
