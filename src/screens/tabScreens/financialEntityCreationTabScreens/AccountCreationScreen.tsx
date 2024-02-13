import { StyleSheet, View } from "react-native"
import { useState } from "react";
import { AccountIcons } from "../../../utils/LogosAndIcons";
import { InputField } from "../../../components/InputFieldComponents";

export const AccountCreationScreen = () => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState(AccountIcons.Account());
    const [registrationNumber, setRegistrationNumber] = useState(0);
    const [accountNumber, setAccountNumber] = useState(0);
    const [balance, setBalance] = useState(0);

    return (
        <View style={styles.container}>
            <InputField
                name={'Kontonavn'}
                maxLength={20}
                placeholder={'Eks. "Gebyrfri Ungdom"'}
                onValueChange={(text: string) => setName(text)}
            />
            <View style={{flexDirection: 'row', columnGap: 10}}>
                <InputField
                    name={'Reg. nr.'}
                    maxLength={4}
                    placeholder={'0000'}
                    flex={1}
                    keyboardType={'number-pad'}
                    onValueChange={(text: string) => setRegistrationNumber(Number(text))}
                />
                <InputField
                    name={'Kontonr.'}
                    maxLength={10}
                    placeholder={'0000000000'}
                    flex={3}
                    keyboardType={'number-pad'}
                    onValueChange={(text: string) => setAccountNumber(Number(text))}
                />
            </View>
            <InputField
                name={'Saldo'}
                placeholder={'Eks. "Gebyrfri Ungdom"'}
                keyboardType={'numeric'}
                suffix={'DKK'}
                onValueChange={(text: string) => setBalance(Number(text))}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
    }
});