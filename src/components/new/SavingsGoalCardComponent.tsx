import { StyleSheet, View, TouchableOpacity } from "react-native"
import { stylingConfig } from "../../configs/styling.config"
import { Header, Header2, Header3, Header4, Paragraph } from "../CustomTextComponents"
import { PieChart } from "react-native-gifted-charts"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"
import { RouteProp } from "@react-navigation/native"
import { RootStackPropsList } from "../../storage/StackParams"
import { StackNavigationProp } from "@react-navigation/stack"

type SavingsGoalCardProps = {
    savingGoal: SavingsGoal;
    navigation: StackNavigationProp<RootStackPropsList>;
    previousScreenRef?: string
}

export const SavingsGoalCard = (props: SavingsGoalCardProps) => {
    const savedPercentage = (props.savingGoal.getSavedAmount() / props.savingGoal.getTargetAmount()) * 100;
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
            <Header3 style={{ marginBottom: 20, textAlign: 'center' }}>{props.savingGoal.getName()}</Header3>
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
                    ${props.savingGoal.getSavedAmount()}
                </Paragraph>
                <Paragraph 
                    style={{ 
                        color: stylingConfig.colors.text.textSecondary
                    }}
                > / {props.savingGoal.getTargetAmount()}
                
                </Paragraph>
            </View>
            <Paragraph style={{ marginTop: 5, color: stylingConfig.colors.secondary }}>({Math.floor(savedPercentage)}%)</Paragraph>
        </TouchableOpacity>
    )
}

export const SavingsGoalCardSmall = (props: SavingsGoalCardProps) => {
    const savedPercentage = (props.savingGoal.getSavedAmount() / props.savingGoal.getTargetAmount()) * 100;
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
            onPress={() => props.navigation.navigate('ViewSavingsGoal', { savingsGoal: props.savingGoal, previousScreenRef: props.previousScreenRef ? props.previousScreenRef : undefined })}
        >
            <PieChart
                data={chartData} 
                radius={20}
            />
            <View style={styles.infoContainer}>
                <Header3 style={{ fontSize: 14 }}>{props.savingGoal.getName()}</Header3>
                <View style={{ flexDirection: 'row', width: '100%'}}>
                    <Paragraph 
                        style={{ 
                            color: stylingConfig.colors.primary, 
                            fontFamily: stylingConfig.fontWeight.medium 
                        }}
                    >
                        ${props.savingGoal.getSavedAmount()}
                    </Paragraph>
                    <Paragraph 
                        style={{ 
                            color: stylingConfig.colors.text.textSecondary
                        }}
                    > / {props.savingGoal.getTargetAmount()}</Paragraph>
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