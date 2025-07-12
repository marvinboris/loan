#!/usr/bin/env ts-node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import {
  CollectionRecord,
  Customer,
  Loan,
  Performance,
  Repayment,
  sequelize,
  User,
} from '../models'; // Importez vos modèles

const models = {
  CollectionRecord,
  Customer,
  Loan,
  Performance,
  Repayment,
  User,
};

async function listModelData(
  modelName: string,
  limit: number = 10,
  offset: number = 0
) {
  try {
    // Vérifiez que le modèle existe
    if (!(modelName in models)) {
      console.error(
        `Modèle "${modelName}" non trouvé. Modèles disponibles : ${Object.keys(
          models
        ).join(', ')}`
      );
      process.exit(1);
    }

    const Model: any = models[modelName as keyof typeof models];
    const results = await Model.findAll({
      limit,
      offset,
      raw: true, // Pour obtenir des objets JavaScript simples
    });

    console.log(
      `\nDonnées de la table ${modelName} (${results.length} résultats) :`
    );
    console.table(results);

    return results;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données :`, error);
    process.exit(1);
  }
}

// Configuration de yargs
const argv = yargs(hideBin(process.argv))
  .scriptName('list-db-data')
  .usage('$0 <model> [options]')
  .command('$0 <model>', "Lister les données d'un modèle", (yargs) => {
    return yargs.positional('model', {
      describe: 'Nom du modèle à lister',
      type: 'string',
      choices: Object.keys(models),
    });
  })
  .option('limit', {
    alias: 'l',
    type: 'number',
    default: 10,
    description: "Nombre maximum d'entrées à afficher",
  })
  .option('offset', {
    alias: 'o',
    type: 'number',
    default: 0,
    description: 'Décalage pour la pagination',
  })
  .example([
    ['$0 User', 'Affiche les 10 premiers utilisateurs'],
    [
      '$0 Customer --limit 20 --offset 5',
      'Affiche 20 clients à partir du 6ème',
    ],
  ])
  .help()
  .parseSync();

// Exécution du script
(async () => {
  await sequelize.authenticate(); // Teste la connexion à la DB
  await listModelData(argv.model as string, argv.limit, argv.offset);
  await sequelize.close();
})();
