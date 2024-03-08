import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Header2, Header3, Header4, Paragraph } from "../CustomTextComponents";
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { stylingConfig } from "../../configs/styling.config";
import { Account } from "../../storage/classes/AccountClass";
import { BrandLogos } from "../../utils/LogosAndIcons";

type LargeSlimCardProps = {
    account: Account,
}

export const LargeSlimCard = (props: LargeSlimCardProps) => {
    return (
        <TouchableOpacity style={[styles.cardContainer, styles.largeSlimCardContainer]}>
            <View style={styles.iconContainer}>
                {props.account.getIcon()}
            </View>
            <View style={styles.informationWrapper}>
                <Header3>{props.account.getName()}</Header3>
                <Paragraph>Balance: ${props.account.getBalance()}</Paragraph>
            </View>
            <View style={styles.buttonContainer}>
                <AntDesign 
                    name="right" 
                    size={18}
                    color={stylingConfig.colors.secondaryVar} 
                />
            </View>
        </TouchableOpacity>
    )
}

export const SmallSlimCard = () => {
    const progress = 30;

    return (
        <TouchableOpacity style={[styles.cardContainer, styles.smallSlimCardContainer]}>
            <View style={styles.smallSlimCardUpperContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="car"
                        size={16}
                        color={stylingConfig.colors.secondaryVar}
                    />
                </View>
                <View style={styles.informationWrapper}>
                    <Header4>Primary Account</Header4>
                    <Paragraph>$1,520 / $15,000</Paragraph>
                </View>
            </View>
            <View style={styles.progressBarWrapper}>
                <View style={[styles.progressBarIndicator, {width: `${progress}%`}]}></View>
            </View>
        </TouchableOpacity>
    )
}

export const VerticalListItem = () => {
    return (
        <TouchableOpacity style={[styles.verticalListItemContainer]}>
            <View style={styles.verticalListItemLeftContainer}>
                <View style={styles.iconContainer}>
                    <Image 
                        style={styles.image}
                        source={BrandLogos.Spotify}
                    />
                </View>
                <View style={styles.informationWrapper}>
                    <Header2>Spotify Premium</Header2>
                    <Paragraph>Jan 31.</Paragraph>
                </View>
            </View>
            <View style={styles.valueContainer}>
                <Paragraph style={styles.valueText}>- $10</Paragraph>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: stylingConfig.colors.surface,
        borderRadius: 10,
        marginRight: 20,
        padding: 10,
    },
    smallSlimCardContainer: {
        height: 60,
        width: 150,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    largeSlimCardContainer: {
        height: 60,
        width: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginRight: 20,
        padding: 10,
    },
    verticalListItemContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
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
    buttonContainer: {
        padding: 5
    },
    smallSlimCardUpperContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 10,
    },
    progressBarWrapper: {
        height: 3,
        width: '100%',
        backgroundColor: stylingConfig.colors.primary,
        borderRadius: 5,
    },
    progressBarIndicator: {
        height: 3,
        backgroundColor: stylingConfig.colors.primaryVar,
        borderRadius: 5,
    },
    image: {
        aspectRatio: 1/1,
        width: 20,
        height: 20,
    },
    valueContainer: {

    },
    valueText: {
        color: stylingConfig.colors.error,
        fontSize: 16,
        fontFamily: stylingConfig.fontWeight.medium
    },
    verticalListItemLeftContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
});