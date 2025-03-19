import { StyleSheet, Image, Platform, View, Button, FlatList, Text } from 'react-native';
import { createStore } from 'tinybase/store';
import * as SQLite from 'expo-sqlite'
import { useEffect } from 'react';

interface Cooperative {
  id: number;
  name: string;
}

const store = createStore()

export default function TabTwoScreen() {
  const initDb = async () => {
    const database = await SQLite.openDatabaseAsync('testa.db')
    try {
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS Test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
      `)
      await database.runAsync('INSERT INTO Test (name) VALUES (?);', ['Expo SQLite Test']);
      const results = await database.getAllAsync('SELECT name FROM Test');
      console.log('📦 Résultats de la base de données:', results);
    }
    catch (error) {
      console.log("Error", error);
      
    }
  }
  useEffect(()=>{
    initDb()
  }, [])
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
