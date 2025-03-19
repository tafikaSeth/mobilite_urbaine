import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Importation des icônes nécessaires de la bibliothèque @expo/vector-icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={28} color={color} />, // Icône carte de crédit
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Payement',
          tabBarIcon: ({ color }) => <Ionicons name="card" size={28} color={color} />, // Icône exploration (loupe)
        }}
      />
      <Tabs.Screen
        name="parking"
        options={{
          title: 'Parking',
          tabBarIcon: ({ color }) => <MaterialIcons name="local-parking" size={28} color={color} />, // Icône parking
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <Ionicons name="qr-code" size={28} color={color} />, // Icône QR code pour scanner
        }}
      />
    </Tabs>
  );
}
