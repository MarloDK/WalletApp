import { TouchableOpacity } from "react-native"
import { stylingConfig } from "../../configs/styling.config"
import { FontAwesome6 } from "@expo/vector-icons"

export const CreateNewButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity
                    style={{
                        position: 'absolute',
                        backgroundColor: stylingConfig.colors.secondary,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        top: '75%',
                        left: '80%',
                        shadowColor: stylingConfig.colors.shadow,
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => onPress()}
                >
                    <FontAwesome6 name="add" size={25} color="white" />
                </TouchableOpacity>
    )
}