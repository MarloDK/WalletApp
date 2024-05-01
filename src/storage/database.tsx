import { generalConfig } from "../configs/general.config";
import { generateRandomClasses } from "../utils/randomClassInstances.spec";
import { Account } from "./classes/AccountClass";
import { Expense } from "./classes/ExpenseClass";
import { Loan } from "./classes/LoanClass";
import { SavingsGoal } from "./classes/SavingsGoalClass";
import { Subscription } from "./classes/SubscriptionClass";

// Generate random classes
let randomClasses = generateRandomClasses();

// Stub for fetching database data
export const fetchDatabase = () => {
    if (!generalConfig.devBuild) {
        return console.warn("Running production build");
    }
}

// Returns all accounts in database
export const getAccounts = (): Array<Account> => {
    if (generalConfig.devBuild) {
        return randomClasses.accounts;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

// Adds account to database
export const addAccount = (account: Account) => {
    randomClasses.accounts.push(account);
}

// Returns all savings goals
export const getSavingsGoals = (): Array<SavingsGoal> => {
    if (generalConfig.devBuild) {
        return randomClasses.savingsGoals;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

// Add savings goal to database
export const addSavingsGoal = (savingsGoal: SavingsGoal) => {
    randomClasses.savingsGoals.push(savingsGoal);
}

// Returns all subscriptions
export const getSubscriptions = (): Array<Subscription> => {
    if (generalConfig.devBuild) {
        return randomClasses.subscriptions;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

// Adds subscriptions to database
export const addSubscription = (subscription: Subscription) => {
    randomClasses.subscriptions.push(subscription);
}

// Returns all loans
export const getLoans = (): Array<Loan> => {
    if (generalConfig.devBuild) {
        return randomClasses.loans;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

// Returns all expenses
export const getExpenses = (): Array<Expense> => {
    if (generalConfig.devBuild) {
        return randomClasses.expenses;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

export const addExpense = (expense: Expense) => {
    randomClasses.expenses.push(expense);
}