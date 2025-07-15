import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { telemarketingService } from './service';
import { supabase } from '../../../lib/supabase';
import { CustomerType, PerformanceType } from '../../../types';
import { filter } from '../../../utils';

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

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);
      if (date) query = query.eq('date', date);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          dateRange: perf.date_range,
          groupRange: perf.group_name,
          ranking: perf.ranking,
          telemarketersName: perf.user?.name,
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

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);
      if (date) query = query.eq('date', date);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        performances?.map((perf) => ({
          date: perf.date,
          groupName: perf.group_name,
          ranking: perf.ranking,
          telemarketersName: perf.user?.name,
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

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

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

      if (group) query = query.eq('group_name', group);
      if (status) query = query.eq('status', status);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: performances, error } = await query.range(from, to);

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
      if (importDate) query = query.eq('created_at', importDate);
      if (userLabel) query = query.eq('user_label', userLabel);
      if (mobile) query = query.eq('mobile', mobile);
      if (telemarketer) query = query.eq('telemarketer_id', telemarketer);
      if (whetherApply)
        query = query.eq('whether_apply', whetherApply === 'true');
      if (allocationTime) query = query.eq('allocation_time', allocationTime);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson);
      if (appName) query = query.eq('app_name', appName);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        customers?.map((customer) => ({
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketer?.name,
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
      if (importDate) query = query.eq('created_at', importDate);
      if (userLabel) query = query.eq('user_label', userLabel);
      if (mobile) query = query.eq('mobile', mobile);
      if (telemarketer) query = query.eq('telemarketer_id', telemarketer);
      if (whetherApply)
        query = query.eq('whether_apply', whetherApply === 'true');
      if (allocationTime) query = query.eq('allocation_time', allocationTime);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson);
      if (appName) query = query.eq('app_name', appName);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        customers?.map((customer) => ({
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketer?.name,
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
      if (importDate) query = query.eq('created_at', importDate);
      if (userLabel) query = query.eq('user_label', userLabel);
      if (mobile) query = query.eq('mobile', mobile);
      if (telemarketer) query = query.eq('telemarketer_id', telemarketer);
      if (allocationTime) query = query.eq('allocation_time', allocationTime);
      if (whetherAssigned)
        query = query.eq('whether_assigned', whetherAssigned === 'true');
      if (whetherFollowedUp)
        query = query.not('latest_follow_up_time', 'is', null);
      if (latestFollowUpPerson)
        query = query.eq('follow_up_person', latestFollowUpPerson);
      if (appName) query = query.eq('app_name', appName);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: customers, error } = await query.range(from, to);

      if (error) throw error;

      const items =
        customers?.map((customer) => ({
          mobile: customer.mobile,
          name: customer.name,
          prevRepaymentTime: customer.prev_repayment_time,
          appName: customer.app_name,
          followUpPerson: customer.follow_up_person,
          whetherApply: customer.whether_apply,
          appTime: customer.app_time,
          allocationTime: customer.allocation_time,
          latestFollowUpTime: customer.latest_follow_up_time,
          followUpResults: customer.follow_up_results,
          descFollowUp: customer.desc_follow_up,
          whetherAssigned: customer.whether_assigned,
          telemarketer: customer.telemarketer?.name,
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
            .json({ success: false, message: 'Aucun fichier valide fourni' });
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
}
