import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackPropsList } from "../../../storage/StackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { Paragraph } from "../../../components/CustomTextComponents";
import { stylingConfig } from "../../../configs/styling.config";
import { useCallback, useEffect, useState } from "react";
import { InputField } from "../../../components/InputFieldComponents";

type EditSubscriptionProps = {
    route: RouteProp<RootStackPropsList, 'EditSubscription'>,
    navigation: StackNavigationProp<RootStackPropsList, 'EditSubscription'>,
}

export const EditSubscriptionScreen = ({route, navigation}: EditSubscriptionProps) => {
    const { subscription } = route.params;

    const [name, setName] = useState('');
    const [logoPath, setLogoPath] = useState('');
    const [price, setPrice] = useState(''); // String to prevent NaN in input field
    const [paymentPeriod, setPaymentPeriod] = useState('');
    
    // Strings to prevent NaN in input field
    const [billingDateYear, setBillingDateYear] = useState('');
    const [billingDateMonth, setBillingDateMonth] = useState('');
    const [billingDateDay, setBillingDateDay] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clearInputs();
        });

        const onFocus = navigation.addListener('focus', () => {
            clearInputs();
            fetchSubscriptionData();
        });

        // Return constants to avoid memory leaks
        return unsubscribe;
    })

    const fetchSubscriptionData = () => {
        setName(subscription.name);
        setPrice(subscription.price.toString());
        setPaymentPeriod(subscription.subscriptionPeriodName);
        setBillingDateYear(subscription.billingDate.getFullYear().toString());
        setBillingDateMonth(subscription.billingDate.getMonth().toString());
        setBillingDateDay(subscription.billingDate.getDate().toString());
    }

    const clearInputs = () => {
        setName('');
        setPrice('');
        setPaymentPeriod('');
        setBillingDateYear('');
        setBillingDateMonth('');
        setBillingDateDay('');
    }

    const saveData = () => {
        console.log("Finish save changes functionality!!!");

        const priceAsNum = parseInt(price);
        if (Number.isNaN(priceAsNum)) {
            return console.warn("Price as number was NaN!");
        }

        subscription.name = name;
        subscription.price = parseInt(price);

        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    name="Name"
                    value={name}
                    placeholder="Ex. Spotify Premium"
                    onValueChange={(text) => setName(text)}
                />

                <InputField
                    name="Icon"
                    value={logoPath}
                    placeholder="IS"
                    onValueChange={(text) => setLogoPath(text)}
                />

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Price"
                        value={price}
                        placeholder="ex. 15"
                        suffix="$"
                        keyboardType="number-pad"
                        onValueChange={(text) => setPrice(text) }
                        flex={1}
                    /> 
                    <InputField
                        name="Payment Period"
                        value={paymentPeriod}
                        placeholder="Monthly"
                        onValueChange={(text) => setPaymentPeriod(text)}
                        flex={2}
                    />                   
                </View>

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Billing Date"
                        value={billingDateYear}
                        placeholder="YYYY"
                        maxLength={4}
                        keyboardType="number-pad"
                        onValueChange={(text) => setBillingDateYear(text)}
                        flex={2}
                    />
                    <InputField
                        name=""
                        value={billingDateMonth}
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setBillingDateMonth(text)}
                        flex={1}
                    />
                    <InputField
                        name=""
                        value={billingDateDay}
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setBillingDateDay(text)}
                        flex={1}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 50, marginTop: 150 }}>
                <TouchableOpacity 
                    style={styles.navigationButtons}
                    onPress={() => navigation.goBack()}
                >
                    <Paragraph style={styles.navigationButtonsText}>Back</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.navigationButtons, 
                            { 
                                backgroundColor: stylingConfig.colors.secondaryVar 
                            }
                        ]}
                    // @ts-ignore
                    onPress={() => {
                        saveData();
                    }}
                >
                    <Paragraph style={[styles.navigationButtonsText, { color: stylingConfig.colors.text.textLight }]}>Save</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: stylingConfig.colors.background,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: '5%',
        flex: 1,
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
    },
    formContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
    },
    billingDateInput: {
        flexDirection: 'row',
        gap: 10,
    }
});