import { supabase } from '../../../../lib';
import { DistributionInput } from './interfaces';

export const collectionService = {
  async distribution(input: DistributionInput) {
    const { error } = await supabase
      .from('loans')
      .update({
        collector_id: input.id,
      })
      .in('id', input.selected)
      .select();

    if (error) return { success: false, message: 'Distribution failed' };

    return { success: true, message: 'Distribution done successfully' };
  },
};
