import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Image, Alert, Button, TextInput, Pressable} from 'react-native';
import MapView, { Marker, Polygon, Polyline, Region } from 'react-native-maps';
import* as Location from 'expo-location'
import { fetchRoute, RouteData } from '@/components/utils/fetchRoute';
import geojsonData from '../assets/fokotany.json'
import { mapStyle } from '@/assets/style/mapStyle';
import locations from '../assets/location.json'
import { fetchAdress } from '@/components/utils/fetchAdress';
import { searchFKT } from '@/components/utils/searchFKT';
// import LoadingPosition from '@/components/utils/loadingPostion';

type LocationType = {
  latitude : number;
  longitude : number;
}
const imageMap: Record<string, any> = {
  location: require('../assets/icons/location.png'),
  camion : require('../assets/icons/camion.png'),
  moto : require('../assets/icons/moto.png')
};

export default function Mape () {
  const mapRef = useRef<MapView>(null)
  const [userLocation, setUserLocation] = useState<LocationType | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LocationType[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolygon, setSelectedPolygon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const infoBoxAnim = useRef(new Animated.Value(0)).current;

  const handlePolygonPress = (libFkt : string) => {
    Alert.alert(`Quartier de ${libFkt}`);
  }

  const showChat = () => {
    Animated.timing(infoBoxAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
  const handleSearch = () => {
    const result = searchFKT(geojsonData, searchTerm);
    if (result) {
      setSelectedPolygon(result);
      console.log("ty" + selectedPolygon);
      
    } else {
      alert('Aucun résultat trouvé');
      setSelectedPolygon(null); // Réinitialiser la sélection si aucun résultat n'est trouvé
    }
    
  }


  //convertir les polygones en tab de points
  const convert = () => {
    geojsonData.features.forEach((feature, index) => {
      const { geometry, properties } = feature;
      // console.log("FORY"+properties.LIB_FKT + JSON.stringify(geometry.coordinates));
      
      if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach((polygon, polygonIndex) => {
          // Transformer chaque polygone en tableau de points
          const coordinates = polygon[0].map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }));
          
        });
      }
    });
  }

  const fetchUserLocation = async () => {
    try {
      // Demander la permission de localisation
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée.');
        setLoading(false);
        return;
      }

      // Obtenir la position actuelle
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(coords);
      setLoading(false); // Fin du chargement
      // Ajoutez un délai de 1 seconde avant de retirer l'animation
      setTimeout(() => {
        setLoadingDelay(false);
      }, 1000);
      // Zoom automatique sur la position actuelle
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            ...coords,
            latitudeDelta: 0.01, // Zoom sur une petite zone
            longitudeDelta: 0.01,
          },
          1000 // Durée de l'animation (ms)
        );
      }
    } catch (error) {
      setErrorMsg('Erreur lors de la récupération de votre position.');
      console.error(error);
      setLoading(false);
      setLoadingDelay(false); // Arrêter le délai après l'erreur
    } finally {
      setLoading(false);
    }
  };

  const handleRouteFetch = async (destination: LocationType) => {
    if (userLocation) {
      const route = await fetchRoute(userLocation, destination);
      if (route) {
        setRouteCoordinates(route.coordinates);
        setDistance(route.distance); // Distance en mètres
        setDuration(route.duration); // Durée en secondes
      
        const address = await fetchAdress(destination.latitude, destination.longitude);

        if (address) {
          console.log('Adresse récupérée :', address);
          setAddress(address); // Stocke l'adresse dans l'état
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer l\'adresse.');
        }

        // Show infoBox with animation
        Animated.timing(infoBoxAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
  };

  const resetRoute = () => {
    setRouteCoordinates([]);
    setDistance(null);
    setDuration(null);

    // Hide infoBox with animation
    Animated.timing(infoBoxAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {    
    convert()
    fetchUserLocation();
    }, [])

    // if (loading || loadingDelay) {
    //   return <LoadingPosition/>
    // }
  
    if (errorMsg) {
      return (
        <View>
          <Text>{errorMsg}</Text>
        </View>
      );
    }

  return(
      <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>
        <MapView
          ref={mapRef} 
          style={{ flex: 1 }}
          showsCompass={false}          // Supprime la boussole
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: userLocation?.latitude || 0,
            longitude: userLocation?.longitude || 0,
            latitudeDelta: 0.02, // Valeurs par défaut
            longitudeDelta: 0.02,
          }}
        >
        {geojsonData.features.map((feature, index) => {
          const { geometry, properties } = feature;

          if (geometry.type === 'MultiPolygon') {
            return geometry.coordinates.map((polygon, polygonIndex) => {
              const isSelected = properties.LIB_FKT === selectedPolygon; // Vérification si le polygone est sélectionné

              return (
                <Polygon
                  key={`${index}-${polygonIndex}`}
                  coordinates={polygon[0].map((coord) => ({
                    latitude: coord[1],
                    longitude: coord[0],
                  }))}
                  fillColor={isSelected ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'} // Rouge si sélectionné, vert sinon
                  strokeColor="rgba(0, 0, 0, 0.5)" // Couleur des bordures
                  strokeWidth={1}
                />
              );
            });
          }
          return null;
        })}
          {userLocation && (
            
            <Marker
              coordinate={userLocation}
              title="Moi"
              description="Votre position actuelle"
          />
        )}

        { locations.map((location) => (
            <Marker
              key = {location.id}
              coordinate={{
                latitude : location.latitude,
                longitude: location.longitude
              }}
              title = {location.title}
              description = {location.description} 
              onPress = {() => handleRouteFetch({ latitude: location.latitude, longitude: location.longitude})}
            >
              <Image
                source={imageMap[location.image]}
                style={styles.markerImage} // Appliquer les styles pour ajuster la taille
                resizeMode="contain"
              />
            </Marker>
        ))
        }

          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={5}
              strokeColor="blue"
            />
        )}
        </MapView>

      {/* Animated InfoBox */}
      <Animated.View
        style={[
          styles.infoBox,
          {
            transform: [
              {
                translateY: infoBoxAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0], // From off-screen to visible
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.infoText}>
          Distance : {(distance! / 1000).toFixed(2)} km
        </Text>
        <Text style={styles.infoText}>
          Durée en voiture : {formatDuration(duration!)}
        </Text>
        <Text style={styles.infoText}>
          Adresse: {address}
        </Text>
        <Text style={styles.infoText}>
          Contact : 0384816313
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.resetButton} onPress={resetRoute}>
            <Text style={styles.resetButtonText}>Autre Bus</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row', // Disposition en ligne
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center', // Centrer verticalement les éléments
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 0, // Ombre pour Android
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  map: {
    flex: 1,
  },
  errorText: {
    color : 'red',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  infoBox: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row', // Disposition horizontale
    justifyContent: 'space-around', // Espace entre les boutons
    marginTop: 10, // Espacement avec le contenu précédent
  },
  resetButton: {
    width: '40%',
    backgroundColor: '#c90d0d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
})