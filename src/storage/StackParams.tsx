import { StackNavigationProp } from "@react-navigation/stack";
import { Account } from "./classes/AccountClass";

export type RootStackPropsList = {
    Home: undefined;
    Account: {
        account: Account
    };
    CreateEntity: { 
        startTab: number 
    };
}