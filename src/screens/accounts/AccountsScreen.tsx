import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { Paragraph, Subheader } from "../../components/CustomTextComponents"
import { stylingConfig } from "../../configs/styling.config"
import { getAccounts } from "../../storage/database"
import { RootStackPropsList } from "../../storage/StackParams"
import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import { Account } from "../../storage/classes/AccountClass"
import { AccountListItem } from "../../components/new/AccountCardComponents"
import { FontAwesome6 } from "@expo/vector-icons"
import { CreateNewButton } from "../../components/new/CreateNewButton"

type AccountsScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Savings'>;
}

export const AccountsScreen = (props: AccountsScreenProps) => {
    const [accounts, setAccounts] = useState(Array<Account>);
    const [totalBalance, setTotalBalance] = useState(0);

    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchItems = async () => {
        console.log("Fetching Accounts");

        const newAccounts = getAccounts();

        if (newAccounts != accounts) {
            setAccounts(newAccounts);
        }

        calculateTotalBalance();
        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
    }

    const calculateTotalBalance = () => {
        let newTotalBalance: number = 0;

        accounts.forEach(account => {
            newTotalBalance += account.balance;
        });

        setTotalBalance(newTotalBalance);
    }

    useEffect(() => {
        const onFocus = props.navigation.addListener('focus', () => {
            fetchItems();
        });

        // Return constants to avoid memory leak
        return onFocus;
    });

    const renderItem = (item: any) => {
        return <AccountListItem navigation={props.navigation} account={item} />
    }

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <Paragraph style={{ color: stylingConfig.colors.text.textLight }}>Total balance</Paragraph>
                <Subheader>$ {totalBalance}</Subheader>
            </View>
            <View style={styles.container}>
                <FlatList 
                    key={rerenderKey}
                    data={accounts}
                    contentInset={{ top: 30, bottom: 70 }}
                    contentOffset={{ x: 0, y: -30}}
                    numColumns={1}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item, index) => `account-${index}`}
                />
            </View>
            <CreateNewButton onPress={props.navigation.navigate('CreateAccount', { updateList: fetchItems })} />
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
        paddingHorizontal: '5%',
        flexDirection: 'column',
        height: 600,
        width: '100%',
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: '5%',
    }
});