import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Paragraph, Subheader } from "../../components/CustomTextComponents"
import { InputField } from "../../components/InputFieldComponents"
import { AccountListItem } from "../../components/new/AccountCardComponents"
import { CreateNewButton } from "../../components/new/CreateNewButton"
import { InstanceCreator } from "../../components/new/InstanceCreator"
import { stylingConfig } from "../../configs/styling.config"
import { AccountType } from "../../storage/AccountTypeEnum"
import { RootStackPropsList } from "../../storage/StackParams"
import { Account } from "../../storage/classes/AccountClass"
import { addAccount, getAccounts } from "../../storage/database"
import { AccountIcons } from "../../utils/LogosAndIcons"
import { formatNumber } from "../../utils/NumberFormatter"

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



    const [isNewAccountModalVisible, setIsNewAccountModalVisible] = useState(false);
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountIcon, setNewAccountIcon] = useState(AccountIcons.Account);
    const [newAccountBankId, setNewAccountBankId] = useState(0);
    const [newAccountId, setNewAccountId] = useState(0);
    const [newAccountBalance, setNewAccountBalance] = useState(0);
    const [newAccountAccountType, setNewAccountType] = useState(AccountType.CREDIT);

    const onNewAccountModalOpen = () => {
        console.log("OPen acc");
        setIsNewAccountModalVisible(true);
    }

    const onNewAccountModalClose = () => {
        setIsNewAccountModalVisible(false);
    }

    const onNewAccountModalSubmit = () => {
        setIsNewAccountModalVisible(false);

        console.log("Create new account instnace");

        let newAccount = new Account(
            newAccountName,
            newAccountAccountType,
            newAccountBankId,
            newAccountId,
            newAccountBalance,
            newAccountIcon,
        )

        addAccount(newAccount);
        resetModalInputs();
    }

    const resetModalInputs = () => {
        setNewAccountName('');
        setNewAccountIcon(AccountIcons.Account());
        setNewAccountBankId(0);
        setNewAccountId(0);
        setNewAccountBalance(0);
        setNewAccountType(AccountType.CREDIT);

        setRerenderKey(oldKey => oldKey + 1);
    }

    return (
        <View style={styles.appWrapper}>
            <InstanceCreator 
                title={"New Account"} 
                submitText={"Create Account"}
                isVisible={isNewAccountModalVisible} 
                onClose={onNewAccountModalClose} 
                onSubmit={onNewAccountModalSubmit} 
            >
                <InputField 
                    placeholder="Account name" 
                    name="Name" 
                    maxLength={50}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setNewAccountName(text)}
                    value={newAccountName}
                />

                <View style={{ flexDirection: 'row', columnGap: 20 }}>
                    <InputField 
                        placeholder="1234" 
                        name="Bank Id" 
                        maxLength={4}
                        keyboardType="ascii-capable"
                        onValueChange={(text) => setNewAccountBankId(text === '' ? 0 : parseInt(text))}
                        value={newAccountBankId === 0 ? '' : newAccountBankId.toString()}
                        flex={1}
                    />
                    <InputField 
                        placeholder="1234567890" 
                        name="Account Id" 
                        maxLength={10}
                        keyboardType="ascii-capable"
                        onValueChange={(text) => setNewAccountId(text === '' ? 0 : parseInt(text))}
                        value={newAccountId === 0 ? '' : newAccountId.toString()}
                        flex={2}
                    />
                </View>
                <InputField 
                    placeholder="0" 
                    name="Balance" 
                    maxLength={50}
                    keyboardType="number-pad"
                    suffix="USD"
                    onValueChange={(text) => setNewAccountBalance(text === '' ? 0 : parseInt(text))}
                    value={newAccountBalance === 0 ? '' : newAccountBalance.toString()}
                />
            </InstanceCreator>



            <View style={styles.headerExtension}>
                <Paragraph style={{ color: stylingConfig.colors.text.textLight }}>Total balance</Paragraph>
                <Subheader>$ {formatNumber(totalBalance)}</Subheader>
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

            <CreateNewButton onPress={onNewAccountModalOpen} />
        </View>
    )
}
 //             <CreateNewButton onPress={props.navigation.navigate('CreateAccount', { updateList: fetchItems })} />

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