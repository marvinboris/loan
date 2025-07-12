import { sequelize } from './connection';
import './models'; // Importer tous les modèles et relations

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: false }); // force: true pour recréer les tables
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
