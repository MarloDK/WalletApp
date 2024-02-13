import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { AppText } from "./CustomTextComponents";

type CustomTabNavigatorProps = {
    tabButtons: Array<string>,
    tabScreens: Array<JSX.Element>,
    tabStart?: number,
    onTabChange?: Function,
    style?: {},
    tabButtonsContainerStyle?: {},
    activeTabButtonStyle?: {},
    activeTabButtonTextStyle?: {},
    inactiveTabButtonStyle?: {},
    inactiveTabButtonTextStyle?: {},
}
/**
 * Creates a custom tab navigator
 * 
 * Important! The tab button's index directly corresponds to the index of its associated tab screen.
 * @param tabButtons Array of strings containing the text data for each tab button in the navigator.
 * @param tabScreens Array of React elements representing the screens the tab buttons refer to.
 * @param onTabChange? Function to call whenever the active tab screen changes. Passes the index of the current tab screen as a variable.
 * @param style? Styling for the general component.
 * @param tabButtonsContainerStyle? Styling for the container of all tab buttons.
 * @param activeTabButtonStyle? Styling for the active tab button.
 * @param activeTabButtonTextStyle? Styling for the active tab button text.
 * @param inactiveTabButtonStyle? Styling for all inactive tab buttons.
 * @param inactiveTabButtonTextStyle? Styling for all text inside inactive tab buttons.
 * 
 */
export const NewCustomTabNavigator = (props: CustomTabNavigatorProps) => {
    const [activeTabScreen, setActiveTabScreen] = useState(0);

    const navigateToTabScreen = (tabScreenIndex: number) => {
        setActiveTabScreen(tabScreenIndex);

        if (props.onTabChange) {
            props.onTabChange(tabScreenIndex, props.tabButtons[tabScreenIndex]);
        }
    }

    const renderTabButtons = () => {
        let tabButtons: any = [];

        props.tabButtons.forEach((tabButton, index) => {
            if (activeTabScreen === index) {
                // Active button
                tabButtons.push(
                    <TouchableOpacity
                        key={index}
                        style={[styles.activeButtonDefault, props.activeTabButtonStyle]}
                        onPress={() => navigateToTabScreen(index)}
                    >
                        <AppText style={[styles.activeButtonTextDefault, props.activeTabButtonTextStyle]}>{tabButton}</AppText>
                    </TouchableOpacity>
                )

            } else {
                // Inactive button
                tabButtons.push(
                    <TouchableOpacity
                        key={index}
                        style={[styles.inactiveButtonDefault, props.inactiveTabButtonStyle]}
                        onPress={() => navigateToTabScreen(index)}
                    >
                        <AppText style={[styles.inactiveButtonTextDefault, props.inactiveTabButtonTextStyle]}>{tabButton}</AppText>
                    </TouchableOpacity>
                )
            }
        });

        return tabButtons;
    }

    const renderTabScreen = () => {
        return props.tabScreens[activeTabScreen];
    }

    if (props.tabStart && props.tabStart <= props.tabScreens.length) {
        navigateToTabScreen(props.tabStart);
    }

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.buttonsContainerDefault, props.tabButtonsContainerStyle]}>
                {renderTabButtons()}
            </View>
            {renderTabScreen()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonsContainerDefault: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 10,
    },
    activeButtonDefault: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    activeButtonTextDefault: {
        fontSize: 12,
        color: '#FFFFFF',
    },
    inactiveButtonDefault: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    inactiveButtonTextDefault: {
        fontSize: 12,
        color: '#647087',
    }
});