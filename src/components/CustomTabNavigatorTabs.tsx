import { ScrollView, StyleSheet, View } from "react-native"
import { TabItem } from "./TabItems"
import { Tab } from "../storage/TabEnum"
import { NewTabItemButton } from "./NewTabItemButton"
import { getAccounts, getLoans, getSubscriptions } from "../storage/database"
import { formatNumber } from "../utils/NumberFormatter"
import { Transaction } from "../storage/classes/TransactionClass"

export const AccountsTab = () => {
    let allTabItems: any = [];
    const allAccounts = getAccounts();

    allAccounts.forEach((account, i) => {
        let latestTransaction = account.getLatestTransaction();
        if (!latestTransaction)
            latestTransaction = new Transaction("Placeholder", new Date(), 0, 100);
        allTabItems.push(
            <TabItem
                key={i}
                tabType={Tab.ACCOUNTS}
                name={account.getName()}
                imageSource={account.getIcon()}
                value={account.getBalance()}
                description={account.getFullId()}
                secondaryDescription={latestTransaction.transactionValue.toString()}
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabType={Tab.ACCOUNTS}
            />
        </ScrollView>
    )
}

export const SubscriptionsTab = () => {
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
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabType={Tab.SUBSCRIPTIONS}
            />
        </ScrollView>
    )
}

export const LoansTab = () => {
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
            />
        )
    })

    return (
        <ScrollView style={styles.container}>
            {allTabItems}
            <NewTabItemButton
                tabType={Tab.SUBSCRIPTIONS}
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