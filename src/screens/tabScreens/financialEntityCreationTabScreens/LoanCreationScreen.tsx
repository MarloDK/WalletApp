import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { AccountIcons } from "../../../utils/LogosAndIcons";
import { InputField } from "../../../components/InputFieldComponents";

export const LoanCreationScreen = () => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState(AccountIcons.Account());
    const [creditorName, setCreditorName] = useState('');
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [paidOff, setPaidOff] = useState(0);

    return (
        <View style={styles.container}>
            <InputField
                name={'Navn'}
                placeholder={'Eks. "Billån"'}
                onValueChange={(text: string) => setName(text)}
            />
            <InputField
                name={'Kreditor'}
                placeholder={'Eks. "Danske Bank"'}
                onValueChange={(text: string) => setCreditorName(text)}
            />
            <View style={{flexDirection: 'row', columnGap: 10}}>
                <InputField
                    name={'Beløb'}
                    placeholder={'0'}
                    suffix={'DKK'}
                    flex={2}
                    keyboardType={'number-pad'}
                    onValueChange={(text: string) => setAmount(Number(text))}
                />
                <InputField
                    name={'Rente'}
                    placeholder={'0'}
                    maxLength={3}
                    suffix={'%'}
                    flex={1}
                    keyboardType={'number-pad'}
                    onValueChange={(text: string) => setInterest(Number(text))}
                />
            </View>
            <InputField
                name={'Afbetalt'}
                placeholder={'0'}
                suffix={'DKK'}
                keyboardType={'number-pad'}
                onValueChange={(text: string) => setPaidOff(Number(text))}
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