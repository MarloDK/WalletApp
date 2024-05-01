import { FontAwesome6 } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header2 } from "../../components/CustomTextComponents";
import { InputField } from "../../components/InputFieldComponents";
import { CreateNewButton } from "../../components/new/CreateNewButton";
import { InstanceCreator } from "../../components/new/InstanceCreator";
import { PaymentInfo } from "../../components/new/PaymentInfoComponent";
import { SubscriptionCard } from "../../components/new/SubscriptionCardComponents";
import { stylingConfig } from "../../configs/styling.config";
import { PaymentPeriod } from "../../storage/PaymentPeriodEnum";
import { RootStackPropsList } from "../../storage/StackParams";
import { Subscription } from "../../storage/classes/SubscriptionClass";
import { addSubscription, getSubscriptions } from "../../storage/database";
import { formatNumber } from "../../utils/NumberFormatter";

type PaymentsScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Payments'>;
}

export const PaymentsScreen = (props: PaymentsScreenProps) => {
    const [payments, setPayments] = useState(Array<Subscription>);
    const [totalOwedThisMonth, setTotalOwedThisMonth] = useState(0);
    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchItems = async () => {
        console.log("Fetching Subscriptions");

        const newSubscriptions = getSubscriptions();

        if (newSubscriptions != payments) {
            setPayments(newSubscriptions);
        }

        const owedThisMonth = newSubscriptions.reduce((acc, subscription) => acc += subscription.monthlyPrice, 0);
        setTotalOwedThisMonth(Math.round(owedThisMonth));

        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
    }

    useEffect(() => {
        const onFocus = props.navigation.addListener('focus', () => {
            fetchItems();
        });

        // Return constants to avoid memory leak
        return onFocus;
    });

    const [isNewPaymentModalVisible, setIsNewPaymentModalVisible] = useState(false);
    const [isEditPaymentModalVisible, setIsEditPaymentModalVisible] = useState(false);

    const [paymentBeingEdited, setPaymentBeingEdited] = useState(new Subscription('', '', 0, PaymentPeriod.MONTHLY, new Date()));
    const [newPaymentName, setNewPaymentName] = useState('');
    const [newPaymentLogo, setNewPaymentLogo] = useState('');
    const [newPaymentPrice, setNewPaymentPrice] = useState('');
    const [newPaymentPeriod, setNewPaymentPeriod] = useState(PaymentPeriod.MONTHLY.toString());
    
    // Strings to prevent NaN in input field
    const [newPaymentBillingDateYear, setNewPaymentBillingDateYear] = useState('');
    const [newPaymentBillingDateMonth, setNewPaymentBillingDateMonth] = useState('');
    const [newPaymentBillingDateDay, setNewPaymentBillingDateDay] = useState('');


    const onNewPaymentModalOpen = () => {
        setIsNewPaymentModalVisible(true);
    }

    const onEditPaymentModalOpen = (payment: Subscription) => {
        setPaymentBeingEdited(payment);

        setNewPaymentName(payment.name);
        setNewPaymentLogo(payment.logoPath);
        setNewPaymentPrice(payment.price.toString());
        setNewPaymentPeriod(payment.subscriptionPeriod.toString());
        setNewPaymentBillingDateYear(payment.billingDate.getFullYear().toString());
        setNewPaymentBillingDateMonth(payment.billingDate.getMonth().toString());
        setNewPaymentBillingDateDay(payment.billingDate.getDay().toString());


        setIsEditPaymentModalVisible(true);
    }

    const onNewPaymentModalClose = () => {
        setIsNewPaymentModalVisible(false);
    }

    const onEditPaymentModalClose = () => {
        setIsEditPaymentModalVisible(false);
        resetModalInputs();
    }

    const onNewPaymentModalSubmit = () => {
        setIsNewPaymentModalVisible(false);

        console.log("Create new payment instnace");

        let newPayment = new Subscription(
            newPaymentName,
            '',
            parseInt(newPaymentPrice),
            PaymentPeriod.MONTHLY,
            new Date(),
        );

        addSubscription(newPayment);
        resetModalInputs();
    }

    const onEditPaymentModalSubmit = () => {
        setIsEditPaymentModalVisible(false);

        paymentBeingEdited.name = newPaymentName;
        paymentBeingEdited.logoPath = newPaymentLogo;

        const priceAsNum = parseInt(newPaymentPrice);
        if (Number.isNaN(priceAsNum)) {
            return console.warn("Price as number was NaN!");
        }
        paymentBeingEdited.price = parseInt(newPaymentPrice);
        
        console.log("Line 92 - payments screen; add sub period support");
        //paymentBeingEdited.subscriptionPeriod = newPaymentPeriod;

        resetModalInputs();
    }

    const resetModalInputs = () => {
        setNewPaymentName('');
        setNewPaymentLogo('');
        setNewPaymentPrice('');
        setNewPaymentPeriod(PaymentPeriod.MONTHLY.toString());
        setNewPaymentBillingDateYear('');
        setNewPaymentBillingDateMonth('');
        setNewPaymentBillingDateDay('');

        setRerenderKey(oldKey => oldKey + 1);
    }

    const renderItem = (payment: Subscription) => {
        return (
            <SubscriptionCard subscription={payment} onPress={onEditPaymentModalOpen}></SubscriptionCard>
        )
    }

    return (
        <View style={styles.appWrapper}>
            <InstanceCreator
                title={"New Subscription"} 
                submitText={"Create Subscription"}
                isVisible={isNewPaymentModalVisible} 
                onClose={onNewPaymentModalClose} 
                onSubmit={onNewPaymentModalSubmit} 
            >
                <InputField
                    name="Name"
                    value={newPaymentName}
                    placeholder="Ex. Spotify Premium"
                    onValueChange={(text) => setNewPaymentName(text)}
                />

                <InputField
                    name="Icon"
                    value={newPaymentLogo}
                    placeholder="IS"
                    onValueChange={(text) => setNewPaymentLogo(text)}
                />

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Price"
                        value={newPaymentPrice}
                        placeholder="ex. 15"
                        suffix="$"
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentPrice(text) }
                        flex={1}
                    /> 
                    <InputField
                        name="Payment Period"
                        value={newPaymentPeriod}
                        placeholder="Monthly"
                        onValueChange={(text) => setNewPaymentPeriod(text)}
                        flex={2}
                    />                   
                </View>

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Billing Date"
                        value={newPaymentBillingDateYear}
                        placeholder="YYYY"
                        maxLength={4}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateYear(text)}
                        flex={2}
                    />
                    <InputField
                        name=""
                        value={newPaymentBillingDateMonth}
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateMonth(text)}
                        flex={1}
                    />
                    <InputField
                        name=""
                        value={newPaymentBillingDateDay}
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateDay(text)}
                        flex={1}
                    />
                </View>
            </InstanceCreator>
            
            <InstanceCreator
                title={"Edit Subscription"} 
                submitText={"Save Changes"}
                isVisible={isEditPaymentModalVisible} 
                onClose={onEditPaymentModalClose} 
                onSubmit={onEditPaymentModalSubmit} 
            >
                <InputField
                    name="Name"
                    value={newPaymentName}
                    placeholder="Ex. Spotify Premium"
                    onValueChange={(text) => setNewPaymentName(text)}
                />

                <InputField
                    name="Icon"
                    value={newPaymentLogo}
                    placeholder="IS"
                    onValueChange={(text) => setNewPaymentLogo(text)}
                />

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Price"
                        value={newPaymentPrice}
                        placeholder="ex. 15"
                        suffix="$"
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentPrice(text) }
                        flex={1}
                    /> 
                    <InputField
                        name="Payment Period"
                        value={newPaymentPeriod}
                        placeholder="Monthly"
                        onValueChange={(text) => setNewPaymentPeriod(text)}
                        flex={2}
                    />                   
                </View>

                <View style={styles.billingDateInput}>
                    <InputField
                        name="Billing Year"
                        value={newPaymentBillingDateYear}
                        placeholder="YYYY"
                        maxLength={4}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateYear(text)}
                        flex={2}
                    />
                    <InputField
                        name="Month"
                        value={newPaymentBillingDateMonth}
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateMonth(text)}
                        flex={1}
                    />
                    <InputField
                        name="Date"
                        value={newPaymentBillingDateDay}
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="number-pad"
                        onValueChange={(text) => setNewPaymentBillingDateDay(text)}
                        flex={1}
                    />
                </View>
            </InstanceCreator>

            <View style={styles.headerExtension}>
                <PaymentInfo
                    icon={<FontAwesome6 name="user-clock" size={20} color={stylingConfig.colors.text.textLight} />}
                    title={"Owed this mo."}
                    value={formatNumber(totalOwedThisMonth)}
                />
                <PaymentInfo
                    icon={<FontAwesome6 name="money-check-dollar" size={20} color={stylingConfig.colors.text.textLight} />}
                    title={"Outstanding"}
                    value={"999.999,99"}
                />
            </View>
            <View style={styles.container}>
                <Header2>Subscriptions</Header2>
                <FlatList 
                    key={rerenderKey}
                    data={payments}
                    numColumns={1}
                    contentInset={{ bottom: 70 }}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item, index) => `payment-subscription-${index}`}
                />
            </View>
            <CreateNewButton onPress={onNewPaymentModalOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: stylingConfig.colors.background,
    },
    container: {
        paddingTop: 30,
        marginHorizontal: '5%',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: 415,
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 60,
        alignItems: 'flex-start',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        columnGap: 40,
    },
    billingDateInput: {
        flexDirection: 'row',
        gap: 10,
    }
})