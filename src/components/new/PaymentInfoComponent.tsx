import { StyleSheet, View } from "react-native"
import { Header4, Paragraph } from "../CustomTextComponents"
import { FontAwesome6 } from "@expo/vector-icons"
import { stylingConfig } from "../../configs/styling.config"

type PaymentInfoComponentProps = {
    icon: JSX.Element
    title: string,
    value: string | number
}

export const PaymentInfo = (props: PaymentInfoComponentProps) => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoIconWrapper}>
                {props.icon}
            </View>
            <View style={styles.infoValueWrapper}>
                <Header4 style={styles.infoHeader}>{props.title}</Header4>
                <Paragraph style={styles.infoValue}>$ {props.value}</Paragraph>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
    },
    infoIconWrapper: {
        padding: 7,
        borderWidth: 1,
        borderColor: stylingConfig.colors.text.textLight,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        aspectRatio: 1/1,
    },
    infoValueWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingLeft: 10,
    },
    infoHeader: {
        color: stylingConfig.colors.text.textLight,
        fontSize: 14
    },
    infoValue: {
        color: stylingConfig.colors.text.textLight
    },
});