import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AccountsTab, LoansTab, SubscriptionsTab } from "./CustomTabNavigatorTabs";
import { CustomTabNavButton } from "./CustomTabNavigatorNavButton";
import { Tab } from "../storage/TabEnum";

export const CustomTabNavigator = () => {
    const [activeTab, setActiveTab] = useState(Tab.ACCOUNTS);

    const navigateToTab = (tab: Tab) => {
        setActiveTab(tab);
    }

    const renderTab = () => {
        switch (activeTab) {
            case Tab.ACCOUNTS:
                return <AccountsTab />

            case Tab.SUBSCRIPTIONS:
                return <SubscriptionsTab />

            case Tab.LOANS:
                return <LoansTab />
        
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navButtonsContainer}>
                <CustomTabNavButton 
                    title={"Konti"}
                    activeTab={activeTab}
                    thisTab={Tab.ACCOUNTS}
                    navigateToTab={navigateToTab} 
                />

                <CustomTabNavButton 
                    title={"Abonnementer"}
                    activeTab={activeTab}
                    thisTab={Tab.SUBSCRIPTIONS}
                    navigateToTab={navigateToTab} 
                />

                <CustomTabNavButton 
                    title={"Lån"}
                    activeTab={activeTab}
                    thisTab={Tab.LOANS}
                    navigateToTab={navigateToTab} 
                />
            </View>
            {renderTab()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    navButtonsContainer: {
        flexDirection: 'row',
        gap: 50,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: 'center',
        marginBottom: 10,
    }
});

export { Tab };
