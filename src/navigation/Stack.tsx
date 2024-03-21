import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackPropsList } from "../storage/StackParams";

export const Stack = createBottomTabNavigator<RootStackPropsList>();

export const getHiddenScreenOptions = (title: string, showTabNavigator?: boolean): BottomTabNavigationOptions => {
    return { 
        headerShown: true,
        headerTitle: title,
        tabBarStyle: {
            display: showTabNavigator ? 'flex' : 'none'
        }, 
        tabBarItemStyle: {
            display: 'none'
        }
    }
}