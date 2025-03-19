import axios from 'axios';
import { Alert } from 'react-native';

type LocationType = {
  latitude: number;
  longitude: number;
};

export type RouteData = {
  coordinates: LocationType[];
  distance: number; // en mètres
  duration: number; // en secondes
};

const OSRM_BASE_URL = 'http://router.project-osrm.org'; // URL de l'instance OSRM

export const fetchRoute = async (
  start: LocationType,
  end: LocationType
): Promise<RouteData | null> => {
  try {
    const url = `${OSRM_BASE_URL}/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson`;
    const response = await axios.get(url);

    if (response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const coordinates = route.geometry.coordinates.map((coord: [number, number]) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      return {
        coordinates,
        distance: route.distance, // distance en mètres
        duration: route.duration, // durée en secondes
      };
    }
  } catch (error) {
    Alert.alert('Erreur', 'Impossible de récupérer l’itinéraire.');
    console.error(error);
  }
  return null;
};
