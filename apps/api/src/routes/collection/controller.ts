import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CollectionRecord } from '../../database/models/collectionRecord';
import { Customer } from '../../database/models/customer';
import { Loan } from '../../database/models/loan';
import { Performance } from '../../database/models/performance';
import { User } from '../../database/models/user';

export class CollectionController {
  async getMonthlyPerformance(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { group, date, status } = req.query;

      const whereClause: any = {
        type: 'collector_monthly',
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
        collectorsName: perf.user?.name,
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
        type: 'collector_daily',
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
        collectorsName: perf.user?.name,
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

      const whereClause: any = {};
      const customerWhereClause: any = {};

      if (mobile) customerWhereClause.mobile = mobile;
      if (name) customerWhereClause.name = name;
      if (loanNum) whereClause.loanNumber = loanNum;
      if (loanOrderNum) whereClause.loanOrderNumber = loanOrderNum;
      if (stage) whereClause.collectionStage = stage;
      if (collector) whereClause.collectorId = collector;
      if (product) whereClause.productName = product;
      if (loanTenure) whereClause.loanTenure = loanTenure;
      if (loanAmt) whereClause.loanAmount = loanAmt;
      if (appVersion) whereClause.appVersion = appVersion;
      if (dueDate) whereClause.dueDate = dueDate;
      if (loanStatus) whereClause.loanStatus = loanStatus;
      if (tag) whereClause.tag = tag;
      if (repeatedBorrowing)
        whereClause.repeatedBorrowing = repeatedBorrowing === 'true';
      if (loanType) whereClause.loanType = loanType;
      if (result) whereClause.result = result;
      if (appName) whereClause.appName = appName;

      const loans = await Loan.findAll({
        where: whereClause,
        include: [
          {
            model: Customer,
            where: customerWhereClause,
            as: 'customer',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'collector',
          },
          {
            model: CollectionRecord,
            as: 'collectionRecords',
          },
        ],
      });

      const items = loans.map((loan) => ({
        loanNum: loan.loanNumber,
        loanOrderNum: loan.loanOrderNumber,
        appName: loan.appName,
        name: loan.customer?.name,
        mobile: loan.customer?.mobile,
        dueDate: loan.dueDate,
        product: loan.productName,
        collector: loan.collector?.name,
        stage: loan.collectionStage,
        dailyTimes: loan.collectionRecords?.filter(
          (r) =>
            new Date(r.recordTime).toDateString() === new Date().toDateString()
        ).length,
        times: loan.collectionRecords?.length,
        log: loan.collectionRecords?.map((r) => r.recordContent).join('\n'),
        result: loan.collectionRecords?.[0]?.result,
        logUpdateTime: loan.collectionRecords?.[0]?.recordTime,
        lendingTime: loan.createdAt,
        paymentTime: loan.updatedAt,
        totalRepayment: loan.totalRepayment,
        loanAmt: loan.loanAmount,
        loanTenure: loan.loanTenure,
        loanType: loan.loanType,
        appStatus: loan.appStatus,
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

      const whereClause: any = {};
      const customerWhereClause: any = {};

      if (stage) whereClause.collectionStage = stage;
      if (collector) whereClause.collectorId = collector;
      if (product) whereClause.productName = product;
      if (userSelect) customerWhereClause.userLabel = userSelect;
      if (numLoans) customerWhereClause.numLoans = numLoans;
      if (appChannel) whereClause.appChannel = appChannel;
      if (loanNum) whereClause.loanNumber = loanNum;
      if (loanOrderNum) whereClause.loanOrderNumber = loanOrderNum;
      if (repeatedBorrowing)
        whereClause.repeatedBorrowing = repeatedBorrowing === 'true';
      if (daysOverdue) whereClause.daysOverdue = daysOverdue;
      if (mobile) customerWhereClause.mobile = mobile;
      if (result) whereClause.result = result;
      if (largeGroup) whereClause.largeGroup = largeGroup;
      if (district) customerWhereClause.district = district;
      if (otherStates) customerWhereClause.otherStates = otherStates;
      if (appName) whereClause.appName = appName;
      if (dueDate) whereClause.dueDate = dueDate;

      const loans = await Loan.findAll({
        where: whereClause,
        include: [
          {
            model: Customer,
            where: customerWhereClause,
            as: 'customer',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'collector',
          },
          {
            model: CollectionRecord,
            as: 'collectionRecords',
          },
        ],
      });

      const items = loans.map((loan) => ({
        loanNum: loan.loanNumber,
        loanOrderNum: loan.loanOrderNumber,
        appName: loan.appName,
        name: loan.customer?.name,
        district: loan.customer?.district,
        mobile: loan.customer?.mobile,
        dueDate: loan.dueDate,
        daysOverdue: loan.daysOverdue,
        totalRepayment: loan.totalRepayment,
        dailyTimes: loan.collectionRecords?.filter(
          (r) =>
            new Date(r.recordTime).toDateString() === new Date().toDateString()
        ).length,
        times: loan.collectionRecords?.length,
        log: loan.collectionRecords?.map((r) => r.recordContent).join('\n'),
        result: loan.collectionRecords?.[0]?.result,
        logUpdateTime: loan.collectionRecords?.[0]?.recordTime,
        product: loan.productName,
        userLvl: loan.customer?.userLabel,
        loanAmt: loan.loanAmount,
        loanTenure: loan.loanTenure,
        loanType: loan.loanType,
        appStatus: loan.appStatus,
        appChannel: loan.appChannel,
        amtRepaid: loan.amountRepaid,
        collector: loan.collector?.name,
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

      const whereClause: any = {};
      const loanWhereClause: any = {};
      const customerWhereClause: any = {};

      if (personnel) whereClause.collectorId = personnel;
      if (loanNum) loanWhereClause.loanNumber = loanNum;
      if (loanOrderNum) loanWhereClause.loanOrderNumber = loanOrderNum;
      if (mobile) customerWhereClause.mobile = mobile;
      if (mark) whereClause.mark = mark;
      if (recordTime) whereClause.recordTime = recordTime;
      if (contact) whereClause.contact = contact;
      if (targetContact) whereClause.targetContact = targetContact;
      if (connection) whereClause.connection = connection;
      if (willingnessPay) whereClause.willingnessToPay = willingnessPay;
      if (overdueReason) whereClause.overdueReason = overdueReason;
      if (result) whereClause.result = result;

      const records = await CollectionRecord.findAll({
        where: whereClause,
        include: [
          {
            model: Loan,
            where: loanWhereClause,
            as: 'loan',
            include: [
              {
                model: Customer,
                where: customerWhereClause,
                as: 'customer'
              },
            ],
          },
          {
            model: User,
            attributes: ['name'],
            as: 'collector',
          },
        ],
      });

      const items = records.map((record) => ({
        personnel: record.collector?.name,
        loanNum: record.loan?.loanNumber,
        loanOrderNum: record.loan?.loanOrderNumber,
        mobile: record.loan?.customer?.mobile,
        mark: record.mark,
        recordContent: record.recordContent,
        dailyTimes: record.loan?.collectionRecords?.filter(
          (r) =>
            new Date(r.recordTime).toDateString() ===
            new Date(record.recordTime).toDateString()
        ).length,
        times: record.loan?.collectionRecords?.length,
        contact: record.contact,
        targetContact: record.targetContact,
        connection: record.connection,
        willingnessPay: record.willingnessToPay,
        overdueReason: record.overdueReason,
        result: record.result,
        recordTime: record.recordTime,
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
