import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import { RootStackPropsList } from "../../storage/StackParams";
import { stylingConfig } from "../../configs/styling.config";
import { useEffect, useState } from "react";
import { AccountListItem } from "../../components/new/AccountCardComponents";
import { Expense } from "../../storage/classes/ExpenseClass";
import { getExpenses } from "../../storage/database";
import { BudgetListItem } from "../../components/new/BudgetListItem";
import { Header, Header2, Header4, Paragraph } from "../../components/CustomTextComponents";
import { PieChart } from "react-native-gifted-charts";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { InstanceCreator } from "../../components/new/InstanceCreator";
import { InputField } from "../../components/InputFieldComponents";
import { CreateNewButton } from "../../components/new/CreateNewButton";

type BudgetScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Budget'>;
}

export const BudgetScreen = (props: BudgetScreenProps) => {
    const [expenses, setExpenses] = useState(Array<Expense>);
    const [expensesInTotal, setExpensesInTotal] = useState(0);
    const [budgetLeft, setBudgetLeft] = useState(0);

    const [rerenderKey, setRerenderKey] = useState(0);

    const [chartData, setChartData] = useState(Array<any>);


    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAllocated, setNewExpenseAllocated] = useState(0);
    const [newExpenseSpent, setNewExpenseSpent] = useState(0);

    const [isNewExpenseModalVisible, setIsNewExpenseModalVisible] = useState(false);
    const [isEditExpenseModalVisible, setIsEditExpenseModalVisible] = useState(false);




    const fetchItems = async () => {
        console.log("Fetching Expenses");

        const newExpenses = getExpenses();

        if (newExpenses != expenses) {
            setExpenses(newExpenses);
        }

        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
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
            fetchItems();
        });

        // Return constants to avoid memory leak
        return onFocus;
    });

    useEffect(() => {
        calculateExpensesInTotal();
        updateChartData();
    }, [expenses]);

    useEffect(() => {
        calculateBudgetLeft();
    }, [expensesInTotal]);

    const renderItem = (item: any) => {
        return <BudgetListItem navigation={props.navigation} item={item} />
    }

    const updateChartData = () => {
        let newChartData: Array<any> = [];

        expenses.forEach(expense => {
            newChartData.push({
                value: expense.currentlySpent,
                color: stylingConfig.colors.primary,
            });
        });

        setChartData(newChartData);
    }

    const onNewExpenseModalOpen = () => {
        setIsNewExpenseModalVisible(true);
    }

    const onNewExpenseModalClose = () => {
        setIsNewExpenseModalVisible(false);
    }

    const onNewExpenseModalSubmit = () => {
        setIsNewExpenseModalVisible(false);

        console.log("Create new expense instnace");
    }

    return (
        <View style={styles.appWrapper}>
            <InstanceCreator isVisible={isNewExpenseModalVisible} onClose={onNewExpenseModalClose} onSubmit={onNewExpenseModalSubmit} title={"New Expense"} submitText={"Create Expense"}>
                <InputField 
                    placeholder="Expense name" 
                    name="Name" 
                    maxLength={30}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setNewExpenseName(text)}
                    value={newExpenseName}
                />
                <InputField 
                    placeholder="0" 
                    name="Amount Allocated"
                    keyboardType="number-pad" 
                    suffix="USD"
                    onValueChange={(text) => setNewExpenseAllocated(text === '' ? 0 : parseInt(text))}
                    value={newExpenseAllocated.toString()}
                />
                <InputField 
                    placeholder="0" 
                    name="Currently Spent"
                    keyboardType="number-pad"
                    suffix="USD"
                    onValueChange={(text) => setNewExpenseSpent(text === '' ? 0 : parseInt(text))}
                    value={newExpenseSpent.toString()}
                />
            </InstanceCreator>

            <View style={styles.headerExtension} />
            <View style={styles.container}>
                <View style={styles.budgetOverviewContainer}>
                    <PieChart
                        data={chartData} 
                        radius={100}
                        innerRadius={80}
                        donut
                        strokeColor="white"
                        strokeWidth={5}
                        centerLabelComponent={() => {
                            return (
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <Paragraph>Budget left</Paragraph>
                                    <Header2>${Math.round(budgetLeft)}</Header2>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={styles.expensesOverview}>
                    <Header2>Expenses</Header2>
                    <FlatList 
                        key={rerenderKey}
                        data={expenses}
                        numColumns={1}
                        renderItem={({item}) => renderItem(item)}
                        keyExtractor={(item, index) => `budget-${index}`}
                    />
                </View>
            </View>

            <CreateNewButton onPress={onNewExpenseModalOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: stylingConfig.colors.background,
    },
    container: {
        marginHorizontal: '5%',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: 380,
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 30,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    budgetOverviewContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',

        marginTop: 30,
        marginBottom: 30,
    },
    expensesOverview: {

    },
});