import bcrypt from 'bcryptjs';
import { supabase } from '../../../../lib';
import { CreateUserInput, UserStatus } from '../../../../types';
import { CreateAccountInput, EditAccountInput } from './interfaces';

export const operationService = {
  async createAccount(input: CreateAccountInput) {
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
    } = input;

    // Vérifier si l'email existe déjà
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists',
      };
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
      } satisfies CreateUserInput)
      .select('id, email, name, role, created_at')
      .single();

    if (createError) throw createError;

    return {
      success: true,
      message: 'Account created successfully',
    };
  },

  async editAccount(id: number, input: EditAccountInput) {
    let {
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
      status,
    } = input;

    if (password) {
      // Hacher le mot de passe
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
    // Modifier l'utilisateur
    const { error: createError } = await supabase
      .from('users')
      .update({
        email,
        account,
        work_number: workNum,
        name,
        entry_date: entryTime,
        group,
        weights,
        role,
        voice_collection: voiceCollection || false,
        staff_level: staffLvl,
        collection_distribution_rules: collectionDistributionRules,
        rules_approving_distribution: rulesApprovingDistribution,
        status,
        ...(password
          ? {
              password,
            }
          : {}),
      })
      .eq('id', id);

    if (createError) throw createError;

    return {
      success: true,
      message: 'Account updated successfully',
    };
  },

  async deleteAccount(id: number) {
    // Créer l'utilisateur
    const { error: createError } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (createError) throw createError;

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  },
};
