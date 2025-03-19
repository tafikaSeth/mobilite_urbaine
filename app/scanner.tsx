import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Animated } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import QRResult from './(tabs)/result';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setQrData(data);
  };

  if (hasPermission === null) {
    return <Text>Demande d'autorisation pour utiliser la caméra...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Autorisation de la caméra refusée.</Text>;
  }

  if (qrData) {
    return <QRResult data={qrData} resetScan={() => setQrData(null)} />;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.frameContainer}>
        <Animated.View
          style={[
            styles.frame,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        />
      </View>
      {scanned && (
        <Button title="Scanner à nouveau" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const frameSize = width * 0.6;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: frameSize,
    height: frameSize,
    marginLeft: -frameSize / 2,
    marginTop: -frameSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: 'lime',
    borderRadius: 10,
  },
});