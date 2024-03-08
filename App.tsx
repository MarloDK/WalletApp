import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_300Light, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { fetchDatabase } from './src/storage/database';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackPropsList } from './src/storage/StackParams';
import { AccountScreen } from './src/screens/AccountScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { Header } from './src/components/CustomTextComponents';
import { stylingConfig } from './src/configs/styling.config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, Fontisto, Octicons } from '@expo/vector-icons';
import { SavingsScreen } from './src/screens/savings/SavingsScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { ViewSavingsGoalScreen } from './src/screens/savings/ViewSavingsGoalScreen';

// Keep the splash screen visible while the app is loading fonts etc.
SplashScreen.preventAutoHideAsync();

// Fetch DB
fetchDatabase();

const Stack = createBottomTabNavigator<RootStackPropsList>();

export default function App() {
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
      <StatusBar style="dark"/>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            size = 25;

            if (route.name === "Dashboard") {
              icon = <Octicons name='graph' size={size} color={color} />; // Octicons
            } else if (route.name === "Savings") {
              icon = <FontAwesome6 name='sack-dollar' size={size} color={color} />; // FontAwesome6
            } else if (route.name === "Budget") {
              icon = <Fontisto name='pie-chart-2' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
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
          headerLeft: () => null,
          headerShadowVisible: false,
        })}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
        />
        <Stack.Screen 
          name="Savings" 
          component={SavingsScreen}
        />
        <Stack.Screen 
          name="Budget" 
          component={BudgetScreen}
        />



        <Stack.Screen 
          name='Savings Goal'
          component={ViewSavingsGoalScreen}
          options={{ 
            headerShown: true,
            tabBarItemStyle: {
              display: 'none'
            }
          }}
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
