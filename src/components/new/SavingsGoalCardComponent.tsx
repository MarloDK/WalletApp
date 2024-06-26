import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { PieChart } from "react-native-gifted-charts"
import { stylingConfig } from "../../configs/styling.config"
import { RootStackPropsList } from "../../storage/StackParams"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { formatNumber } from "../../utils/NumberFormatter"
import { Header3, Paragraph } from "../CustomTextComponents"

type SavingsGoalCardProps = {
    savingGoal: SavingsGoal;
    navigation: StackNavigationProp<RootStackPropsList>;
    previousScreenRef?: string
}

export const SavingsGoalCard = (props: SavingsGoalCardProps) => {
    const savedPercentage = (props.savingGoal.savedAmount / props.savingGoal.targetAmount) * 100;
    const percentageLeft = 100 - savedPercentage;


    const chartData = [
        {
            value: savedPercentage,
            color: stylingConfig.colors.primary,
        },
        {
            value: percentageLeft,
            color: stylingConfig.colors.shadow,
        }
    ]

    return (
        <TouchableOpacity 
            style={styles.container}
            // @ts-ignore
            onPress={() => props.navigation.navigate("ViewSavingsGoal", { savingsGoal: props.savingGoal })}
        >
            <Header3 style={{ marginBottom: 20, textAlign: 'center' }}>{props.savingGoal.name}</Header3>
            <PieChart
                data={chartData} 
                radius={50}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Paragraph 
                    style={{ 
                        color: stylingConfig.colors.primary, 
                        fontFamily: stylingConfig.fontWeight.medium 
                    }}
                >
                    ${props.savingGoal.savedAmount}
                </Paragraph>
                <Paragraph 
                    style={{ 
                        color: stylingConfig.colors.text.textSecondary
                    }}
                > / {props.savingGoal.targetAmount}
                
                </Paragraph>
            </View>
            <Paragraph style={{ marginTop: 5, color: stylingConfig.colors.secondary }}>({Math.floor(savedPercentage)}%)</Paragraph>
        </TouchableOpacity>
    )
}

export const SavingsGoalCardSmall = (props: SavingsGoalCardProps) => {
    const savedPercentage = (props.savingGoal.savedAmount / props.savingGoal.targetAmount) * 100;
    const percentageLeft = 100 - savedPercentage;


    const chartData = [
        {
            value: savedPercentage,
            color: stylingConfig.colors.primary,
        },
        {
            value: percentageLeft,
            color: stylingConfig.colors.shadow,
        }
    ]

    return (
        <TouchableOpacity 
            style={styles.smallContainer}
            onPress={() => props.navigation.navigate('Saving')}
        >
            <PieChart
                data={chartData} 
                radius={20}
            />
            <View style={styles.infoContainer}>
                <Header3 style={{ fontSize: 14 }}>{props.savingGoal.name}</Header3>
                <View style={{ flexDirection: 'row', width: '100%'}}>
                    <Paragraph 
                        style={{ 
                            color: stylingConfig.colors.primary, 
                            fontFamily: stylingConfig.fontWeight.medium 
                        }}
                    >
                        ${formatNumber(props.savingGoal.savedAmount)}
                    </Paragraph>
                    <Paragraph 
                        style={{ 
                            color: stylingConfig.colors.text.textSecondary
                        }}
                    > / {formatNumber(props.savingGoal.targetAmount)}</Paragraph>
                    <Paragraph style={{ color: stylingConfig.colors.secondary }}> ({Math.floor(savedPercentage)}%)</Paragraph>
                </View>
            </View>
        </TouchableOpacity>
    )
}

type NewSavingsGoalButtonProps = {
    callback: () => void
    navigation: StackNavigationProp<RootStackPropsList>
}

export const NewSavingsGoalButton = (props: NewSavingsGoalButtonProps) => {
    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: stylingConfig.colors.secondary
                }
            ]}
            // @ts-expect-error
            onPress={() => props.navigation.navigate('CreateSavingsGoal') && props.callback()}
        >
            <Header3 style={{
                color: stylingConfig.colors.text.textSecondary,
                fontSize: 10,
                textAlign: 'center',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderWidth: 2,
                borderColor: stylingConfig.colors.secondary,
                borderRadius: 10,
            }}
            >
                New Goal
            </Header3>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: stylingConfig.colors.surface,
        width: 160,
        height: 230,
        padding: 30,
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',
    },
    smallContainer: {
        backgroundColor: stylingConfig.colors.surface,
        width: 200,
        height: 60,
        padding: 10,
        borderRadius: 10,

        flexDirection: 'row',
        gap: 10,

        marginRight: 20,
    },
    infoContainer: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})