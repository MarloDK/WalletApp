import { StyleSheet, TouchableOpacity } from "react-native"
import { Tab } from "./CustomTabNavigator"
import { AppText, AppTextSecondary } from "./CustomTextComponents"

export const CustomTabNavButton = (props: {title: string, activeTab: Tab, thisTab: Tab, navigateToTab: Function}) => {
    const getButton = () => {
        const tabFocused = props.activeTab === props.thisTab;
        if (tabFocused) {
            return (
                <AppText style={styles.activeButton}>
                    {props.title}
                </AppText>
            )
        }
        return (
            <AppTextSecondary style={styles.button}>
                {props.title}
            </AppTextSecondary>
        )
    }

    return (
        <TouchableOpacity 
            onPress={() => props.navigateToTab(props.thisTab)}
        >
            {getButton()}
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 12,
        textAlign: 'center',
    },
    activeButton: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    }
});