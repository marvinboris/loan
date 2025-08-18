import { body, query } from 'express-validator';

export const telemarketingValidators = {
  getKyc: [
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
  getBorrow: [
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
};
