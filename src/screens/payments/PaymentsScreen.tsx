import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native"
import { RootStackPropsList } from "../../storage/StackParams";
import { stylingConfig } from "../../configs/styling.config";
import { FontAwesome6 } from "@expo/vector-icons";
import { Header4, Paragraph } from "../../components/CustomTextComponents";
import { PaymentInfo } from "../../components/new/PaymentInfoComponent";

type PaymentsScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Payments'>;
}

export const PaymentsScreen = (props: PaymentsScreenProps) => {
    const infoIconSizes = 20;

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <PaymentInfo
                    icon={<FontAwesome6 name="user-clock" size={infoIconSizes} color={stylingConfig.colors.text.textLight} />}
                    title={"Owed this mo."}
                    value={"999.999,99"}
                />
                <PaymentInfo
                    icon={<FontAwesome6 name="money-check-dollar" size={infoIconSizes} color={stylingConfig.colors.text.textLight} />}
                    title={"Outstanding"}
                    value={"999.999,99"}
                />
            </View>
            <View style={styles.container}>

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
})