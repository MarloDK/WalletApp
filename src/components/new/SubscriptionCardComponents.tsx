import { StackNavigationProp } from "@react-navigation/stack";
import { Subscription } from "../../storage/classes/SubscriptionClass";
import { RootStackPropsList } from "../../storage/StackParams";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Header2, Header3, Paragraph } from "../CustomTextComponents";
import { AntDesign } from "@expo/vector-icons";
import { stylingConfig } from "../../configs/styling.config";
import { PaymentPeriod } from "../../storage/PaymentPeriodEnum";

type SubscriptionCardProps = {
    subscription: Subscription;
    navigation: StackNavigationProp<RootStackPropsList>;
}

export const SubscriptionCard = (props: SubscriptionCardProps) => {
    const getFormattedBillingDate = (): string => {
        const billingDate = props.subscription.getBillingDate();
        const year = billingDate.getFullYear();
        const month = billingDate.getMonth();
        const date = billingDate.getDate();

        if (props.subscription.getSubscriptionPeriod() == PaymentPeriod.YEARLY) {
            return `${date}/${month}/${year}`;
        }

        return `${date}/${month}`;
    }

    return (
        <TouchableOpacity 
            style={[styles.verticalListItemContainer]}
            onPress={() => props.navigation.navigate("EditSubscription", { subscription: props.subscription })}
        >
            <View style={styles.verticalListItemLeftContainer}>
                <View style={styles.iconContainer}>
                    <Image 
                        style={styles.image}
                        source={props.subscription.getLogoPath()}
                    />
                </View>
                <View style={styles.informationWrapper}>
                    <Header2>{props.subscription.getName()}</Header2>
                    <Paragraph>{getFormattedBillingDate()}</Paragraph>
                </View>
            </View>
            <View style={styles.valueContainer}>
                <Paragraph style={styles.valueText}>{props.subscription.getPrice()} DKK</Paragraph>
                <Paragraph style={{ textAlign: 'right' }}>/ {props.subscription.getSubscriptionPeriodName()}</Paragraph>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    verticalListItemContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    iconContainer: {
        height: '100%',
        aspectRatio: 1/1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: stylingConfig.colors.background,
        borderColor: stylingConfig.colors.secondaryVar,
    },
    informationWrapper: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    image: {
        aspectRatio: 1/1,
        width: 20,
        height: 20,
    },
    valueContainer: {

    },
    valueText: {
        color: stylingConfig.colors.text.textPrimary,
        fontSize: 16,
        fontFamily: stylingConfig.fontWeight.medium
    },
    verticalListItemLeftContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
});