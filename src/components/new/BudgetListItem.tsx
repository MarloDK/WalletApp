import { TouchableOpacity, View } from "react-native"
import { Expense } from "../../storage/classes/ExpenseClass";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../../storage/StackParams";
import { stylingConfig } from "../../configs/styling.config";
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass";
import { Header4, Paragraph } from "../CustomTextComponents";

type BudgetListItemProps = {
    item: Expense | SavingsGoal;
    navigation: StackNavigationProp<RootStackPropsList>;
}

export const BudgetListItem = (props: BudgetListItemProps) => {
    let progressBarPercentage = 0;
    if (props.item instanceof Expense) {
        progressBarPercentage = (props.item.currentlySpent / props.item.allocated) * 100;
    } else if (props.item instanceof SavingsGoal) {
        progressBarPercentage = (props.item.savedAmount / props.item.targetAmount) * 100;
    }

    let total = props.item instanceof Expense ? props.item.allocated : props.item.targetAmount;

    

    return (
        <TouchableOpacity
            style={{
                width: '100%',
                paddingVertical: 20,
                flexDirection: 'column',
                gap: 10,
            }}
            onPress={() => console.log("props.navigation.navigate('ViewAccount', { account: props.account })")}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <Header4>{props.item.name}</Header4>
                <Header4 style={{ color: stylingConfig.colors.primary }}>${total}</Header4>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <View style={{ 
                    width: 250,
                    height: 5,
                    backgroundColor: stylingConfig.colors.surface
                }}>
                    <View style={{
                        width: `${progressBarPercentage}%`,
                        height: 5,
                        backgroundColor: stylingConfig.colors.primary,
                    }} />
                </View>


                <Paragraph style={{ color: stylingConfig.colors.text.textSecondary }}>
                    {
                        props.item instanceof Expense ? `$${Math.round(props.item.allocated - props.item.currentlySpent)} Left` : `${progressBarPercentage}%`
                    }
                </Paragraph>
            </View>
        </TouchableOpacity>
    )
}