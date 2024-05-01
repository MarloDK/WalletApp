import { Account } from "./classes/AccountClass";

export type RootStackPropsList = {
    Home: undefined,
    Dashboard: undefined,
    Savings: undefined,
    Accounts: undefined,
    ViewAccount: {
        account: Account,
    },
    Budget: undefined,
    Saving: undefined;
    Payments: undefined,
}