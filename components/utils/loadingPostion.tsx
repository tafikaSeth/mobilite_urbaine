import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from "lottie-react-native" // Assurez-vous d'installer cette bibliothèque

const LoadingPosition = () => {
  return (
    <View style={styles.loaderContainer}>
      {/* Animation de chargement avec Lottie */}
      <LottieView
        source={require('../../assets/animations/Animation - 1733216610019.json')} // Assurez-vous de mettre le bon chemin de votre fichier JSON d'animation
        autoPlay
        loop
        style={styles.loader}
      />
      <Text>Chargement...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loader: {
    width: 100,
    height: 100,
  },
});

export default LoadingPosition;
