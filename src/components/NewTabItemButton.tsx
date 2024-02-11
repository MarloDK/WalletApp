import { StyleSheet, TouchableOpacity } from "react-native";
import { Tab } from "./CustomTabNavigator";
import { Ionicons } from '@expo/vector-icons';

type NewTabItemProps = {
    tabType: Tab,
}

export const NewTabItemButton = (props: NewTabItemProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
        >
            <Ionicons 
                name="add-circle-outline"
                size={30}
                color="#202B3F"
            />  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#202B3F',
        borderWidth: 2,

        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 15,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
});