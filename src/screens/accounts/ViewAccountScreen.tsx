import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { CustomLink, Header, Header2 } from "../../components/CustomTextComponents"
import { SubscriptionCard } from "../../components/new/SubscriptionCardComponents"
import { stylingConfig } from "../../configs/styling.config"
import { RootStackPropsList } from "../../storage/StackParams"
import { Subscription } from "../../storage/classes/SubscriptionClass"
import { formatNumber } from "../../utils/NumberFormatter"

type ViewAccountProps = {
    route: RouteProp<RootStackPropsList, 'ViewAccount'>,
    navigation: StackNavigationProp<RootStackPropsList, 'ViewAccount'>,
}

export const ViewAccountScreen = ({route, navigation}: ViewAccountProps) => {
    const [rerenderKey, setRerenderKey] = useState(0);
    const { account } = route.params;

    navigation.setOptions({ 
        headerTitle: account.name, 
        headerTitleStyle: {
            fontFamily: stylingConfig.fontWeight.semiBold,
            color: stylingConfig.colors.text.textLight,
            fontSize: stylingConfig.fontSizes.h2,
        }
    });

    const getSubscriptionCards = (): Array<JSX.Element> => {
        const subscriptions: Array<Subscription> = account.attachedSubscriptions;
        let subscriptionCards: Array<JSX.Element> = Array<JSX.Element>();

        subscriptions.forEach(subscription => {
            subscriptionCards.push(
                <SubscriptionCard subscription={subscription} navigation={navigation}></SubscriptionCard>
            )
        });

        return subscriptionCards;
    }

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <Header style={{ color: stylingConfig.colors.text.textLight }}>$ {formatNumber(account.balance)}</Header>
            </View>
            <View style={styles.container}>
                <CustomLink to={"/Accounts"}>{"<"} Back</CustomLink>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Header2>Subscriptions</Header2>
                        <CustomLink to={"/Payments"}>See All</CustomLink>
                    </View>
                    <ScrollView 
                        style={styles.verticalScrollWrapper}
                        horizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                    >
                        {getSubscriptionCards()}
                    </ScrollView>
                </View>
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
        paddingTop: 20,
        paddingHorizontal: '5%',
        flexDirection: 'column',
        width: '100%',
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    sectionContainer: {
        width: '100%',
        alignSelf: 'stretch',
        paddingTop: 10,
    },
    verticalScrollWrapper: {
        paddingVertical: 10,
        flexDirection: 'column',
        overflow: 'hidden',
    },
});