import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Header2, Header3, Paragraph, Subheader } from "../../components/CustomTextComponents"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackPropsList } from "../../storage/StackParams"
import { RouteProp } from "@react-navigation/native"
import { stylingConfig } from "../../configs/styling.config"
import { PieChart } from "react-native-gifted-charts"

type ViewSavingsGoalProps = {
    route: RouteProp<RootStackPropsList, 'ViewSavingsGoal'>,
    navigation: StackNavigationProp<RootStackPropsList, 'ViewSavingsGoal'>,
}

export const ViewSavingsGoalScreen = ({ route, navigation }: ViewSavingsGoalProps) => {
    const { savingsGoal } = route.params;

    const savedPercentage = (savingsGoal.savedAmount / savingsGoal.targetAmount) * 100;
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
        <View style={styles.container}>
            <Subheader style={{ color: stylingConfig.colors.text.textPrimary, fontSize: 22, marginBottom: 50 }}>{savingsGoal.name}</Subheader>
            <PieChart
                data={chartData}
                radius={130}
                innerRadius={90}
                centerLabelComponent={() => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Header2>{Math.floor(savedPercentage)}%</Header2>
                            <View style={{ flexDirection: 'row' }}>
                                <Paragraph style={{ color: stylingConfig.colors.primary, fontFamily: stylingConfig.fontWeight.medium }}>${savingsGoal.savedAmount} </Paragraph>
                                <Paragraph> / {savingsGoal.targetAmount}</Paragraph>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{ flexDirection: 'row', gap: 50, marginTop: 150 }}>
                <TouchableOpacity 
                    style={styles.navigationButtons}
                    onPress={() => navigation.goBack()}
                >
                    <Paragraph style={styles.navigationButtonsText}>Back</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.navigationButtons, 
                            { 
                                backgroundColor: stylingConfig.colors.secondaryVar 
                            }
                        ]}
                    // @ts-ignore
                    onPress={() => navigation.navigate('EditSavingsGoal')}
                >
                    <Paragraph style={[styles.navigationButtonsText, { color: stylingConfig.colors.text.textLight }]}>Edit</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: stylingConfig.colors.background,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: '5%',
        flex: 1,
    },
    navigationButtons: {
        backgroundColor: stylingConfig.colors.background,
        shadowColor: stylingConfig.colors.shadow,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowRadius: 4,
        paddingVertical: 20,
        width: 120,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationButtonsText: {
        fontSize: stylingConfig.fontSizes.h4,
        color: stylingConfig.colors.text.textPrimary,
        fontFamily: stylingConfig.fontWeight.medium
    }
})