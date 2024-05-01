import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { stylingConfig } from "../../configs/styling.config";
import { Header2, Paragraph } from "../CustomTextComponents";

export const InstanceCreator = ({ title, submitText, isVisible, children, onClose, onSubmit }: any) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={modalStyle.content}>
                <View style={modalStyle.header}>
                    <Header2>{title}</Header2>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color={stylingConfig.colors.text.textPrimary} size={22} />
                    </Pressable>
                </View>
                <View style={modalStyle.inputFields}>
                    {children}
                </View>
                <TouchableOpacity onPress={onSubmit} style={modalStyle.submitButton}>
                    <Paragraph style={modalStyle.submitButtonText}>{submitText}</Paragraph>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const modalStyle = StyleSheet.create({
    content: {
        height: '95%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    inputFields: {
        paddingHorizontal: '5%',
        flexDirection: 'column',
        gap: 20,
    },
    submitButton: {
        paddingTop: 100,
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        fontSize: stylingConfig.fontSizes.h4,
        color: stylingConfig.colors.text.link,
        fontFamily: stylingConfig.fontWeight.medium,
        textDecorationLine: "underline",
    }
});