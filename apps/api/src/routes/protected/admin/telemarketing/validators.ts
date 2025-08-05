import { body, query } from 'express-validator';

export const telemarketingValidators = {
  getMonthlyPerformance: [
    query('group').optional().isString(),
    query('date').optional().isISO8601(),
    query('status').optional().isString(),
  ],
  getDailyPerformance: [
    query('group').optional().isString(),
    query('date').optional().isISO8601(),
    query('status').optional().isString(),
  ],
  getTeamMonthlyPerformance: [
    query('group').optional().isString(),
    query('status').optional().isString(),
  ],
  getTeamDailyPerformance: [
    query('group').optional().isString(),
    query('status').optional().isString(),
  ],
  getNewCustomers: [
    query('importDate').optional().isISO8601(),
    query('userLabel').optional().isString(),
    query('mobile').optional().isString(),
    query('telemarketer').optional().isInt(),
    query('whetherApply').optional().isIn(['true', 'false']),
    query('allocationTime').optional().isISO8601(),
    query('whetherAssigned').optional().isIn(['true', 'false']),
    query('whetherFollowedUp').optional().isIn(['true', 'false']),
    query('latestFollowUpPerson').optional().isString(),
    query('appName').optional().isString(),
  ],
  getOldCustomers: [
    query('importDate').optional().isISO8601(),
    query('userLabel').optional().isString(),
    query('mobile').optional().isString(),
    query('telemarketer').optional().isInt(),
    query('whetherApply').optional().isIn(['true', 'false']),
    query('allocationTime').optional().isISO8601(),
    query('whetherAssigned').optional().isIn(['true', 'false']),
    query('whetherFollowedUp').optional().isIn(['true', 'false']),
    query('latestFollowUpPerson').optional().isString(),
    query('appName').optional().isString(),
  ],
  getRegisteredCustomers: [
    query('importDate').optional().isISO8601(),
    query('userLabel').optional().isString(),
    query('mobile').optional().isString(),
    query('telemarketer').optional().isInt(),
    query('allocationTime').optional().isISO8601(),
    query('whetherAssigned').optional().isIn(['true', 'false']),
    query('whetherFollowedUp').optional().isIn(['true', 'false']),
    query('latestFollowUpPerson').optional().isString(),
    query('appName').optional().isString(),
  ],
};
