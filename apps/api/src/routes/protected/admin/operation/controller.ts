import { UserRole, UserStatus } from '../../../../types';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../../../lib';
import { filter } from '../../../../utils';
import { operationService } from './service';

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

      let query = supabase.from('users').select('*', { count: 'exact' });

      // Appliquer les filtres
      // if (account) query = query.eq('account', account as string);
      if (email) query = query.eq('email', email as string);
      if (name) query = query.ilike('name', `%${name}%`);
      if (status) query = query.eq('status', status as string as UserStatus);
      if (group) query = query.eq('group', group as string);
      if (workNum) query = query.eq('work_number', workNum as string);
      if (voiceCollection)
        query = query.eq('voice_collection', voiceCollection === 'true');
      if (staffLvl) query = query.eq('staff_level', staffLvl as string);
      if (collectionDistributionRules)
        query = query.eq(
          'collection_distribution_rules',
          collectionDistributionRules as string
        );
      if (rulesApprovingDistribution)
        query = query.eq(
          'rules_approving_distribution',
          rulesApprovingDistribution as string
        );
      if (role) query = query.eq('role', role as string as UserRole);

      const total = (await query).count;
      const [from, to] = filter(req.query);
      const { data: users, error } = await query
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const items =
        users?.map((user) => ({
          id: user.id,
          serialNum: user.id,
          // account: user.account,
          email: user.email,
          name: user.name,
          workNum: user.work_number,
          creationTime: user.created_at,
          entryTime: user.entry_date,
          group: user.group,
          role: user.role,
          staffLvl: user.staff_level,
          collectionDistributionRules: user.collection_distribution_rules,
          rulesApprovingDistribution: user.rules_approving_distribution,
          weights: user.weights,
          voiceCollection: user.voice_collection,
          updateTime: user.updated_at,
          loginIp: user.last_login_ip,
          status: user.status,
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

  async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await operationService.createAccount(req.body);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async editAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await operationService.editAccount(
        +req.params.id,
        req.body
      );

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await operationService.deleteAccount(+req.params.id);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
