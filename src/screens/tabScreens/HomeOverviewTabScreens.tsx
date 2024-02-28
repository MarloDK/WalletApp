
import { ScrollView, StyleSheet, View } from "react-native"
import { TabItem } from "../../components/TabItemComponent"
import { Tab } from "../../storage/TabEnum"
import { NewTabItemButton } from "../../components/NewTabItemButtonComponent"
import { getAccounts, getLoans, getSubscriptions } from "../../storage/database"
import { formatNumber } from "../../utils/NumberFormatter"
import { Transaction } from "../../storage/classes/TransactionClass"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackPropsList } from "../../storage/StackParams"

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'Home'>;
}

export const AccountsOverviewTabScreen = (props: Props) => {
    let allTabItems: any = [];
    const allAccounts = getAccounts();

    allAccounts.forEach((account, i) => {
        let latestTransaction = account.getLatestTransaction();
        if (!latestTransaction)
            latestTransaction = new Transaction("Placeholder", new Date().toISOString(), 0, 100);
        allTabItems.push(
            <TabItem
                key={i}
                tabType={Tab.ACCOUNTS}
                name={account.getName()}
                imageSource={account.getIcon()}
                value={account.getBalance()}
                description={account.getFullId()}
                secondaryDescription={latestTransaction.transactionValue.toString()}
                navigation={props.navigation}
                object={account}
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabTypeId={0}
                navigation={props.navigation}
            />
        </ScrollView>
    )
}

export const SubscriptionsOverviewTabScreen = (props: Props) => {
    let allTabItems: any = [];
    const allSubscriptions = getSubscriptions();

    allSubscriptions.forEach((subscription, i) => {
        let billingDate = subscription.getBillingDate();

        allTabItems.push(
            <TabItem
                key={i}
                tabType={Tab.SUBSCRIPTIONS}
                name={subscription.getName()}
                imageSource={subscription.getLogoPath()}
                value={subscription.getPrice()}
                description={`Næste betaling: ${billingDate.getDay()}/${billingDate.getMonth()}`}
                secondaryDescription={`/ ${subscription.getSubscriptionPeriodName()}`}
                navigation={props.navigation}
                object={subscription}
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabTypeId={1}
                navigation={props.navigation}
            />
        </ScrollView>
    )
}

export const LoansOverviewTabScreen = (props: Props) => {
    let allTabItems: any = [];
    const allLoans = getLoans();

    allLoans.forEach((loan, i) => {
        allTabItems.push(
            <TabItem
                key={i}
                tabType={Tab.LOANS}
                name={loan.getName()}
                imageSource={loan.getIcon()}
                value={loan.amount}
                description={loan.creditor}
                secondaryDescription={"Rest: " + formatNumber(loan.getRemainingDebt())}
                navigation={props.navigation}
                object={loan}
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabTypeId={2}
                navigation={props.navigation}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 100,
        maxHeight: 400,
        overflow: 'scroll',
    }
})