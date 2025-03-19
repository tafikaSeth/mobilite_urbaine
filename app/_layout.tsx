import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" />
        <Stack.Screen name="client" options={{headerShown: true, title: "Client"}}/>
        <Stack.Screen name="cooperative" options={{headerShown: true, title: "Coopeartive"}}/>
        <Stack.Screen name="parking" options={{headerShown: true, title: "Agent"}}/>
        <Stack.Screen name="explore" options={{headerShown: true, title: "Proprietaire"}}/>
        <Stack.Screen name="chauffeur" options={{headerShown: true, title: "Chauffeur"}}/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
