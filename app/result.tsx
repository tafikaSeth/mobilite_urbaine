import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



interface QRResultProps {
  data: string;
  resetScan: () => void;
}

const STATUS_ITEMS = {
  licence: true,
  document: true,
  patente: false,
  teste: true,
  bi: false,
  fe: true,
  nu: false,
};

export default function QRResult({ data, resetScan }: QRResultProps) {
  const [affiche, setAffiche] = useState<any>(null);
  

  

  return (
    <View style={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.title}>Résultat du QR Code</Text>
        <Text style={styles.data}>{data}</Text>
      </View>

      
      {affiche ? (
        <ScrollView style={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Informations Propriétaire</Text>
            <View style={styles.infoContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.image}
              />
              <View style={styles.infoText}>
                <Text style={styles.name}>{affiche.proprietaire.name}</Text>
                <Text style={styles.phone}>{affiche.proprietaire.phone}</Text>
              </View>
            </View>
          </View>

          {/* Section chauffeur */}
          <View style={styles.section}>
            <Text style={styles.subtitle}>Informations Chauffeur</Text>
            <View style={styles.infoContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.image}
              />
              <View style={styles.infoText}>
                <Text style={styles.name}>{affiche.chauffeur.name}</Text>
                <Text style={styles.phone}>{affiche.chauffeur.numero}</Text>
              </View>
            </View>
          </View>

          {/* Section statut */}
          <View style={styles.section}>
            <Text style={styles.subtitle}>Statut</Text>
            {Object.entries(STATUS_ITEMS).map(([key, value]) => (
              <View
                key={key}
                style={[
                  styles.statusItem,
                  value ? styles.valid : styles.invalid,
                ]}
              >
                <Text style={styles.statusKey}>{key}</Text>
                <Text
                  style={[
                    styles.statusValue,
                    value ? styles.validText : styles.invalidText,
                  ]}
                >
                  {value ? 'Validé' : 'Non validé'}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Scanner à nouveau"
              onPress={resetScan}
              color="#4CAF50"
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.data}>Chargement des informations...</Text>
      )}
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    paddingTop: 65,
  },
  section: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scroll: {
    height: '100%',
  },
  data: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 8,
  },
  valid: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
  },
  invalid: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: '#F44336',
  },
  statusKey: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  validText: {
    color: '#4CAF50',
  },
  invalidText: {
    color: '#F44336',
  },
  buttonContainer: {
    marginTop: 16,
  },
});
