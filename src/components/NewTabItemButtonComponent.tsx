import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RootStackPropsList } from "../storage/StackParams";
import { StackNavigationProp } from "@react-navigation/stack";

type NewTabItemProps = {
    tabTypeId: number,
    navigation: StackNavigationProp<RootStackPropsList>,
}

export const NewTabItemButton = (props: NewTabItemProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('CreateEntity', {startTab: props.tabTypeId})}
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