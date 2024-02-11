import { testingConfig } from "../configs/testing.config";
import { AccountType } from "../storage/AccountTypeEnum";
import { Account } from "../storage/classes/AccountClass";
import { Loan } from "../storage/classes/LoanClass";
import { Subscription } from "../storage/classes/SubscriptionClass";
import { AccountIcons, BrandLogos, LoanIcons } from "./LogosAndIcons";
import { PaymentPeriod } from "../storage/PaymentPeriodEnum";
import { generalConfig } from "../configs/general.config";

export const generateRandomClasses = (): { accounts: Array<Account>, subscriptions: Array<Subscription>, loans: Array<Loan>, } => {
    if (!generalConfig.devBuild) {
        console.warn('Tried to generate random classes during production build');
        return {
            accounts: Array<Account>(),
            subscriptions: Array<Subscription>(),
            loans: Array<Loan>(),
        };
    }

    const instanceVariationMax = testingConfig.classInstanceVariation.max;
    const instanceVariationMin = testingConfig.classInstanceVariation.min;

    const accountsToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const subscriptionsToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);
    const loansToGenerate = getRandomInt(instanceVariationMin, instanceVariationMax);

    // (Refractor from using for loops and array.push)
    // Generate x amount of random class
    // Usage: Array.from(object with length property, function)
    let accounts = Array.from({ length: accountsToGenerate }, generateRandomAccount);
    let subscriptions = Array.from({ length: subscriptionsToGenerate }, generateRandomSubscription);
    let loans = Array.from({ length: loansToGenerate }, genereateRandomLoan);

    return {
        accounts: !testingConfig.skipClasses.accounts ? accounts : [],
        subscriptions: !testingConfig.skipClasses.subscriptions ? subscriptions : [],
        loans: !testingConfig.skipClasses.loans ? loans : [],
    }
}

function generateRandomAccount(): Account {
    let name = testingConfig.accountSettings.names[getRandomInt(0, testingConfig.accountSettings.names.length)]
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
    return newAccount;
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
    let subscriptionDateVariation = new Date(
        testingConfig.subscriptionSettings.dateVariationStart.year,
        testingConfig.subscriptionSettings.dateVariationStart.month,
        testingConfig.subscriptionSettings.dateVariationStart.day
    );
    
    // Generate random date between date variation start date and now
    let subscriptionDate = new Date(
        subscriptionDateVariation.getTime() + Math.random() * (new Date().getTime() - subscriptionDateVariation.getTime())
    );

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