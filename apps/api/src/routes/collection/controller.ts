import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../lib/supabase';

export class CollectionController {
  async getMonthlyPerformance(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, date, status } = req.query;

      let query = supabase
        .from('performances')
        .select(
          `
          *,
          users:user_id (name)
        `
        )
        .eq('type', 'collector_monthly');

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);
      if (date) query = query.eq('date', date);

      const { data: performances, error } = await query;

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      const items =
        performances?.map((perf) => ({
          dateRange: perf.date_range,
          groupRange: perf.group_name,
          ranking: perf.ranking,
          collectorsName: perf.user?.name,
          totalAssignedQty: perf.total_assigned_qty,
          newAssignedNum: perf.new_assigned_num,
          targetRepayRate: perf.target_repay_rate,
          targetNum: perf.target_num,
          numOfApps: perf.num_of_apps,
          appRate: perf.app_rate,
          numOfApprovedApps: perf.num_of_approved_apps,
          handleNum: perf.handle_num,
          bonus: perf.bonus,
          status: perf.status,
          daysOfEmployment: perf.days_of_employment,
          updateTime: perf.updated_at,
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

  async getDailyPerformance(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, date, status } = req.query;

      let query = supabase
        .from('performances')
        .select(
          `
          *,
          users:user_id (name)
        `
        )
        .eq('type', 'collector_daily');

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);
      if (date) query = query.eq('date', date);

      const { data: performances, error } = await query;

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          date: perf.date,
          groupName: perf.group_name,
          ranking: perf.ranking,
          collectorsName: perf.user?.name,
          totalAssignedQty: perf.total_assigned_qty,
          newAssignedNum: perf.new_assigned_num,
          targetRepayRate: perf.target_repay_rate,
          targetNum: perf.target_num,
          numOfApps: perf.num_of_apps,
          appRate: perf.app_rate,
          numOfApprovedApps: perf.num_of_approved_apps,
          handleNum: perf.handle_num,
          bonus: perf.bonus,
          numOfCalls: perf.num_of_calls,
          numOfConnections: perf.num_of_connections,
          phoneConnectionRate: perf.phone_connection_rate,
          totalCallDuration: perf.total_call_duration,
          firstCallTime: perf.first_call_time,
          latestCallTime: perf.latest_call_time,
          caseCoverage: perf.case_coverage,
          numOfSms: perf.num_of_sms,
          status: perf.status,
          daysOfEmployment: perf.days_of_employment,
          updateTime: perf.updated_at,
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

  async getTeamMonthlyPerformance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, status } = req.query;

      let query = supabase
        .from('performances')
        .select('*')
        .eq('type', 'team_monthly');

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);

      const { data: performances, error } = await query;

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          dateRange: perf.date_range,
          groupRange: perf.group_name,
          ranking: perf.ranking,
          totalAssignedQty: perf.total_assigned_qty,
          newAssignedNum: perf.new_assigned_num,
          targetRepayRate: perf.target_repay_rate,
          targetNum: perf.target_num,
          numOfApps: perf.num_of_apps,
          appRate: perf.app_rate,
          numOfApprovedApps: perf.num_of_approved_apps,
          handleNum: perf.handle_num,
          bonus: perf.bonus,
          updateTime: perf.updated_at,
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

  async getTeamDailyPerformance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, status } = req.query;

      let query = supabase
        .from('performances')
        .select('*')
        .eq('type', 'team_daily');

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);

      const { data: performances, error } = await query;

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          date: perf.date,
          groupName: perf.group_name,
          ranking: perf.ranking,
          totalAssignedQty: perf.total_assigned_qty,
          newAssignedNum: perf.new_assigned_num,
          targetRepayRate: perf.target_repay_rate,
          targetNum: perf.target_num,
          numOfApps: perf.num_of_apps,
          appRate: perf.app_rate,
          numOfApprovedApps: perf.num_of_approved_apps,
          handleNum: perf.handle_num,
          bonus: perf.bonus,
          updateTime: perf.updated_at,
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

  async getCollectionCase(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        mobile,
        name,
        loanNum,
        loanOrderNum,
        stage,
        collector,
        product,
        loanTenure,
        loanAmt,
        appVersion,
        dueDate,
        loanStatus,
        tag,
        repeatedBorrowing,
        loanType,
        result,
        followUpDay,
        appName,
        proportion,
      } = req.query;

      // Construire la requête avec des jointures
      let query = supabase.from('loans').select(`
          *,
          customers:customer_id (*),
          collectors:collector_id (name),
          collection_records:collection_records (*)
        `);

      // Appliquer les filtres
      if (mobile) query = query.eq('customers.mobile', mobile);
      if (name) query = query.ilike('customers.name', `%${name}%`);
      if (loanNum) query = query.eq('loan_number', loanNum);
      if (loanOrderNum) query = query.eq('loan_order_number', loanOrderNum);
      if (stage) query = query.eq('collection_stage', stage);
      if (collector) query = query.eq('collector_id', collector);
      if (product) query = query.eq('product_name', product);
      if (loanTenure) query = query.eq('loan_tenure', loanTenure);
      if (loanAmt) query = query.eq('loan_amount', loanAmt);
      if (appVersion) query = query.eq('app_version', appVersion);
      if (dueDate) query = query.eq('due_date', dueDate);
      if (loanStatus) query = query.eq('loan_status', loanStatus);
      if (tag) query = query.eq('tag', tag);
      if (repeatedBorrowing)
        query = query.eq('repeated_borrowing', repeatedBorrowing === 'true');
      if (loanType) query = query.eq('loan_type', loanType);
      if (result) query = query.eq('collection_records.result', result);
      if (appName) query = query.eq('app_name', appName);

      const { data: loans, error } = await query;

      if (error) throw error;

      const items =
        loans?.map((loan) => {
          const today = new Date().toISOString().split('T')[0];
          const dailyRecords =
            loan.collection_records?.filter((record) =>
              record.record_time?.startsWith(today)
            ) || [];

          return {
            loanNum: loan.loan_number,
            loanOrderNum: loan.loan_order_number,
            appName: loan.app_name,
            name: loan.customer?.name,
            mobile: loan.customer?.mobile,
            dueDate: loan.due_date,
            product: loan.product_name,
            collector: loan.collector?.name,
            stage: loan.collection_stage,
            dailyTimes: dailyRecords.length,
            times: loan.collection_records?.length || 0,
            log: loan.collection_records
              ?.map((r) => r.record_content)
              .join('\n'),
            result: loan.collection_records?.[0]?.result,
            logUpdateTime: loan.collection_records?.[0]?.record_time,
            lendingTime: loan.created_at,
            paymentTime: loan.updated_at,
            totalRepayment: loan.total_repayment,
            loanAmt: loan.loan_amount,
            loanTenure: loan.loan_tenure,
            loanType: loan.loan_type,
            appStatus: loan.app_status,
          };
        }) || [];

      res.json({
        success: true,
        items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCaseAllocation(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        stage,
        collector,
        product,
        userSelect,
        numLoans,
        appChannel,
        loanNum,
        loanOrderNum,
        repeatedBorrowing,
        daysOverdue,
        mobile,
        result,
        largeGroup,
        district,
        otherStates,
        appName,
        dueDate,
      } = req.query;

      let query = supabase.from('loans').select(`
          *,
          customers:customer_id (*),
          collectors:collector_id (name),
          collection_records:collection_records (*)
        `);

      // Appliquer les filtres
      if (stage) query = query.eq('collection_stage', stage);
      if (collector) query = query.eq('collector_id', collector);
      if (product) query = query.eq('product_name', product);
      if (userSelect) query = query.eq('customers.user_label', userSelect);
      if (numLoans) query = query.eq('customers.num_loans', numLoans);
      if (appChannel) query = query.eq('app_channel', appChannel);
      if (loanNum) query = query.eq('loan_number', loanNum);
      if (loanOrderNum) query = query.eq('loan_order_number', loanOrderNum);
      if (repeatedBorrowing)
        query = query.eq('repeated_borrowing', repeatedBorrowing === 'true');
      if (daysOverdue) query = query.eq('days_overdue', daysOverdue);
      if (mobile) query = query.eq('customers.mobile', mobile);
      if (result) query = query.eq('collection_records.result', result);
      if (largeGroup) query = query.eq('large_group', largeGroup);
      if (district) query = query.eq('customers.district', district);
      if (otherStates) query = query.eq('customers.other_states', otherStates);
      if (appName) query = query.eq('app_name', appName);
      if (dueDate) query = query.eq('due_date', dueDate);

      const { data: loans, error } = await query;

      if (error) throw error;

      const items =
        loans?.map((loan) => {
          const today = new Date().toISOString().split('T')[0];
          const dailyRecords =
            loan.collection_records?.filter((record) =>
              record.record_time?.startsWith(today)
            ) || [];

          return {
            loanNum: loan.loan_number,
            loanOrderNum: loan.loan_order_number,
            appName: loan.app_name,
            name: loan.customer?.name,
            district: loan.customer?.district,
            mobile: loan.customer?.mobile,
            dueDate: loan.due_date,
            daysOverdue: loan.days_overdue,
            totalRepayment: loan.total_repayment,
            dailyTimes: dailyRecords.length,
            times: loan.collection_records?.length || 0,
            log: loan.collection_records
              ?.map((r) => r.record_content)
              .join('\n'),
            result: loan.collection_records?.[0]?.result,
            logUpdateTime: loan.collection_records?.[0]?.record_time,
            product: loan.product_name,
            userLvl: loan.customer?.user_label,
            loanAmt: loan.loan_amount,
            loanTenure: loan.loan_tenure,
            loanType: loan.loan_type,
            appStatus: loan.app_status,
            appChannel: loan.app_channel,
            amtRepaid: loan.amount_repaid,
            collector: loan.collector?.name,
          };
        }) || [];

      res.json({
        success: true,
        items,
        total: items.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCollectionRecords(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        personnel,
        loanNum,
        loanOrderNum,
        mobile,
        mark,
        recordTime,
        contact,
        targetContact,
        connection,
        willingnessPay,
        overdueReason,
        result,
      } = req.query;

      // Construire la requête avec jointures complexes
      let query = supabase.from('collection_records').select(`
          *,
          loans:loan_id (
            *,
            customers:customer_id (mobile)
          ),
          collectors:collector_id (name)
        `);

      // Appliquer les filtres
      if (personnel) query = query.eq('collector_id', personnel);
      if (loanNum) query = query.eq('loans.loan_number', loanNum);
      if (loanOrderNum)
        query = query.eq('loans.loan_order_number', loanOrderNum);
      if (mobile) query = query.eq('loans.customer.mobile', mobile);
      if (mark) query = query.eq('mark', mark);
      if (recordTime) query = query.eq('record_time', recordTime);
      if (contact) query = query.eq('contact', contact);
      if (targetContact) query = query.eq('target_contact', targetContact);
      if (connection) query = query.eq('connection', connection);
      if (willingnessPay)
        query = query.eq('willingness_to_pay', willingnessPay);
      if (overdueReason) query = query.eq('overdue_reason', overdueReason);
      if (result) query = query.eq('result', result);

      const { data: records, error } = await query;

      if (error) throw error;

      const items =
        records?.map((record) => {
          const recordDate = new Date(record.record_time)
            .toISOString()
            .split('T')[0];
          const dailyRecords =
            record.loan?.collection_records?.filter(
              (r) =>
                new Date(r.record_time).toISOString().split('T')[0] ===
                recordDate
            ) || [];

          return {
            personnel: record.collector?.name,
            loanNum: record.loan?.loan_number,
            loanOrderNum: record.loan?.loan_order_number,
            mobile: record.loan?.customer?.mobile,
            mark: record.mark,
            recordContent: record.record_content,
            dailyTimes: dailyRecords.length,
            times: record.loan?.collection_records?.length || 0,
            contact: record.contact,
            targetContact: record.target_contact,
            connection: record.connection,
            willingnessPay: record.willingness_to_pay,
            overdueReason: record.overdue_reason,
            result: record.result,
            recordTime: record.record_time,
          };
        }) || [];

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
