import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Header2, Header3, Header4, Paragraph } from "../CustomTextComponents";
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { stylingConfig } from "../../configs/styling.config";
import { Account } from "../../storage/classes/AccountClass";
import { BrandLogos } from "../../utils/LogosAndIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../../storage/StackParams";
import { useState } from "react";
import { Subscription } from "../../storage/classes/SubscriptionClass";
import { SubscriptionCard } from "./SubscriptionCardComponents";

type AccountCardProps = {
    account: Account;
    navigation: StackNavigationProp<RootStackPropsList>;
}

export const AccountCard = (props: AccountCardProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                styles.largeSlimCardContainer
            ]}
            onPress={() => props.navigation.navigate('ViewAccount', { account: props.account })}
        >
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

export const AccountListItem = (props: AccountCardProps) => {
    return (
        <TouchableOpacity
            style={{
                borderColor: 'transparent',
                borderBottomColor: stylingConfig.colors.divider,
                borderWidth: 1,
                height: 80,
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 20,
                flexDirection: 'row',
            }}
            onPress={() => props.navigation.navigate('ViewAccount', { account: props.account })}
        >
            <View
                style={{
                    height: '100%',
                    aspectRatio: 1 / 1,
                    padding: 7,
                    marginRight: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor: stylingConfig.colors.background,
                    borderColor: stylingConfig.colors.secondaryVar,
                }}
            >
                {props.account.getIcon()}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                }}
            >
                <View 
                    style={{
                        height: '90%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Header4>{props.account.getName()}</Header4>
                    <Paragraph>{props.account.getFullId()}</Paragraph>
                </View>
                <View 
                    style={{
                        height: '90%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Header4 style={{ textAlign: 'right' }}>$ {props.account.getBalance()}</Header4>
                    <Paragraph style={{ textAlign: 'right' }}>{props.account.getLatestTransaction() ? '$ ' + props.account.getLatestTransaction().transactionValue : ' ' }</Paragraph>
                </View>
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
    iconContainer: {
        height: '100%',
        aspectRatio: 1 / 1,
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
});