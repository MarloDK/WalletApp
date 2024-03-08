import { StyleSheet, View, TouchableOpacity } from "react-native"
import { stylingConfig } from "../../configs/styling.config"
import { Header, Header2, Header3, Header4, Paragraph } from "../CustomTextComponents"
import { PieChart } from "react-native-gifted-charts"
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass"

type SavingsGoalCardProps = {
    savingGoal: SavingsGoal
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
        <TouchableOpacity style={styles.container}>
            <Header3 style={{ marginBottom: 20 }}>{props.savingGoal.getName()}</Header3>
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
        <TouchableOpacity style={styles.smallContainer}>
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

export const NewSavingsGoalButton = () => {
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