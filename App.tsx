import { Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { stylingConfig } from './src/configs/styling.config';
import { Stack, getHiddenScreenOptions } from './src/navigation/Stack';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { AccountsScreen } from './src/screens/accounts/AccountsScreen';
import { ViewAccountScreen } from './src/screens/accounts/ViewAccountScreen';
import { BudgetScreen } from './src/screens/budget/BudgetScreen';
import { SavingScreen } from './src/screens/budget/SavingScreen';
import { PaymentsScreen } from './src/screens/payments/PaymentsScreen';
import { fetchDatabase } from './src/storage/database';

// Keep the splash screen visible while the app is loading fonts etc.
SplashScreen.preventAutoHideAsync();

// Fetch DB
fetchDatabase();

export default function App() {
  // Import static inter fonts
  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
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
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Stack.Navigator
        screenOptions={({ route }: any) => ({
          tabBarIcon: ({ focused, color, size }: any) => {
            let icon;
            size = 25;

            if (route.name === "Dashboard") {
              icon = <MaterialIcons name="dashboard" size={size} color={color} /> ; // Octicons <Octicons name='graph' size={size} color={color} />
            } else if (route.name === "Accounts") {
              icon = <Entypo name='wallet' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
            } else if (route.name == "Payments") {
              icon = <MaterialIcons name='payments' size={size} color={color} />
            } else if (route.name === "Budget") {
              icon = <Feather name='trending-up' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
            } else if (route.name === "Saving") {
              icon = <MaterialIcons name='savings' size={size} color={color} />
            }

            return icon;
          },
          tabBarActiveTintColor: stylingConfig.colors.primary,
          tabBarInactiveTintColor: stylingConfig.colors.text.textSecondary,
          tabBarLabelStyle: {
            marginBottom: 5,
            fontFamily: stylingConfig.fontWeight.medium,
            fontSize: 10,
          },
          tabBarIconStyle: {
            padding: 0,
            margin: 0,
          },
          tabBarStyle: {
            borderTopWidth: 0,
            shadowColor: stylingConfig.colors.shadow,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 1,
            shadowRadius: 4,
            height: 60,
            marginBottom: 50,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingBottom: 0,
            alignItems: 'flex-end',
            elevation: 0,
            position: 'absolute',
          },

          headerStyle: {
            backgroundColor: stylingConfig.colors.primary,
            height: 110,
          },
          headerTintColor: stylingConfig.colors.primary,
          headerTitleStyle: {
            fontFamily: stylingConfig.fontWeight.semiBold,
            color: stylingConfig.colors.text.textLight,
            fontSize: stylingConfig.fontSizes.h1,
          },
          headerTitleContainerStyle: {
            paddingBottom: 10,
          },
          headerBackVisible: true,
          headerShadowVisible: false,
        })}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
        />
        <Stack.Screen
          name="Accounts"
          component={AccountsScreen}
        />
        <Stack.Screen 
          name="Payments"
          component={PaymentsScreen}
        />
        <Stack.Screen 
          name="Budget" 
          component={BudgetScreen}
        />
        <Stack.Screen 
          name="Saving" 
          component={SavingScreen}
        />

        <Stack.Screen 
          name='ViewAccount'
          component={ViewAccountScreen}
          options={getHiddenScreenOptions("Account")}
        />
      </Stack.Navigator>
      <StatusBar style="light"/>
    </NavigationContainer>
  );
}