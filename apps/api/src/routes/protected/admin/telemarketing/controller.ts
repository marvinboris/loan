import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {
  BorrowValidationInput,
  KycValidationInput,
  ManualAssignmentInput,
} from './interfaces';
import { telemarketingService } from './service';
import { supabase } from '../../../../lib';
import {
  CustomerType,
  Kyc,
  KycStatus,
  Loan,
  PerformanceType,
} from '../../../../types';
import { filter } from '../../../../utils';

export class TelemarketingController {
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
        `,
          { count: 'exact' }
        )
        .eq('type', PerformanceType.TELEMARKETER_MONTHLY);

      if (group) query = query.eq('group_name', group as string);
      if (status) query = query.eq('status', status as string);
      if (date) query = query.eq('date', date as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          id: perf.id,
          dateRange: perf.date_range,
          groupRange: perf.group_name,
          ranking: perf.ranking,
          telemarketersName: perf.users?.name,
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
        total,
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
        `,
          { count: 'exact' }
        )
        .eq('type', PerformanceType.TELEMARKETER_DAILY);

      if (group) query = query.eq('group_name', group as string);
      if (status) query = query.eq('status', status as string);
      if (date) query = query.eq('date', date as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          id: perf.id,
          date: perf.date,
          groupName: perf.group_name,
          ranking: perf.ranking,
          telemarketersName: perf.users?.name,
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
        total,
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
        .select('*', { count: 'exact' })
        .eq('type', PerformanceType.TEAM_MONTHLY);

      if (group) query = query.eq('group_name', group as string);
      if (status) query = query.eq('status', status as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          id: perf.id,
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
        total,
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
        .select('*', { count: 'exact' })
        .eq('type', PerformanceType.TEAM_DAILY);

      if (group) query = query.eq('group_name', group as string);
      if (status) query = query.eq('status', status as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          id: perf.id,
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
        total,
      });
    } catch (error) {
      next(error);
    }
  }

  async getNewCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        importDate,
        userLabel,
        mobile,
        telemarketer,
        whetherApply,
        allocationTime,
        whetherAssigned,
        whetherFollowedUp,
        latestFollowUpPerson,
        appName,
      } = req.query;

      let query = supabase
        .from('customers')
        .select(
          `
          *,
          telemarketers:telemarketer_id (name)
        `,
          { count: 'exact' }
        )
        .eq('type', 'new');

      // Appliquer les filtres
      if (importDate) query = query.eq('created_at', importDate as string);
      if (userLabel) query = query.eq('user_label', userLabel as string);
      if (mobile) query = query.eq('mobile', mobile as string);
      if (telemarketer)
        query = query.eq('telemarketer_id', +(telemarketer as string));
      if (whetherApply)
        query = query.eq('whether_apply', whetherApply === 'true');
      if (allocationTime)
        query = query.eq('allocation_time', allocationTime as string);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson as string);
      if (appName) query = query.eq('app_name', appName as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const kyc = await supabase
        .from('kyc')
        .select()
        .eq('status', KycStatus.PENDING);

      if (kyc.error) throw kyc.error;

      const kycRecord: Record<number, Kyc> = {};
      kyc.data.forEach((item) => {
        kycRecord[item.customer_id] = item as Kyc;
      });

      const borrow = await supabase
        .from('loans')
        .select('id, customer_id')
        .eq('loan_status', 'pending');

      if (borrow.error) throw borrow.error;

      const borrowRecord: Record<number, Partial<Loan>> = {};
      borrow.data.forEach((item) => {
        borrowRecord[item.customer_id] = item;
      });

      const items =
        customers?.map((customer) => ({
          id: customer.id,
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.telemarketers?.name,
          // followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketers?.name,
          kyc: kycRecord[customer.id],
          borrow: borrowRecord[customer.id],
        })) || [];

      res.json({
        success: true,
        items,
        total,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOldCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        importDate,
        userLabel,
        mobile,
        telemarketer,
        whetherApply,
        allocationTime,
        whetherAssigned,
        whetherFollowedUp,
        latestFollowUpPerson,
        appName,
      } = req.query;

      let query = supabase
        .from('customers')
        .select(
          `
          *,
          telemarketers:telemarketer_id (name)
        `,
          { count: 'exact' }
        )
        .eq('type', 'old');

      // Appliquer les filtres
      if (importDate) query = query.eq('created_at', importDate as string);
      if (userLabel) query = query.eq('user_label', userLabel as string);
      if (mobile) query = query.eq('mobile', mobile as string);
      if (telemarketer)
        query = query.eq('telemarketer_id', +(telemarketer as string));
      if (whetherApply)
        query = query.eq('whether_apply', whetherApply === 'true');
      if (allocationTime)
        query = query.eq('allocation_time', allocationTime as string);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson as string);
      if (appName) query = query.eq('app_name', appName as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const borrow = await supabase
        .from('loans')
        .select('id, customer_id')
        .eq('loan_status', 'pending');

      if (borrow.error) throw borrow.error;

      const borrowRecord: Record<number, Partial<Loan>> = {};
      borrow.data.forEach((item) => {
        borrowRecord[item.customer_id] = item;
      });

      const items =
        customers?.map((customer) => ({
          id: customer.id,
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.telemarketers?.name,
          // followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketers?.name,
          borrow: borrowRecord[customer.id],
        })) || [];

      res.json({
        success: true,
        items,
        total,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTelemarketers(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('role', 'telemarketer');

      if (error) throw error;

      const record: Record<string, string> = {};
      data.forEach((item) => {
        record[item.id] = item.name;
      });

      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  async getRegisteredCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        importDate,
        userLabel,
        mobile,
        telemarketer,
        allocationTime,
        whetherAssigned,
        whetherFollowedUp,
        latestFollowUpPerson,
        appName,
      } = req.query;

      let query = supabase
        .from('customers')
        .select(
          `
          *,
          telemarketers:telemarketer_id (name)
        `,
          { count: 'exact' }
        )
        .eq('type', 'registered')
        .eq('whether_apply', false);

      // Appliquer les filtres
      if (importDate) query = query.eq('created_at', importDate as string);
      if (userLabel) query = query.eq('user_label', userLabel as string);
      if (mobile) query = query.eq('mobile', mobile as string);
      if (telemarketer)
        query = query.eq('telemarketer_id', +(telemarketer as string));
      if (allocationTime)
        query = query.eq('allocation_time', allocationTime as string);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson as string);
      if (appName) query = query.eq('app_name', appName as string);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const borrow = await supabase
        .from('loans')
        .select('id, customer_id')
        .eq('loan_status', 'pending');

      if (borrow.error) throw borrow.error;

      const borrowRecord: Record<number, Partial<Loan>> = {};
      borrow.data.forEach((item) => {
        borrowRecord[item.customer_id] = item;
      });

      const items =
        customers?.map((customer) => ({
          id: customer.id,
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.telemarketers?.name,
          // followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketers?.name,
          borrow: borrowRecord[customer.id],
        })) || [];

      res.json({
        success: true,
        items,
        total,
      });
    } catch (error) {
      next(error);
    }
  }

  postImportCustomers(type: CustomerType) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        // Vérification plus robuste du fichier
        if (!req.file || !req.file.buffer) {
          return res
            .status(400)
            .json({ success: false, message: 'No valid file provided' });
        }

        const result = await telemarketingService.importCustomers(
          type,
          req.file.buffer
        );
        if (!result.success) return res.status(400).json(result);

        res.json(result);
      } catch (error) {
        next(error);
      }
    };
  }

  async postKycValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const input: KycValidationInput = req.body;

      const result = await telemarketingService.kycValidation(input);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async postBorrowValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const input: BorrowValidationInput = req.body;

      const result = await telemarketingService.borrowValidation(input);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async postManualAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const input: ManualAssignmentInput = req.body;

      const result = await telemarketingService.manualAssignment(input);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
