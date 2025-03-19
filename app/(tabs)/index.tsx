import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { initDatabase } from '../database/database';
import { useAsync } from '../hooks/useSync';
import { useEffect } from 'react';
import MapeCovoiturage from '../mapCovoiturage';

export default function HomeScreen() {

  useEffect(()=>{
    initDatabase()
  }, [])

  useAsync()
  return (
    <View style={{flex: 1}}>
      <MapeCovoiturage/>
    </View>
  );
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
