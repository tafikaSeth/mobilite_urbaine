import { StyleSheet, Image, Platform, View, Button, FlatList, Text } from 'react-native';
import { createStore } from 'tinybase/store';
import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react';

interface Cooperative {
  id: string;
  cooperative_name: string;
  cooperative_address: string;
  date_creation: number;
}

const db = SQLite.openDatabaseAsync('local.db')
const store = createStore()

const initDb = async () => {
  (await db).execAsync(`
    CREATE TABLE IF NOT EXISTS cooperatives (
      id TEXT PRIMARY KEY,
      cooperative_name TEXT NOT NULL,
      cooperative_address TEXT,
      date_creation INTEGER NOT NULL
    )
  `)
}

const loadLocalData = async () => {
  try {
    const database = await db;
    
    // 1. Correction du type générique (retrait de [])
    const results = await database.getAllAsync<Cooperative>(
      'SELECT * FROM cooperatives'
    );
    
    // 2. Vérification du type des résultats
    console.log('Raw results:', results);

    // 3. Itération correctement typée
    results.forEach((coop: Cooperative) => {
      store.setRow('cooperatives', coop.id, {
        id: coop.id,
        cooperative_name: coop.cooperative_name,
        cooperative_address: coop.cooperative_address,
        date_creation: coop.date_creation,
        // Ajouter les 3 autres propriétés ici
      });
    });
    
  } catch (error) {
    console.error('Error loading cooperatives:', error);
  }
};


export default function TabTwoScreen() {
  useEffect(()=>{
    initDb()
    loadLocalData()
  })
  return (
    <Text>SALUT</Text>
    
)
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
