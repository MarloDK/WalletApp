import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native"
import { RootStackPropsList } from "../../storage/StackParams";
import { stylingConfig } from "../../configs/styling.config";

type BudgetScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Budget'>;
}

export const BudgetScreen = (props: BudgetScreenProps) => {
    return (
        <View style={styles.appWrapper}>
            <View style={styles.headerExtension}>

            </View>
            <View style={styles.container}>

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
        height: 60,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
})