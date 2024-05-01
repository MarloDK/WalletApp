import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { CustomLink, Header2, Header3, Paragraph } from "../components/CustomTextComponents";
import { SavingsGoalCardSmall } from "../components/new/SavingsGoalCardComponent";
import { LargeSlimCard, VerticalPaymentListItem } from "../components/new/ScrollCardComponents";
import { stylingConfig } from "../configs/styling.config";
import { RootStackPropsList } from "../storage/StackParams";
import { Account } from "../storage/classes/AccountClass";
import { Expense } from "../storage/classes/ExpenseClass";
import { SavingsGoal } from "../storage/classes/SavingsGoalClass";
import { Subscription } from "../storage/classes/SubscriptionClass";
import { getAccounts, getExpenses, getSavingsGoals, getSubscriptions } from "../storage/database";
import { formatNumber } from "../utils/NumberFormatter";

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'Home'>;
}

export const DashboardScreen = (props: Props) => {
    const [accounts, setAccounts] = useState(Array<Account>());

    const [savingsGoals, setSavingsGoals] = useState(Array<SavingsGoal>());
    
    const [expenses, setExpenses] = useState(Array<Expense>);
    const [expensesInTotal, setExpensesInTotal] = useState(0);
    const [budgetLeft, setBudgetLeft] = useState(0);

    const [upcomingPayments, setUpcomingPayments] = useState(Array<Subscription>);

    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchData = () => {
        const newAccounts = getAccounts();
        const newSavingsGoals = getSavingsGoals();

        const newExpenses = getExpenses();
        const newPayments = getSubscriptions();

        setAccounts(newAccounts);
        setSavingsGoals(newSavingsGoals);
        setExpenses(newExpenses);

        setUpcomingPayments(getUpcomingPayments(newPayments));

        calculateExpensesInTotal();
        calculateBudgetLeft();
        
        setRerenderKey(oldKey => oldKey + 1);
    }

    const getUpcomingPayments = (payments: Array<Subscription>): Array<Subscription> => {
        const currentDate = new Date();
        
        let paymentsSorted = payments.sort((a, b) => {

            const monthDiffA = (a.billingDate.getMonth() + 12 - currentDate.getMonth()) % 12;
            const monthDiffB = (b.billingDate.getMonth() + 12 - currentDate.getMonth()) % 12;
    
            if (monthDiffA !== monthDiffB) {
                return monthDiffA - monthDiffB;
            } else {
                return a.billingDate.getDate() - b.billingDate.getDate();
            }
        });

        let comingPayments: Array<Subscription> = [];
        paymentsSorted.forEach(payment => {
            console.log(payment.billingDate + " < " + currentDate);
            
            if (payment.billingDate < currentDate) {
                return;
            }

            comingPayments.push(payment);
        })

        console.log(comingPayments);
        return comingPayments.slice(0, 3);
    }

    const getUpcomingPaymentsListItems = (): Array<JSX.Element> => {
        let listItems: Array<JSX.Element> = [];

        console.log("Upcoming payments: " + upcomingPayments);

        upcomingPayments.forEach(payment => {
            listItems.push(
                <VerticalPaymentListItem payment={payment}/>
            )
        });

        return listItems;
    }

    const calculateExpensesInTotal = () => {
        let totalAllocated = expenses.reduce((acc, expense) => acc + expense.allocated, 0);

        setExpensesInTotal(totalAllocated);
    }

    const calculateBudgetLeft = () => {
        let newBudgetLeft = expenses.reduce((acc, expense) => acc - expense.currentlySpent, expensesInTotal);
        
        setBudgetLeft(newBudgetLeft);
    }

    useEffect(() => {
        const onFocus = props.navigation.addListener('focus', () => {
            fetchData();
        });

        // Return constants to avoid memory leak
        return onFocus;
    });

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <View style={styles.headerInfoContainer}>
                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Budget total</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>${formatNumber(Math.round(expensesInTotal))}</Header3>
                    </View>
                    <View style={styles.headerInfoDivider}></View>

                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Spent this month</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>${formatNumber(Math.round(expensesInTotal - budgetLeft))}</Header3>
                    </View>
                    <View style={styles.headerInfoDivider}></View>

                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Expenses left</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>${formatNumber(Math.round(budgetLeft))}</Header3>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Header2>Accounts</Header2>
                        <CustomLink to={"/Accounts"}>See all</CustomLink>
                    </View>
                    <FlatList 
                        key={rerenderKey}
                        horizontal
                        data={accounts}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        contentContainerStyle={styles.horizontalScrollWrapper}
                        renderItem={({ item }) => <LargeSlimCard account={item} navigation={props.navigation}/>}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Header2>Goals</Header2>
                        <CustomLink to={"/Saving"}>See all</CustomLink>
                    </View>
                    <FlatList 
                        key={rerenderKey}
                        horizontal
                        data={savingsGoals}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        contentContainerStyle={styles.horizontalScrollWrapper}
                        renderItem={({ item }) => <SavingsGoalCardSmall navigation={props.navigation} savingGoal={item} previousScreenRef="Dashboard" />}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Header2>Upcoming Expenses</Header2>
                    <ScrollView 
                        style={styles.verticalScrollWrapper}
                        horizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                    >
                        {getUpcomingPaymentsListItems()}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: stylingConfig.colors.background
    },
    container: {
        marginHorizontal: '5%',
        paddingTop: 30,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 30,
    },
    headerInfoContainer: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingVertical: 12,
        backgroundColor: stylingConfig.colors.background,
        borderRadius: 10,
        shadowColor: stylingConfig.colors.shadow,
        shadowOffset: { width: 0, height: 4},
        shadowRadius: 4,
        shadowOpacity: 100,
    },
    headerInfoDivider: {
        width: 1,
        height: '60%',
        backgroundColor: stylingConfig.colors.divider,
        marginHorizontal: 15,
    },
    headerInfoElement: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 100,
    },
    headerInfoHeader: {
        fontSize: 10,
        fontFamily: 'Inter_400Regular',
        color: '#757575',
        marginBottom: 5,
    },
    headerInfoValue: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        color: '#212121',
    },
    sectionContainer: {
        width: '100%',
        alignSelf: 'stretch',
        paddingTop: 30,
    },
    horizontalScrollWrapper: {
        paddingLeft: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    verticalScrollWrapper: {
        paddingVertical: 10,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    accountCardContainer: {
        height: 60,
        width: 250,
        marginRight: 10,
        backgroundColor: stylingConfig.colors.surface,
        borderRadius: 10,
    }
});