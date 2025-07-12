import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { User, UserStatus } from '../../database/models/user';

export class OperationController {
  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        account,
        email,
        name,
        status,
        group,
        workNum,
        voiceCollection,
        staffLvl,
        collectionDistributionRules,
        rulesApprovingDistribution,
        role,
      } = req.query;

      const whereClause: any = {};

      if (account) whereClause.email = account; // Assuming account is email
      if (email) whereClause.email = email;
      if (name) whereClause.name = name;
      if (status) whereClause.status = status;
      if (group) whereClause.group = group;
      if (workNum) whereClause.workNumber = workNum;
      if (voiceCollection)
        whereClause.voiceCollection = voiceCollection === 'true';
      if (staffLvl) whereClause.staffLevel = staffLvl;
      if (collectionDistributionRules)
        whereClause.collectionDistributionRules = collectionDistributionRules;
      if (rulesApprovingDistribution)
        whereClause.rulesApprovingDistribution = rulesApprovingDistribution;
      if (role) whereClause.role = role;

      const users = await User.findAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
      });

      const items = users.map((user) => ({
        serialNum: user.id,
        account: user.email,
        email: user.email,
        name: user.name,
        workNum: user.workNumber,
        creationTime: user.createdAt,
        entryTime: user.entryDate,
        group: user.group,
        role: user.role,
        staffLvl: user.staffLevel,
        collectionDistributionRules: user.collectionDistributionRules,
        rulesApprovingDistribution: user.rulesApprovingDistribution,
        weights: user.weights,
        voiceCollection: user.voiceCollection,
        updateTime: user.updatedAt,
        loginIp: user.lastLoginIp,
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

  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        email,
        account,
        workNum,
        name,
        password,
        entryTime,
        group,
        weights,
        loginSecurityVerification,
        role,
        voiceCollection,
        staffLvl,
        collectionDistributionRules,
        rulesApprovingDistribution,
      } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        email: email || account,
        workNumber: workNum,
        name,
        password: hashedPassword,
        entryDate: entryTime,
        group,
        weights,
        role,
        voiceCollection: voiceCollection || false,
        staffLevel: staffLvl,
        collectionDistributionRules,
        rulesApprovingDistribution,
        status: UserStatus.ACTIVE,
      }).catch((err) => {
        console.error("Détails de l'erreur:", err);
        throw err;
      });

      res.json({
        success: true,
        message: 'Account created successfully',
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
