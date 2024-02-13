import { generalConfig } from "../configs/general.config"
import { generateRandomClasses } from "../utils/randomClassInstances.spec";
import { Account } from "./classes/AccountClass";
import { Loan } from "./classes/LoanClass";
import { Subscription } from "./classes/SubscriptionClass";

let randomClasses = generateRandomClasses();

export const fetchDatabase = () => {
    if (!generalConfig.devBuild) {
        return console.warn("Running production build");
    }
}

export const getAccounts = (): Array<Account> => {
    if (generalConfig.devBuild) {
        return randomClasses.accounts;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

export const getSubscriptions = (): Array<Subscription> => {
    if (generalConfig.devBuild) {
        return randomClasses.subscriptions;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}

export const getLoans = (): Array<Loan> => {
    if (generalConfig.devBuild) {
        return randomClasses.loans;
    }

    console.error('Database: Not fetching db, sending empty array');
    return [];
}