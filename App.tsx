import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { fetchDatabase } from './src/storage/database';
import { FinancialEntityCreationScreen } from './src/screens/FinancialEntityCreationScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackPropsList } from './src/storage/StackParams';
import { title } from 'process';

// Keep the splash screen visible while the app is loading fonts etc.
SplashScreen.preventAutoHideAsync();

// Fetch DB
fetchDatabase();

const Stack = createStackNavigator<RootStackPropsList>();

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


  // <HomeScreen />
  // <FinancialEntityCreationScreen />
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#181824',
          },
          headerTintColor: '#181824',
          headerTitleStyle: {
            fontFamily: 'Inter_500Medium',
            color: '#FFF',
            fontSize: 25,
          },
          headerLeft: () => null,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateEntity" 
          component={FinancialEntityCreationScreen}
          options={
            () => ({ title: 'Opret'})
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#181824',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
    }}>

      <StatusBar style="dark"/>
      <FinancialEntityCreationScreen />
    </SafeAreaView>
*/
