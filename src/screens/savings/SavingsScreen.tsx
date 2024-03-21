import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { Header4, Paragraph, Subheader } from "../../components/CustomTextComponents"
import { LargeSlimCard } from "../../components/new/ScrollCardComponents"
import { stylingConfig } from "../../configs/styling.config"
import { getAccounts, getSavingsGoals } from "../../storage/database"
import { LineChart } from "react-native-gifted-charts"
import { NewSavingsGoalButton, SavingsGoalCard } from "../../components/new/SavingsGoalCardComponent"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { RootStackPropsList } from "../../storage/StackParams"
import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

type SavingsScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Savings'>;
}

export const SavingsScreen = (props: SavingsScreenProps) => {
    const [savingsGoals, setSavingsGoals] = useState(Array<SavingsGoal>);
    const [rerenderKey, setRerenderKey] = useState(0);
    const footerItem = { isFooter: true };

    const fetchItems = () => {
        console.log("Fetching Savings Goals");

        const newSavingsGoals = getSavingsGoals();
        setSavingsGoals(newSavingsGoals);

        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
    }

    useFocusEffect(
        useCallback(() => {
            fetchItems();

            return () => {}
        }, [])
    )

    const testData = [
        5000,
        3231,
        4723,
        6906,
        7853,
        6342,
        4329,
        6544,
        5463,
        6577,
        7232,
        8536
    ];

    const renderItem = (item: any) => {
        if (item.isFooter) {
            return <View style={{ marginHorizontal: 10}}><NewSavingsGoalButton navigation={props.navigation} callback={fetchItems} /></View>
        }

        return <View style={{ marginHorizontal: 10}}><SavingsGoalCard navigation={props.navigation} savingGoal={item} /></View>
    }

    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>
                <Paragraph style={{ color: stylingConfig.colors.text.textLight }}>Your savings</Paragraph>
                <Subheader>$ 4652.21</Subheader>
                <LineChart
                    initialSpacing={4}
                    data={testData.map(item => {
                        return {value: item};
                    })}
                    adjustToWidth
                    dataPointsColor={stylingConfig.colors.text.textLight}
                    areaChart
                    color={stylingConfig.colors.secondaryVar}
                    startFillColor={stylingConfig.colors.secondary}
                    startOpacity={0.5}
                    endFillColor={stylingConfig.colors.secondaryVar}
                    endOpacity={0}
                    height={160}
                    xAxisColor={stylingConfig.colors.primaryVar}
                    yAxisColor="transparent"
                    isAnimated
                    animationDuration={0.3}
                    thickness={4}
                    dataPointsRadius={4}
                    showStripOnFocus
                    noOfSections={4}
                    rulesType="solid"
                    rulesColor={stylingConfig.colors.primaryVar}
                    yAxisLabelPrefix={"$"}
                    curved
                    curvature={0.2}
                    spacing={29}
                    hideDataPoints
                    yAxisExtraHeight={30}
                    maxValue={10000}
                    yAxisTextStyle={{
                        color: stylingConfig.colors.text.textLight
                    }}
                    yAxisOffset={0}
                    yAxisLabelWidth={50}
                    disableScroll

                    pointerConfig={{
                        pointerStripUptoDataPoint: true,
                        pointerStripColor: stylingConfig.colors.text.textLight,
                        pointerColor: stylingConfig.colors.text.textLight,
                        strokeDashArray: [10, 5],
                        pointerLabelWidth: 60,
                        pointerLabelHeight: 90,
                        pointerStripWidth: 3,
                        radius: 5,
                        
                        pointerLabelComponent: (items: any) => {
                            return (
                                <View
                                    style={{
                                        
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -25,
                                        marginLeft: -40,
                                    }}
                                >

                                    <View
                                        style={{
                                            backgroundColor: stylingConfig.colors.surface,
                                            borderRadius: 20,
                                            paddingVertical: 10,
                                            paddingHorizontal: 14,
                                        }}
                                    >
                                    <Header4>
                                        $ {items[0].value}.0
                                    </Header4>
                                    </View>
                                </View>
                            )
                        }

                    }}
                >

                </LineChart>
            </View>
            <View style={styles.container}>
                <FlatList 
                    key={rerenderKey}
                    data={[...savingsGoals, footerItem]}
                    contentInset={{ top: 30, bottom: 30 }}
                    contentOffset={{ x: 0, y: -30}}
                    contentContainerStyle={styles.savingsContainer}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item, index) => `savingGoal-${index}`}
                />
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
        height: 260,
        alignItems: 'center',
        paddingHorizontal: '5%',
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
    },
    savingsContainer: {
        overflow: 'scroll',
        alignItems: 'center',
        width: '100%',
        rowGap: 20,
    }
});