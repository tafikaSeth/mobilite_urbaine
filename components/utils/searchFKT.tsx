type GeoJSONFeature = {
    properties: {
      LIB_FKT: string;
    };
    geometry: {
      type: string;
      coordinates: any[];
    };
  };
  
  type GeoJSONData = {
    features: GeoJSONFeature[];
  };
  
  export const searchFKT = (
    geojsonData: GeoJSONData,
    searchTerm: string
  ): string | null => {
    const found = geojsonData.features.find(
      (feature) => feature.properties.LIB_FKT.toLowerCase() === searchTerm.toLowerCase()
    );
  
    return found ? found.properties.LIB_FKT : null;
  };
  