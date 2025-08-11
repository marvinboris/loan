import { supabase } from '../lib';

// Nouvelle regex qui accepte + au début et des espaces
function isPhoneNumberValid(phoneNumber: string | null): boolean {
  if (!phoneNumber) return false;
  return /^\+?[0-9\s]+$/.test(phoneNumber);
}

export async function cleanCustomers() {
  try {
    console.log('Début du nettoyage des numéros de téléphone invalides...');

    // 1. Récupérer tous les customers
    const { data: customers, error: fetchError } = await supabase
      .from('customers')
      .select('id, mobile');

    if (fetchError) {
      throw fetchError;
    }

    if (!customers || customers.length === 0) {
      console.log('Aucun client trouvé dans la base de données.');
      return;
    }

    console.log(`Nombre total de customers: ${customers.length}`);

    // 2. Filtrer les customers avec des numéros invalides
    const invalidClients = customers.filter(
      (client) => !isPhoneNumberValid(client.mobile)
    );

    console.log(
      `Nombre de customers avec numéros invalides: ${invalidClients.length}`
    );

    if (invalidClients.length === 0) {
      console.log('Aucun client avec numéro de téléphone invalide trouvé.');
      return;
    }

    // 3. Option 1: Supprimer les customers invalides
    const { error: deleteError } = await supabase
      .from('customers')
      .delete()
      .in(
        'id',
        invalidClients.map((client) => client.id)
      );

    // 3. Option 2: Alternative - Mettre à jour avec une valeur null au lieu de supprimer
    // const { error: updateError } = await supabase
    //   .from('customers')
    //   .update({ mobile: null })
    //   .in('id', invalidClients.map(client => client.id));

    if (deleteError) {
      throw deleteError;
    }

    console.log(
      `Opération réussie sur ${invalidClients.length} customers avec numéros invalides.`
    );
  } catch (error) {
    console.error('Erreur lors du nettoyage des numéros de téléphone:', error);
  }
}

