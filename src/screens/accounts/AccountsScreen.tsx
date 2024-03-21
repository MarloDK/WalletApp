import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { Header4, Paragraph, Subheader } from "../../components/CustomTextComponents"
import { LargeSlimCard } from "../../components/new/ScrollCardComponents"
import { stylingConfig } from "../../configs/styling.config"
import { getAccounts, getSavingsGoals } from "../../storage/database"
import { LineChart } from "react-native-gifted-charts"
import { NewSavingsGoalButton, SavingsGoalCard } from "../../components/new/SavingsGoalCardComponent"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { RootStackPropsList } from "../../storage/StackParams"
import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Account } from "../../storage/classes/AccountClass"
import { AccountListItem } from "../../components/new/AccountCardComponents"
import { FontAwesome6, Ionicons } from "@expo/vector-icons"

type AccountsScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Savings'>;
}

export const AccountsScreen = (props: AccountsScreenProps) => {
    const [accounts, setAccounts] = useState(Array<Account>);
    const [totalBalance, setTotalBalance] = useState(0);

    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchItems = async () => {
        console.log("Fetching Accounts");

        const newSavingsGoals = getAccounts();
        setAccounts(newSavingsGoals);

        calculateTotalBalance();
        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
    }

    const calculateTotalBalance = () => {
        let newTotalBalance: number = 0;

        accounts.forEach(account => {
            newTotalBalance += account.getBalance();
        });

        setTotalBalance(newTotalBalance);
    }

    useFocusEffect(
        useCallback(() => {
            fetchItems();

            return () => {}
        }, [])
    )

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
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        backgroundColor: stylingConfig.colors.secondary,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        top: '90%',
                        left: '90%',
                        shadowColor: stylingConfig.colors.shadow,
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => props.navigation.navigate('CreateAccount', { updateList: fetchItems })}
                >
                    <FontAwesome6 name="add" size={25} color="white" />
                </TouchableOpacity>
            </View>
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