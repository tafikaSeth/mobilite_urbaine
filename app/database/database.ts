import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('cooperatives.db');

// Création de la table si elle n'existe pas
export const initDatabase = async () => {
    await (await db).runAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Cooperatives (
            id INTEGER PRIMARY KEY,
            cooperatives_name TEXT NOT NULL,
            synced INTEGER DEFAULT 0
    );
  `);
};

// Exporte la base de données pour être utilisée ailleurs
export { db };
