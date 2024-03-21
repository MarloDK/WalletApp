import { StackNavigationProp } from "@react-navigation/stack";
import { Account } from "./classes/AccountClass";
import { SavingsGoal } from "./classes/SavingsGoalClass";
import { Subscription } from "./classes/SubscriptionClass";

export type RootStackPropsList = {
    Home: undefined,
    
    Dashboard: undefined,
    
    Savings: undefined,
    CreateSavingsGoal: {
        savingsGoal: SavingsGoal
        updateList: Function
    },
    ViewSavingsGoal: {
        savingsGoal: SavingsGoal
        previousScreenRef?: string 
    },
    EditSavingsGoal: {
        savingsGoal: SavingsGoal
    },



    Accounts: undefined,
    CreateAccount: {
        updateList: Function,
    },
    ViewAccount: {
        account: Account,
    },
    EditAccount: {
        account: Account,
    },

    CreateSubscription: { account: Account },
    EditSubscription: { subscription: Subscription },

    Budget: undefined,
    CreateBudgetExpense: {

    },
    ViewBudgetExpense: {

    },
    EditBudgetExpense: {

    },



    Payments: undefined,
    CreatePayment: {

    },
    ViewPayment: {

    },
    EditPayment: {

    },
}