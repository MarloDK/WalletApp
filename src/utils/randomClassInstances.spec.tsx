import { testingConfig } from "../configs/testing.config";
import { AccountType } from "../storage/AccountTypeEnum";
import { Account } from "../storage/classes/AccountClass";
import { Loan } from "../storage/classes/LoanClass";
import { Subscription } from "../storage/classes/SubscriptionClass";
import { AccountIcons, BrandLogos, LoanIcons } from "./LogosAndIcons";
import { PaymentPeriod } from "../storage/PaymentPeriodEnum";
import { generalConfig } from "../configs/general.config";
import { Transaction } from "../storage/classes/TransactionClass";
import { SavingsGoal } from "../storage/classes/SavingsGoalClass";
import { Expense } from "../storage/classes/ExpenseClass";

export const generateRandomClasses = (): { accounts: Array<Account>, savingsGoals: Array<SavingsGoal>, subscriptions: Array<Subscription>, loans: Array<Loan>, expenses: Array<Expense> } => {
    if (!generalConfig.devBuild) {
        console.warn('Tried to generate random classes during production build');
        return {
            accounts: Array<Account>(),
            savingsGoals: Array<SavingsGoal>(),
            subscriptions: Array<Subscription>(),
            loans: Array<Loan>(),
            expenses: Array<Expense>(),
        };
    }

    const instanceVariationMax = testingConfig.classInstanceVariation.max;
    const instanceVariationMin = testingConfig.classInstanceVariation.min;

    const accountsToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const savingsGoalsToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const subscriptionsToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const loansToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const expensesToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);

    // (Refractor from using for loops and array.push)
    // Generate x amount of random class
    // Usage: Array.from(object with length property, function)
    let subscriptions = Array.from({ length: subscriptionsToGenerate }, generateRandomSubscription);
    let savingsGoals = Array.from({ length: savingsGoalsToGenerate }, generateRandomSavingsGoal);
    let accounts = Array.from({ length: accountsToGenerate }, (): Account => generateRandomAccount(subscriptions));
    let loans = Array.from({ length: loansToGenerate }, genereateRandomLoan);
    let expenses = Array.from({ length: expensesToGenerate }, generateRandomExpense);

    let subscriptionExpense = new Expense("Subscriptions", 0, 0);

    subscriptions.forEach(subscription => {
        const randomAccount = accounts[getRandomInt(0, accounts.length)];

        if (randomAccount) {
            randomAccount.attachSubscription(subscription);
        }

        subscriptionExpense.allocated += subscription.monthlyPrice;
    });

    expenses.push(subscriptionExpense);

    return {
        accounts: !testingConfig.skipClasses.accounts ? accounts : [],
        savingsGoals: !testingConfig.skipClasses.savingsGoals ? savingsGoals : [],
        subscriptions: !testingConfig.skipClasses.subscriptions ? subscriptions : [],
        loans: !testingConfig.skipClasses.loans ? loans : [],
        expenses: !testingConfig.skipClasses.expenses ? expenses : [],
    }
}

function generateRandomAccount(subscriptions?: Array<Subscription>): Account {
    let name = testingConfig.accountSettings.names[getRandomInt(0, testingConfig.accountSettings.names.length - 1)];
    let accountType = getRandomEnumValue(AccountType);
    if (accountType === undefined)
        accountType = AccountType.DEBIT;

    let bankId = getRandomInt(1000, 9999);
    let accountId = getRandomInt(1000000000, 9999999999);
    let startBalance = getRandomInt(
        testingConfig.accountSettings.startingBalance.min, 
        testingConfig.accountSettings.startingBalance.max
    );

    let icon: JSX.Element | undefined = getRandomIcon(AccountIcons);
    if (icon === undefined)
        icon = AccountIcons.Account();
    

    let newAccount = new Account(
        name,
        accountType,
        bankId,
        accountId,
        startBalance,
        icon,
    )

    if (subscriptions && testingConfig.accountSettings.generateTransactionhistory) {
        generateTransactionHistory(newAccount, 12, subscriptions);
    }

    return newAccount;
}

function generateRandomSavingsGoal(): SavingsGoal {
    let name = testingConfig.savingsGoalSettings.names[getRandomInt(0, testingConfig.savingsGoalSettings.names.length - 1)];
    let targetAmount = getRandomInt(
        testingConfig.savingsGoalSettings.goalTarget.min, 
        testingConfig.savingsGoalSettings.goalTarget.max
    );
    
    let maxSavedAmount = testingConfig.savingsGoalSettings.currentlySaved.max;

    let savedAmount = getRandomInt(
        testingConfig.savingsGoalSettings.currentlySaved.min, 
        maxSavedAmount == -1 ? getRandomInt(0, targetAmount) : maxSavedAmount
    );


    let newSavingsGoal = new SavingsGoal(
        name,
        targetAmount,
        savedAmount
    )

    return newSavingsGoal;
}

