import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import { initDatabase } from './database/database';
import { useAsync } from './hooks/useSync';
import { useEffect, useState } from 'react';
import Login from './login';

export default function HomeScreen() {
  const[screen, setScreen] = useState(true)

  useEffect(()=>{
    initDatabase()
  }, [])

  useAsync()
  return (
    <View style={{flex: 1}}>
      {/* <View style={styles.iconFilter}>
        <TouchableOpacity
          onPress={() => setScreen(!screen)}
        >
          <MaterialIcons name='filter-frames' size={28} color="black"/>
        </TouchableOpacity>
      </View>
      {screen ? <MapeCovoiturage/> : <Mape/>} */}
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  iconFilter: {
    // position: 'static',
    backgroundColor: 'transparent',
    // marginVertical: 10,
    top: 10,
    zIndex: 1
  }
});