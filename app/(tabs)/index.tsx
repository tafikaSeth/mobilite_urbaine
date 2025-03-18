import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { initDatabase } from '../database/database';
import { useAsync } from '../hooks/useSync';
import { useEffect } from 'react';

export default function HomeScreen() {

  useEffect(()=>{
    initDatabase()
  }, [])

  useAsync()
  return (
    <View>
      <Text>OFFLINE FIRST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