function generateRandomSubscription(): Subscription {
    let name = testingConfig.subscriptionSettings.names[getRandomInt(0, testingConfig.subscriptionSettings.names.length)];

    // GET RANDOM ICON
    let icon: Function | undefined = BrandLogos.AppleTV;
    let price = getRandomInt(
        testingConfig.subscriptionSettings.priceVariation.min,
        testingConfig.subscriptionSettings.priceVariation.max
    );
    let subscriptionPeriod = price <= testingConfig.subscriptionSettings.subscriptionPeriodThreshold 
        ? PaymentPeriod.MONTHLY 
        : PaymentPeriod.YEARLY;
    
    // Create date object from date variation start date in config
    let now = new Date();

    let dateBeforeNow = new Date(
        now.getFullYear() - testingConfig.subscriptionSettings.dateVariation.year,
        now.getMonth() - testingConfig.subscriptionSettings.dateVariation.month,
        now.getDate() - testingConfig.subscriptionSettings.dateVariation.day
    );

    let dateAfterNow = new Date(
        now.getFullYear() + testingConfig.subscriptionSettings.dateVariation.year,
        now.getMonth() + testingConfig.subscriptionSettings.dateVariation.month,
        now.getDate() + testingConfig.subscriptionSettings.dateVariation.day
    );

    const startTime = dateBeforeNow.getTime();
    const endTime = dateAfterNow.getTime();
    
    const randomTime = startTime + Math.random() * (endTime - startTime);
    // Generate random date between date variation start date and now
    let subscriptionDate = new Date(randomTime);

    let newSubscription = new Subscription(
        name,
        icon,
        price,
        subscriptionPeriod,
        subscriptionDate
    )
    return newSubscription;
}

function genereateRandomLoan(): Loan {
    let name = testingConfig.loanSettings.names[getRandomInt(0, testingConfig.loanSettings.names.length)];
    let creditor = testingConfig.loanSettings.creditorNames[getRandomInt(0, testingConfig.loanSettings.creditorNames.length)];
    let amount = getRandomInt(
        testingConfig.loanSettings.loanAmountVariation.min,
        testingConfig.loanSettings.loanAmountVariation.max
    );
    let amountPaidOff = getRandomInt(0, amount - 1);
    let interestRate = getRandomInt(
        testingConfig.loanSettings.interestVariation.min,
        testingConfig.loanSettings.interestVariation.max
    );
    
    
    let icon: JSX.Element | undefined = getRandomIcon(LoanIcons);
    if (icon === undefined)
        icon = AccountIcons.Account();

    let newLoan = new Loan(
        name,
        creditor,
        amount,
        amountPaidOff,
        interestRate,
        icon
    )
    return newLoan;
}

function generateRandomExpense(): Expense {
    let name = testingConfig.expenseSettings.names[getRandomInt(0, testingConfig.expenseSettings.names.length)];
    let allocated = getRandomInt(
        testingConfig.expenseSettings.expenseAllocatedVariation.min,
        testingConfig.expenseSettings.expenseAllocatedVariation.max
    );

    let spentPercentage = getRandomInt(
        testingConfig.expenseSettings.expenseSpentPercentage.min,
        testingConfig.expenseSettings.expenseSpentPercentage.max
    );

    let newExpense = new Expense(
        name,
        allocated,
        allocated * (spentPercentage / 100),
    )
    return  newExpense;
}

const generateTransactionHistory = (account: Account, historyLength: number, userSubscriptions: Array<Subscription>) => {
    let accountBalance = account.balance;

    for (let i = 0; i < historyLength; i++) {
        let positiveTransaction: boolean = Math.random() >= .3;

        if (positiveTransaction) {
            let transactionValue = getRandomInt(
                testingConfig.transcationGenerationSettings.randomTransactionValueVariance.min,
                testingConfig.transcationGenerationSettings.randomTransactionValueVariance.max
            )

            let transactionName = testingConfig.transcationGenerationSettings.names[getRandomInt(0, testingConfig.transcationGenerationSettings.names.length - 1)];

            account.addTransaction(new Transaction(
                transactionName,
                new Date().toISOString(),
                accountBalance,
                accountBalance + transactionValue,
                transactionValue
            ));

            accountBalance += transactionValue;
        }

        userSubscriptions.map((subscription, index) => {
            let subscriptionBillingDate  = subscription.billingDate;
            subscriptionBillingDate = new Date(
                subscriptionBillingDate.getFullYear(),
                subscriptionBillingDate.getMonth() + i,
                subscriptionBillingDate.getDay(),
            )

            account.addTransaction(new Transaction(
                subscription.name + " Inc.",
                subscriptionBillingDate.toISOString(),
                accountBalance,
                accountBalance - subscription.price,
                subscription.price,
            ));

            accountBalance -= subscription.price;
        });

    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Har stadig mareridt om den her hver nat
function getRandomEnumValue<T>(anEnum: T): T[keyof T] | undefined {
    // Convert enum to array
    const keys = Object.keys(anEnum as keyof T) as Array<keyof T>;

    if (keys.length === 0) {
        return undefined;
    }

    // Get random index from enum values
    // Math.floor to get whole number,
    // Math.random * Object.keys(enumValues).length to get random index value
    // from enumValues array.
    const randomEnumIndex: number = Math.floor(Math.random() * Object.keys(keys).length);
    
    // Get the key of the random index
    const randomEnumKey: keyof T = keys[randomEnumIndex];

    // Get the enum value from the key
    const randomEnumValue: T[keyof T] = anEnum[randomEnumKey];

    // Return enum value
    return randomEnumValue;
}

// Same as getRandomEnumValue(), except anEnum is now obj and is of type
// Record to parse a type to another. 
//
// Record<key, type>
// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
function getRandomIcon<T>(icons: Record<string, Function>): JSX.Element | undefined {
    const keys = Object.keys(icons);

    if (keys.length === 0) {
        return undefined;
    }
    
    const randomPropIndex: number = Math.floor(Math.random() * Object.keys(keys).length);
    const randomPropKey: string = keys[randomPropIndex];
    const randomPropValue: Function = icons[randomPropKey];
    
    return randomPropValue();
}