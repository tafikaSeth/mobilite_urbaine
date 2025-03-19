export const fetchAdress = async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'VotreApplication/1.0 (votre.email@example.com)',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log('Réponse de Nominatim :', data);
  
      if (data && data.address && data.address.neighbourhood) {
        return data.address.neighbourhood;
      } else {
        console.warn('Aucune adresse trouvée pour ces coordonnées.');
        return data.address.suburb;
      }
    } catch (error) {
      console.error('Erreur lors de la géolocalisation inverse :', error);
      return null;
    }
  };
  