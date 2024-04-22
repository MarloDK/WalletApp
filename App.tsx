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
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, Feather, FontAwesome6, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { SavingsScreen } from './src/screens/savings/SavingsScreen';
import { BudgetScreen } from './src/screens/budget/BudgetScreen';
import { ViewSavingsGoalScreen } from './src/screens/savings/ViewSavingsGoalScreen';
import { EditSavingsGoalScreen } from './src/screens/savings/EditSavingsGoalScreen';
import { CreateSavingsGoalScreen } from './src/screens/savings/CreateSavingsGoalScreen';
import { AccountsScreen } from './src/screens/accounts/AccountsScreen';
import { ViewAccountScreen } from './src/screens/accounts/ViewAccountScreen';
import { EditAccountScreen } from './src/screens/accounts/EditAccountScreen';
import { CreateAccountScreen } from './src/screens/accounts/CreateAccountScreen';
import { PaymentsScreen } from './src/screens/payments/PaymentsScreen';
import { Stack, getHiddenScreenOptions } from './src/navigation/Stack';
import { AccountsNavigation } from './src/navigation/AccountsNavigation';
import { CreateSubscriptionScreen } from './src/screens/accounts/subscriptions/CreateSubscriptionScreen';
import { EditSubscriptionScreen } from './src/screens/accounts/subscriptions/EditSubscriptionScreen';

// Keep the splash screen visible while the app is loading fonts etc.
SplashScreen.preventAutoHideAsync();

// Fetch DB
fetchDatabase();

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
              icon = <MaterialIcons name="dashboard" size={size} color={color} /> ; // Octicons <Octicons name='graph' size={size} color={color} />
            } else if (route.name === "Accounts") {
              icon = <Entypo name='wallet' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
            } else if (route.name == "Payments") {
              icon = <MaterialIcons name='payments' size={size} color={color} />
            } else if (route.name === "Budget") {
              icon = <Feather name='trending-up' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
              // icon = <Fontisto name='pie-chart-2' size={size} color={color} />; // FontAwesome6 or pie-chart-2 from Fontisto
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
          name='ViewAccount'
          component={ViewAccountScreen}
          options={getHiddenScreenOptions("Account")}
        />
        <Stack.Screen 
          name='EditAccount'
          component={EditAccountScreen}
          options={getHiddenScreenOptions("Edit Account")}
        />
        <Stack.Screen 
          name='CreateAccount'
          component={CreateAccountScreen}
          options={getHiddenScreenOptions("New Account")}
        />

        <Stack.Screen
          name="CreateSubscription"
          component={CreateSubscriptionScreen}
          options={getHiddenScreenOptions("Create Subscription")}
        />
        <Stack.Screen
          name="EditSubscription"
          component={EditSubscriptionScreen}
          options={getHiddenScreenOptions("Edit Subscription")}
        />


        <Stack.Screen 
          name='Savings'
          component={SavingsScreen}
          options={getHiddenScreenOptions("Savings")}
        />
        <Stack.Screen 
          name='ViewSavingsGoal'
          component={ViewSavingsGoalScreen}
          options={getHiddenScreenOptions("Savings Goal")}
        />
        <Stack.Screen 
          name='EditSavingsGoal'
          component={EditSavingsGoalScreen}
          options={getHiddenScreenOptions("Edit Savings Goal")}
        />
        <Stack.Screen 
          name='CreateSavingsGoal'
          component={CreateSavingsGoalScreen}
          options={getHiddenScreenOptions("New Savings Goal")}
        />
      </Stack.Navigator>
      <StatusBar style="light"/>
    </NavigationContainer>
  );
}