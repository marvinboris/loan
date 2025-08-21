import moment from 'moment';
import { supabase } from '../lib';
import { CreateLoanInput, LoanStatus, UpdateLoanInput } from '../types';

export async function cleanLoans() {
  try {
    console.log("Début du nettoyage des demandes d'emprunt invalides...");
    // 1. Récupérer tous les prêts où due_date est null
    let page = 0;
    const batchSize = 1000;
    let hasMore = true;
    let totalUpdated = 0;

    while (hasMore) {
      console.log(`Traitement du batch ${page + 1}...`);

      const { data: loans, error: fetchError } = await supabase
        .from('loans')
        .select()
        .eq('loan_status', LoanStatus.ACCEPTED)
        .range(page * batchSize, (page + 1) * batchSize - 1)
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw new Error(
          `Erreur lors de la récupération: ${fetchError.message}`
        );
      }

      if (!loans || loans.length === 0) {
        hasMore = false;
        console.log('Aucun enregistrement à traiter dans ce batch');
        break;
      }

      // 2. Préparer les mises à jour
      const updates = loans.map((loan) => ({
        ...loan,
        due_date: moment(loan.updated_at).add(1, 'week').toISOString(),
      }));

      // 3. Exécuter les mises à jour par batch
      const { error: updateError } = await supabase
        .from('loans')
        .upsert(updates, {
          onConflict: 'id',
          ignoreDuplicates: false,
        });

      if (updateError) {
        throw new Error(
          `Erreur lors de la mise à jour: ${updateError.message}`
        );
      }

      totalUpdated += updates.length;
      console.log(
        `Batch ${page + 1} terminé: ${
          updates.length
        } enregistrements mis à jour`
      );

      page++;

      // Petite pause pour éviter de surcharger la base de données
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(
      `Migration terminée! ${totalUpdated} enregistrements mis à jour.`
    );
  } catch (error) {
    console.error("Erreur lors du nettoyage des demandes d'emprunt:", error);
  }
}
