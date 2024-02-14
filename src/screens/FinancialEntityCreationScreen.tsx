import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { NewCustomTabNavigator } from "../components/CustomTabNavigatorComponent";
import { AppText } from "../components/CustomTextComponents";
import { AccountCreationScreen } from "./tabScreens/financialEntityCreationTabScreens/AccountCreationScreen";
import { SubscriptionCreationScreen } from "./tabScreens/financialEntityCreationTabScreens/SubscriptionCreationScreen";
import { LoanCreationScreen } from "./tabScreens/financialEntityCreationTabScreens/LoanCreationScreen";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../storage/StackParams";
import { RouteProp } from "@react-navigation/native";

type CreateEntityRouteProp = RouteProp<RootStackPropsList, 'CreateEntity'>;

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'CreateEntity'>;
    route: CreateEntityRouteProp;
}

export const FinancialEntityCreationScreen = ({navigation, route}: Props): JSX.Element => {
    const { startTab } = route.params;

    const [activeTabName, setActiveTabName] = useState('Konto');
    
    const onTabChange = (tabIndex: number, tabName: string) => {
        setActiveTabName(tabName);
        console.log(`Recieved tabIndex ${tabIndex} (${tabName})`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <NewCustomTabNavigator 
                tabButtons={['Konto', 'Abonnement', 'Lån']}
                tabScreens={[
                    <AccountCreationScreen key="account"/>,
                    <SubscriptionCreationScreen key="subscription"/>,
                    <LoanCreationScreen key="loan"/>,
                ]}
                tabStart={startTab ? startTab : 0}
                onTabChange={onTabChange}
                style={{marginTop: 20}}
                tabButtonsContainerStyle={tabNavigatorStyle.buttonsContainer}
                activeTabButtonStyle={tabNavigatorStyle.activeTabButton}
                activeTabButtonTextStyle={tabNavigatorStyle.activeTabButtonText}
                inactiveTabButtonStyle={tabNavigatorStyle.inactiveTabButton}
                inactiveTabButtonTextStyle={tabNavigatorStyle.inactiveTabButtonText}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.createEntityButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <AppText style={styles.defaultButtonText}>Opret {activeTabName}</AppText>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <AppText style={[styles.defaultButtonText, {color: '#202B3F'}]}>Tilbage</AppText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181824',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    buttonsContainer: {
        alignItems: 'center',
        gap: 20,
        marginBottom: 80,
    },
    createEntityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 225,
        height: 45,
        backgroundColor: '#202B3F',
        borderRadius: 50,
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 45,
        borderColor: '#202B3F',
        borderWidth: 2,
        borderRadius: 50,
    },
    defaultButtonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
});



const tabNavigatorStyle = StyleSheet.create({
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 50,
    },
    activeTabButton: {
        backgroundColor: '#202B3F',
        borderRadius: 100,
        paddingHorizontal: 0,
        paddingVertical: 0,
        minWidth: 100,
        maxWidth: 150,
        minHeight: 49,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOpacity: .25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    activeTabButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
    inactiveTabButton: {
        borderColor: '#202B3F',
        borderWidth: 2,
        borderRadius: 100,
        paddingHorizontal: 0,
        paddingVertical: 0,
        minWidth: 100,
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveTabButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        color: '#202B3F',
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
});