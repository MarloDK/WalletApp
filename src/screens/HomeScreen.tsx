import { SafeAreaView, StyleSheet, View } from "react-native"
import { OverviewWithGraph } from "../components/OverviewWithGraphComponent"
import { getAccounts, getSubscriptions } from "../storage/database"
import { NewCustomTabNavigator } from "../components/CustomTabNavigatorComponent"
import { AccountsOverviewTabScreen, SubscriptionsOverviewTabScreen, LoansOverviewTabScreen } from "./tabScreens/HomeOverviewTabScreens"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackPropsList } from "../storage/StackParams"

const testData = [
    {value: 0}, // 1
    {value: 3}, // 2
    {value: 8}, // 3
    {value: 6}, // 4
    {value: 9}, // 5
    {value: 4}, // 6
    {value: 5}, // 7
    {value: 2}, // 8
    {value: 4}, // 9
    {value: 5}, // 10
    {value: 8}, // 11
    {value: 4}, // 12
]

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'Home'>;
}

export const HomeScreen = (props: Props) => {
    const getTotalBalance = () => {
        const allAccounts = getAccounts();

        let total = 0;
        allAccounts.forEach(account => {
            total += account.getBalance();
        });

        return total;
    }

    const getTotalMonthlyFees = () => {
        const allSubscriptions = getSubscriptions();

        let total = 0;
        allSubscriptions.forEach(subscription => {
            total += subscription.getMonthlyPrice();
        });

        return total;
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overviewSectionContainer}>
                <OverviewWithGraph
                    title="Total balance"
                    value={getTotalBalance()}
                    // If the total balance is more than 7 digits (> 9.99 million),
                    // hide fractions to stay inside text box horizontal size
                    maxFractions={getTotalBalance().toString().length > 7 ? 0 : 2}
                    chartData={testData}
                />

                <OverviewWithGraph
                    title="Månedlige omkst."
                    value={getTotalMonthlyFees()}
                    chartData={testData}
                />
            </View>
            <NewCustomTabNavigator
                tabButtons={['Konti', 'Abonnementer', 'Lån']}
                tabScreens={[
                    <AccountsOverviewTabScreen
                        navigation={props.navigation}
                    />,
                    <SubscriptionsOverviewTabScreen 
                        navigation={props.navigation}
                    />,
                    <LoansOverviewTabScreen 
                        navigation={props.navigation}
                    />
                ]}
                tabButtonsContainerStyle={styles.tabButtonsContainer}
                activeTabButtonTextStyle={styles.activeTabButtonText}
                inactiveTabButtonTextStyle={styles.inactiveTabButtonText}
            />
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181824',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    overviewSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 30,
    },
    tabButtonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginBottom: 10,
    },
    activeTabButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium'
    },
    inactiveTabButtonText: {
        fontSize: 12
    }
});