import { StackNavigationProp } from "@react-navigation/stack";
import { Account } from "./classes/AccountClass";

export type RootStackPropsList = {
    Home: undefined;
    Dashboard: undefined;
    Savings: undefined;
    "Savings Goal": undefined;
    Budget: undefined;
    Account: {
        account: Account
    };
    CreateEntity: { 
        startTab: number 
    };
}