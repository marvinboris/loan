import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import { Customer } from '../../database/models/customer';
import { Performance } from '../../database/models/performance';
import { User } from '../../database/models/user';

export class TelemarketingController {
  async getMonthlyPerformance(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, date, status } = req.query;

      const whereClause: any = {
        type: 'telemarketer_monthly',
      };

      if (group) whereClause.groupName = group;
      if (status) whereClause.status = status;
      if (date) whereClause.date = date;

      const performances = await Performance.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
      });

      const items = performances.map((perf) => ({
        dateRange: perf.dateRange,
        groupRange: perf.groupName,
        ranking: perf.ranking,
        telemarketersName: perf.user?.name,
        totalAssignedQty: perf.totalAssignedQty,
        newAssignedNum: perf.newAssignedNum,
        targetRepayRate: perf.targetRepayRate,
        targetNum: perf.targetNum,
        numOfApps: perf.numOfApps,
        appRate: perf.appRate,
        numOfApprovedApps: perf.numOfApprovedApps,
        handleNum: perf.handleNum,
        bonus: perf.bonus,
        status: perf.status,
        daysOfEmployment: perf.daysOfEmployment,
        updateTime: perf.updatedAt,
      }));

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

      const whereClause: any = {
        type: 'telemarketer_daily',
      };

      if (group) whereClause.groupName = group;
      if (status) whereClause.status = status;
      if (date) whereClause.date = date;

      const performances = await Performance.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
      });

      const items = performances.map((perf) => ({
        date: perf.date,
        groupName: perf.groupName,
        ranking: perf.ranking,
        telemarketersName: perf.user?.name,
        totalAssignedQty: perf.totalAssignedQty,
        newAssignedNum: perf.newAssignedNum,
        targetRepayRate: perf.targetRepayRate,
        targetNum: perf.targetNum,
        numOfApps: perf.numOfApps,
        appRate: perf.appRate,
        numOfApprovedApps: perf.numOfApprovedApps,
        handleNum: perf.handleNum,
        bonus: perf.bonus,
        numOfCalls: perf.numOfCalls,
        numOfConnections: perf.numOfConnections,
        phoneConnectionRate: perf.phoneConnectionRate,
        totalCallDuration: perf.totalCallDuration,
        firstCallTime: perf.firstCallTime,
        latestCallTime: perf.latestCallTime,
        caseCoverage: perf.caseCoverage,
        numOfSms: perf.numOfSms,
        status: perf.status,
        daysOfEmployment: perf.daysOfEmployment,
        updateTime: perf.updatedAt,
      }));

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

      const whereClause: any = {
        type: 'team_monthly',
      };

      if (group) whereClause.groupName = group;
      if (status) whereClause.status = status;

      const performances = await Performance.findAll({
        where: whereClause,
      });

      const items = performances.map((perf) => ({
        dateRange: perf.dateRange,
        groupRange: perf.groupName,
        ranking: perf.ranking,
        totalAssignedQty: perf.totalAssignedQty,
        newAssignedNum: perf.newAssignedNum,
        targetRepayRate: perf.targetRepayRate,
        targetNum: perf.targetNum,
        numOfApps: perf.numOfApps,
        appRate: perf.appRate,
        numOfApprovedApps: perf.numOfApprovedApps,
        handleNum: perf.handleNum,
        bonus: perf.bonus,
        updateTime: perf.updatedAt,
      }));

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

      const whereClause: any = {
        type: 'team_daily',
      };

      if (group) whereClause.groupName = group;
      if (status) whereClause.status = status;

      const performances = await Performance.findAll({
        where: whereClause,
      });

      const items = performances.map((perf) => ({
        date: perf.date,
        groupName: perf.groupName,
        ranking: perf.ranking,
        totalAssignedQty: perf.totalAssignedQty,
        newAssignedNum: perf.newAssignedNum,
        targetRepayRate: perf.targetRepayRate,
        targetNum: perf.targetNum,
        numOfApps: perf.numOfApps,
        appRate: perf.appRate,
        numOfApprovedApps: perf.numOfApprovedApps,
        handleNum: perf.handleNum,
        bonus: perf.bonus,
        updateTime: perf.updatedAt,
      }));

      res.json({
        success: true,
        items,
        total: items.length,
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

      const whereClause: any = {
        type: 'new',
      };

      if (importDate) whereClause.createdAt = importDate;
      if (userLabel) whereClause.userLabel = userLabel;
      if (mobile) whereClause.mobile = mobile;
      if (telemarketer) whereClause.telemarketerId = telemarketer;
      if (whetherApply) whereClause.whetherApply = whetherApply === 'true';
      if (allocationTime) whereClause.allocationTime = allocationTime;
      if (whetherAssigned)
        whereClause.whetherAssigned = whetherAssigned === 'true';
      if (whetherFollowedUp)
        whereClause.latestFollowUpTime =
          whetherFollowedUp === 'true' ? { [Op.ne]: null } : null;
      if (latestFollowUpPerson)
        whereClause.followUpPerson = latestFollowUpPerson;
      if (appName) whereClause.appName = appName;

      const customers = await Customer.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'telemarketer',
          },
        ],
      });

      const items = customers.map((customer) => ({
        mobile: customer.mobile,
        name: customer.name,
        prevRepaymentTime: customer.prevRepaymentTime,
        appName: customer.appName,
        followUpPerson: customer.followUpPerson,
        whetherApply: customer.whetherApply,
        appTime: customer.appTime,
        allocationTime: customer.allocationTime,
        latestFollowUpTime: customer.latestFollowUpTime,
        followUpResults: customer.followUpResults,
        descFollowUp: customer.descFollowUp,
        whetherAssigned: customer.whetherAssigned,
      }));

      res.json({
        success: true,
        items,
        total: items.length,
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

      const whereClause: any = {
        type: 'old',
      };

      if (importDate) whereClause.createdAt = importDate;
      if (userLabel) whereClause.userLabel = userLabel;
      if (mobile) whereClause.mobile = mobile;
      if (telemarketer) whereClause.telemarketerId = telemarketer;
      if (whetherApply) whereClause.whetherApply = whetherApply === 'true';
      if (allocationTime) whereClause.allocationTime = allocationTime;
      if (whetherAssigned)
        whereClause.whetherAssigned = whetherAssigned === 'true';
      if (whetherFollowedUp)
        whereClause.latestFollowUpTime =
          whetherFollowedUp === 'true' ? { [Op.ne]: null } : null;
      if (latestFollowUpPerson)
        whereClause.followUpPerson = latestFollowUpPerson;
      if (appName) whereClause.appName = appName;

      const customers = await Customer.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'telemarketer',
          },
        ],
      });

      const items = customers.map((customer) => ({
        mobile: customer.mobile,
        name: customer.name,
        prevRepaymentTime: customer.prevRepaymentTime,
        appName: customer.appName,
        followUpPerson: customer.followUpPerson,
        whetherApply: customer.whetherApply,
        appTime: customer.appTime,
        allocationTime: customer.allocationTime,
        latestFollowUpTime: customer.latestFollowUpTime,
        followUpResults: customer.followUpResults,
        descFollowUp: customer.descFollowUp,
        whetherAssigned: customer.whetherAssigned,
      }));

      res.json({
        success: true,
        items,
        total: items.length,
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
        whetherApply,
        allocationTime,
        whetherAssigned,
        whetherFollowedUp,
        latestFollowUpPerson,
        appName,
      } = req.query;

      const whereClause: any = {
        type: 'registered',
        whetherApply: false,
      };

      if (importDate) whereClause.createdAt = importDate;
      if (userLabel) whereClause.userLabel = userLabel;
      if (mobile) whereClause.mobile = mobile;
      if (telemarketer) whereClause.telemarketerId = telemarketer;
      if (allocationTime) whereClause.allocationTime = allocationTime;
      if (whetherAssigned)
        whereClause.whetherAssigned = whetherAssigned === 'true';
      if (whetherFollowedUp)
        whereClause.latestFollowUpTime =
          whetherFollowedUp === 'true' ? { [Op.ne]: null } : null;
      if (latestFollowUpPerson)
        whereClause.followUpPerson = latestFollowUpPerson;
      if (appName) whereClause.appName = appName;

      const customers = await Customer.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'telemarketer',
          },
        ],
      });

      const items = customers.map((customer) => ({
        mobile: customer.mobile,
        name: customer.name,
        prevRepaymentTime: customer.prevRepaymentTime,
        appName: customer.appName,
        followUpPerson: customer.followUpPerson,
        whetherApply: customer.whetherApply,
        appTime: customer.appTime,
        allocationTime: customer.allocationTime,
        latestFollowUpTime: customer.latestFollowUpTime,
        followUpResults: customer.followUpResults,
        descFollowUp: customer.descFollowUp,
        whetherAssigned: customer.whetherAssigned,
      }));

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
