import { AccountsScreen } from "../screens/accounts/AccountsScreen"
import { CreateAccountScreen } from "../screens/accounts/CreateAccountScreen"
import { EditAccountScreen } from "../screens/accounts/EditAccountScreen"
import { ViewAccountScreen } from "../screens/accounts/ViewAccountScreen"
import { Stack, getHiddenScreenOptions } from "./Stack"

export const AccountsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Accounts'
                component={AccountsScreen}
            />

            <Stack.Screen 
                name='ViewAccount'
                component={ViewAccountScreen}
                options={getHiddenScreenOptions("Account")}
            />
            <Stack.Screen 
                name='EditAccount'
                component={EditAccountScreen}
                options={getHiddenScreenOptions("Edit Account")}
            />
            <Stack.Screen 
                name='CreateAccount'
                component={CreateAccountScreen}
                options={getHiddenScreenOptions("New Account")}
            />
        </Stack.Navigator>
    )
}