import { StyleSheet, View } from "react-native"
import { CustomTabNavigator } from "../components/CustomTabNavigator"
import { OverviewWithGraph } from "../components/OverviewWithGraphComponent"
import { getAccounts, getSubscriptions } from "../storage/database"

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

export const HomeScreen = () => {
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

        console.log("Total monthly fees: " + total)
        return total;
    }


    return (
        <View style={styles.container}>
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
            <CustomTabNavigator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    overviewSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 20,
    }
});