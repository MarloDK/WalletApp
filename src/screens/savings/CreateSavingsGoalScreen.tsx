import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Paragraph } from "../../components/CustomTextComponents"
import { RootStackPropsList } from "../../storage/StackParams"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { stylingConfig } from "../../configs/styling.config"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { addSavingsGoal } from "../../storage/database"
import { InputField } from "../../components/InputFieldComponents"

type CreateSavingsGoalProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'CreateSavingsGoal'>,
}

export const CreateSavingsGoalScreen = (props: CreateSavingsGoalProps) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState(0);
    const [savedAmount, setSavedAmount] = useState(0);

    const CreateSavingsGoal = () => {
        console.log("Create new savings goal");

        let newSavingsGoal = new SavingsGoal(
            name,
            targetAmount,
            savedAmount
        );

        addSavingsGoal(newSavingsGoal);

        resetInputs();

        props.navigation.navigate('Savings');
    }

    const resetInputs = () => {
        setName('');
        setTargetAmount(0);
        setSavedAmount(0);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputFieldsContainer}>
                <InputField 
                    placeholder="Savings goal name" 
                    name="Name" 
                    maxLength={30}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setName(text)}
                    value={name}
                />
                <InputField 
                    placeholder="0" 
                    name="Target"
                    keyboardType="number-pad" 
                    suffix="$"
                    onValueChange={(text) => setTargetAmount(text === '' ? 0 : parseInt(text))}
                    value={targetAmount.toString()}
                />
                <InputField 
                    placeholder="0" 
                    name="Currently saved"
                    keyboardType="number-pad"
                    suffix="$"
                    onValueChange={(text) => setSavedAmount(text === '' ? 0 : parseInt(text))}
                    value={savedAmount.toString()}
                />
            </View>
            <View style={{ flexDirection: 'row', gap: 50, marginTop: 150 }}>
                <TouchableOpacity 
                    style={styles.navigationButtons}
                    onPress={() => {resetInputs(); props.navigation.navigate('Savings')}}
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
                    onPress={CreateSavingsGoal}
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