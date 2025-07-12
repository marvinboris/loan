import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Customer } from '../../database/models/customer';
import { Loan } from '../../database/models/loan';
import { Repayment } from '../../database/models/repayment';
import { User } from '../../database/models/user';

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

      const whereClause: any = {};
      const loanWhereClause: any = {};
      const customerWhereClause: any = {};

      if (mobile) customerWhereClause.mobile = mobile;
      if (name) customerWhereClause.name = name;
      if (daysOverdue) loanWhereClause.daysOverdue = daysOverdue;
      if (repaymentCodeVaLink)
        whereClause.repaymentCodeVaLink = repaymentCodeVaLink;
      if (tradingStatus) whereClause.tradingStatus = tradingStatus;
      if (paymentChannel) whereClause.paymentChannel = paymentChannel;
      if (repayment) whereClause.repaymentAmount = repayment;
      if (creationTime) whereClause.creationTime = creationTime;
      if (paybackTime) whereClause.paybackTime = paybackTime;
      if (loanNumber) loanWhereClause.loanNumber = loanNumber;
      if (repaymentNumber) whereClause.repaymentNumber = repaymentNumber;
      if (collector) whereClause.collectorId = collector;
      if (paymentCompanySerialNumber)
        whereClause.paymentCompanySerialNumber = paymentCompanySerialNumber;
      if (product) loanWhereClause.productName = product;

      const repayments = await Repayment.findAll({
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
                as: 'customer',
              },
              {
                model: User,
                attributes: ['name'],
                as: 'collector',
              },
            ],
          },
        ],
      });

      const items = repayments.map((repayment) => ({
        repaymentNum: repayment.repaymentNumber,
        loanNum: repayment.loan?.loanNumber,
        product: repayment.loan?.productName,
        name: repayment.loan?.customer?.name,
        mobile: repayment.loan?.customer?.mobile,
        tradingStatus: repayment.tradingStatus,
        repaymentCodeVaLink: repayment.repaymentCodeVaLink,
        repaymentAmt: repayment.repaymentAmount,
        realAmt: repayment.realAmount,
        latestFollowUpTime: repayment.latestFollowUpTime,
        followUpResults: repayment.followUpResults,
        descFollowUp: repayment.descFollowUp,
        whetherAssigned: repayment.whetherAssigned,
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

      const whereClause: any = {};
      const loanWhereClause: any = {};
      const customerWhereClause: any = {};

      if (mobile) customerWhereClause.mobile = mobile;
      if (name) customerWhereClause.name = name;
      if (daysOverdue) loanWhereClause.daysOverdue = daysOverdue;
      if (repaymentCodeVaLink)
        whereClause.repaymentCodeVaLink = repaymentCodeVaLink;
      if (tradingStatus) whereClause.tradingStatus = tradingStatus;
      if (paymentChannel) whereClause.paymentChannel = paymentChannel;
      if (repayment) whereClause.repaymentAmount = repayment;
      if (creationTime) whereClause.creationTime = creationTime;
      if (paybackTime) whereClause.paybackTime = paybackTime;
      if (loanNumber) loanWhereClause.loanNumber = loanNumber;
      if (repaymentNumber) whereClause.repaymentNumber = repaymentNumber;
      if (collector) loanWhereClause.collectorId = collector;
      if (paymentCompanySerialNumber)
        whereClause.paymentCompanySerialNumber = paymentCompanySerialNumber;
      if (product) loanWhereClause.productName = product;

      const loans = await Loan.findAll({
        where: loanWhereClause,
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
            model: Repayment,
            where: whereClause,
            as: 'repayments',
          },
        ],
      });

      const items = loans.map((loan) => ({
        repaymentNum: loan.repayments?.[0]?.repaymentNumber,
        loanNum: loan.loanNumber,
        product: loan.productName,
        name: loan.customer?.name,
        mobile: loan.customer?.mobile,
        tradingStatus: loan.repayments?.[0]?.tradingStatus,
        repaymentCodeVaLink: loan.repayments?.[0]?.repaymentCodeVaLink,
        repaymentAmt: loan.repayments?.[0]?.repaymentAmount,
        realAmt: loan.repayments?.[0]?.realAmount,
        latestFollowUpTime: loan.repayments?.[0]?.latestFollowUpTime,
        followUpResults: loan.repayments?.[0]?.followUpResults,
        descFollowUp: loan.repayments?.[0]?.descFollowUp,
        whetherAssigned: loan.repayments?.[0]?.whetherAssigned,
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

  async getReconciliation(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { mobile, loanNum, masterLoanNum } = req.query;

      const whereClause: any = {};
      const loanWhereClause: any = {};
      const customerWhereClause: any = {};

      if (mobile) customerWhereClause.mobile = mobile;
      if (loanNum) loanWhereClause.loanNumber = loanNum;
      if (masterLoanNum) loanWhereClause.masterLoanNumber = masterLoanNum;

      const repayments = await Repayment.findAll({
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
                as: 'customer',
              },
            ],
          },
        ],
      });

      const items = repayments.map((repayment) => ({
        repaymentNum: repayment.repaymentNumber,
        loanNum: repayment.loan?.loanNumber,
        product: repayment.loan?.productName,
        name: repayment.loan?.customer?.name,
        mobile: repayment.loan?.customer?.mobile,
        tradingStatus: repayment.tradingStatus,
        repaymentCodeVaLink: repayment.repaymentCodeVaLink,
        repaymentAmt: repayment.repaymentAmount,
        realAmt: repayment.realAmount,
        latestFollowUpTime: repayment.latestFollowUpTime,
        followUpResults: repayment.followUpResults,
        descFollowUp: repayment.descFollowUp,
        whetherAssigned: repayment.whetherAssigned,
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
