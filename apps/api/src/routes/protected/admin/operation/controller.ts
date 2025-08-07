import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../../../lib';
import { UserRole, UserStatus } from '../../../../types';
import { filter } from '../../../../utils';

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

      let query = supabase.from('users').select('*');

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
      const { data: users, error } = await query.range(from, to);

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

      const {
        email,
        account, // Alias pour email
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

      // Vérifier si l'email existe déjà
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Un compte avec cet email existe déjà',
        });
      }

      if (checkError && checkError.code !== 'PGRST116') {
        // Ignorer l'erreur "Aucune ligne trouvée"
        throw checkError;
      }

      // Hacher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Créer l'utilisateur
      const { data: user, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          account,
          work_number: workNum,
          name,
          password: hashedPassword,
          entry_date: entryTime,
          group,
          weights,
          role,
          voice_collection: voiceCollection || false,
          staff_level: staffLvl,
          collection_distribution_rules: collectionDistributionRules,
          rules_approving_distribution: rulesApprovingDistribution,
          status: UserStatus.ACTIVE,
        })
        .select('id, email, name, role, created_at')
        .single();

      if (createError) throw createError;

      res.json({
        success: true,
        message: 'Compte créé avec succès',
        data: {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          role: user?.role,
          createdAt: user?.created_at,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
