import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Paragraph } from "../../components/CustomTextComponents"
import { RootStackPropsList } from "../../storage/StackParams"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { stylingConfig } from "../../configs/styling.config"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { addAccount, addSavingsGoal } from "../../storage/database"
import { InputField } from "../../components/InputFieldComponents"
import { Account } from "../../storage/classes/AccountClass"
import { AccountIcons } from "../../utils/LogosAndIcons"
import { AccountType } from "../../storage/AccountTypeEnum"

type CreateAccountProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'CreateAccount'>,
}

export const CreateAccountScreen = (props: CreateAccountProps) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState(AccountIcons.Account);
    const [bankId, setBankId] = useState(0);
    const [accountId, setAccountId] = useState(0);
    const [balance, setBalance] = useState(0);
    const [accountType, setAccountType] = useState(AccountType.CREDIT);

    const CreateAccount = () => {
        console.log("Create new account");

        let newAccount = new Account(
            name,
            accountType,
            bankId,
            accountId,
            balance,
            icon
        );

        addAccount(newAccount);
        resetInputs();

        props.navigation.navigate('Accounts');
    }

    const resetInputs = () => {
        setName('');
        setIcon(AccountIcons.Account);
        setBankId(0);
        setAccountId(0);
        setBalance(0);
        setAccountType(AccountType.CREDIT);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputFieldsContainer}>
                <InputField 
                    placeholder="Account name" 
                    name="Name" 
                    maxLength={50}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setName(text)}
                    value={name}
                />

                <View style={{ flexDirection: 'row', columnGap: 20 }}>
                    <InputField 
                        placeholder="1234" 
                        name="Bank Id" 
                        maxLength={4}
                        keyboardType="ascii-capable"
                        onValueChange={(text) => setBankId(text === '' ? 0 : parseInt(text))}
                        value={bankId === 0 ? '' : bankId.toString()}
                        flex={1}
                    />
                    <InputField 
                        placeholder="1234567890" 
                        name="Account Id" 
                        maxLength={10}
                        keyboardType="ascii-capable"
                        onValueChange={(text) => setAccountId(text === '' ? 0 : parseInt(text))}
                        value={accountId === 0 ? '' : accountId.toString()}
                        flex={2}
                    />
                </View>
                <InputField 
                    placeholder="0" 
                    name="Balance" 
                    maxLength={50}
                    keyboardType="number-pad"
                    suffix="USD"
                    onValueChange={(text) => setBalance(text === '' ? 0 : parseInt(text))}
                    value={balance === 0 ? '' : balance.toString()}
                />
            </View>
            <View style={{ flexDirection: 'row', gap: 50, marginTop: 150 }}>
                <TouchableOpacity 
                    style={styles.navigationButtons}
                    onPress={() => {resetInputs(); props.navigation.navigate('Accounts')}}
                >
                    <Paragraph style={styles.navigationButtonsText}>Cancel</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.navigationButtons, 
                            { 
                                backgroundColor: stylingConfig.colors.secondaryVar 
                            }
                        ]}
                    // @ts-ignore
                    onPress={CreateAccount}
                >
                    <Paragraph style={[styles.navigationButtonsText, { color: stylingConfig.colors.text.textLight }]}>Create</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: stylingConfig.colors.background,
        paddingHorizontal: '5%',
        paddingTop: 50,
    },
    inputFieldsContainer: {
        width: '100%',
        rowGap: 20,
    },
    navigationButtons: {
        backgroundColor: stylingConfig.colors.background,
        shadowColor: stylingConfig.colors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowRadius: 4,
        paddingVertical: 20,
        width: 120,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationButtonsText: {
        fontSize: stylingConfig.fontSizes.h4,
        color: stylingConfig.colors.text.textPrimary,
        fontFamily: stylingConfig.fontWeight.medium
    }
});