import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { RootStackPropsList } from "../storage/StackParams";
import { Header2, Header3, Paragraph, CustomLink } from "../components/CustomTextComponents";
import { stylingConfig } from "../configs/styling.config";
import { LargeSlimCard } from "../components/new/ScrollCardComponents";
import { VerticalListItem } from "../components/new/ScrollCardComponents";
import { getAccounts, getSavingsGoals } from "../storage/database";
import { SavingsGoalCardSmall } from "../components/new/SavingsGoalCardComponent";
import { useCallback, useState } from "react";
import { Account } from "../storage/classes/AccountClass";
import { SavingsGoal } from "../storage/classes/SavingsGoalClass";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'Home'>;
}

export const DashboardScreen = (props: Props) => {
    const [accounts, setAccounts] = useState(Array<Account>());
    const [savingsGoals, setSavingsGoals] = useState(Array<SavingsGoal>());

    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchData = () => {
        const newAccounts = getAccounts();
        const newSavingsGoals = getSavingsGoals();

        setAccounts(newAccounts);
        setSavingsGoals(newSavingsGoals);

        setRerenderKey(oldKey => oldKey + 1)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();

            return () => {};
        }, [])
    )

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <View style={styles.headerInfoContainer}>
                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Budget left</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>$2500</Header3>
                    </View>
                    <View style={styles.headerInfoDivider}></View>

                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Spent this month</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>$1000</Header3>
                    </View>
                    <View style={styles.headerInfoDivider}></View>

                    <View style={styles.headerInfoElement}>
                        <Paragraph fontWeight="light" style={styles.headerInfoHeader}>Expenses left</Paragraph>
                        <Header3 fontWeight="medium" style={styles.headerInfoValue}>$1500</Header3>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Header2>Accounts</Header2>
                        <CustomLink to={"/Accounts"}>See all</CustomLink>
                    </View>
                    <FlatList 
                        key={rerenderKey}
                        horizontal
                        data={accounts}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        contentContainerStyle={styles.horizontalScrollWrapper}
                        renderItem={({ item }) => <LargeSlimCard account={item} />}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Header2>Goals</Header2>
                        <CustomLink to={"/Savings"}>See all</CustomLink>
                    </View>
                    <FlatList 
                        key={rerenderKey}
                        horizontal
                        data={savingsGoals}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        contentContainerStyle={styles.horizontalScrollWrapper}
                        renderItem={({ item }) => <SavingsGoalCardSmall navigation={props.navigation} savingGoal={item} previousScreenRef="Dashboard" />}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Header2>Upcoming Expenses</Header2>
                    <ScrollView 
                        style={styles.verticalScrollWrapper}
                        horizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                    >
                        <VerticalListItem />
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
        backgroundColor: stylingConfig.colors.background
    },
    container: {
        marginHorizontal: '5%',
        paddingTop: 30,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 30,
    },
    headerInfoContainer: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingVertical: 12,
        backgroundColor: stylingConfig.colors.background,
        borderRadius: 10,
        shadowColor: stylingConfig.colors.shadow,
        shadowOffset: { width: 0, height: 4},
        shadowRadius: 4,
        shadowOpacity: 100,
    },
    headerInfoDivider: {
        width: 1,
        height: '60%',
        backgroundColor: stylingConfig.colors.divider,
        marginHorizontal: 15,
    },
    headerInfoElement: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 100,
    },
    headerInfoHeader: {
        fontSize: 10,
        fontFamily: 'Inter_400Regular',
        color: '#757575',
        marginBottom: 5,
    },
    headerInfoValue: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        color: '#212121',
    },
    sectionContainer: {
        width: '100%',
        alignSelf: 'stretch',
        paddingTop: 30,
    },
    horizontalScrollWrapper: {
        paddingLeft: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    verticalScrollWrapper: {
        paddingVertical: 10,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    accountCardContainer: {
        height: 60,
        width: 250,
        marginRight: 10,
        backgroundColor: stylingConfig.colors.surface,
        borderRadius: 10,
    }
});