import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Account } from "../storage/classes/AccountClass"
import { RouteProp } from "@react-navigation/native";
import { RootStackPropsList } from "../storage/StackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppText, AppTextSecondary } from "../components/CustomTextComponents";
import { AntDesign } from "@expo/vector-icons";
import { formatNumber } from "../utils/NumberFormatter";
import { GradientLineChart } from "../components/GradientChartComponent";
import { lineDataItem } from "react-native-gifted-charts";
import { Transaction } from "../storage/classes/TransactionClass";

type CreateEntityRouteProp = RouteProp<RootStackPropsList, 'Account'>;

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'Account'>;
    route: CreateEntityRouteProp;
}



export const AccountScreen = ({navigation, route}: Props): JSX.Element => {
    const { account } = route.params;
    const months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]



    const getGraphData = (randomData: boolean = false): lineDataItem[] => {
        let data: lineDataItem[] = [
            {value: 3, label: months[0]},
            {value: 4},
            {value: 2, label: months[2]},
            {value: 3},
            {value: 5, label: months[4]},
            {value: 4},
            {value: 5, label: months[6]},
            {value: 3},
            {value: 2, label: months[8]},
            {value: 4},
            {value: 5, label: months[10]},
            {value: 5},
        ]

        let transactionHistory: Transaction[] = account.getTransactionHistory();
        if (Object.keys(transactionHistory).length > 0 || !randomData) {
            data = [];
            

            let latestTransactions = transactionHistory.slice(-12);
            latestTransactions.forEach((transaction, index) => {
                let labelText = months[index]
                if (index % 2 !== 0) {
                    labelText = ''
                }
                console.log(transaction.previousBalance);
                data.push({value: transaction.transactionValue, label: labelText, showXAxisIndex: labelText === '' ? false : true});
            })
        }
        return data;
    }

    const getYearlyBalanceChangePercent = (): number => {
        let transactionHistory = account.getTransactionHistory();
        let startingBalance = transactionHistory[0].previousBalance;
        let endBalance = transactionHistory[transactionHistory.length - 1].previousBalance - transactionHistory[transactionHistory.length - 1].transactionValue;

        let difference = ((endBalance - startingBalance) / startingBalance) * 100;
        return difference;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AppText style={styles.screenHeader}>{account.getName()}</AppText>
                <AppTextSecondary style={styles.screenSubHeader}>{account.getFullId()}</AppTextSecondary>
            </View>
            <View style={styles.accountGraphContainer}>
                <AppText style={styles.accountGraphHeader}>Balance (DKK)</AppText>
                <AppText style={styles.accountGraphHeaderValue}>{formatNumber(account.getBalance())}</AppText>
                <AppText style={styles.accountGraphValueChange}>{getYearlyBalanceChangePercent()}</AppText>
                <View style={styles.accountGraphWrapper}>
                    <GradientLineChart
                        height={80}
                        width={300}
                        chartData={getGraphData()}
                        chartData2={getGraphData(true)}
                    />
                </View>
            </View>
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButtonWrapper}>
                    <AppText>Se transaktioner</AppText>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>
            </View>
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
        rowGap: 50,
    },
    headerContainer: {
        
    },
    screenHeader: {
        fontSize: 40,
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
    },
    screenSubHeader: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
    },
    accountGraphContainer: {
        padding: 10,
        backgroundColor: '#202B3F',
        borderRadius: 10,
        alignSelf: 'stretch',
        marginHorizontal: 35,
    },
    accountGraphHeader: {
        fontSize: 10,
    },
    accountGraphHeaderValue: {
        fontSize: 16,
    },
    accountGraphValueChange: {
        fontSize: 10,
    },
    accountGraphWrapper: {
        alignSelf: 'stretch',
        paddingTop: 20,
        paddingBottom: 10,
    },
    actionButtonsContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 35,
    },
    actionButtonWrapper: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#202B3F',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    actionButtonDivider: {
        height: '80%',
        width: 1,
        backgroundColor: '#181824',
    },
})