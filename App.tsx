import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { fetchDatabase } from './src/storage/database';


// Keep the splash screen visible while the app is loading fonts etc.
SplashScreen.preventAutoHideAsync();

// Fetch DB
fetchDatabase();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded])


  // Return placeholder view while app is loading
  if (!fontsLoaded) {
    return (
      <View>
        <Text>App is loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#181824',
      paddingHorizontal: 20,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <StatusBar style="dark"/>
      <HomeScreen />
    </SafeAreaView>
  );
}
