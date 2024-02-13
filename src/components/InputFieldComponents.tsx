import React, { useRef, useState } from "react";
import { AppText, AppTextSecondary } from "./CustomTextComponents";
import { KeyboardTypeOptions, StyleSheet, TextInput, TextInputTextInputEventData, TouchableOpacity, View } from "react-native";

type InputFieldProps = {
    name: string,
    maxLength?: number,
    placeholder?: string,
    suffix?: string,
    flex?: number,
    onValueChange?: (text: string) => void,
    keyboardType?: KeyboardTypeOptions,
}

export const InputField = (props: InputFieldProps) => {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, props.flex ? {flex: props.flex} : {}]}>
            <AppText style={styles.name}>{props.name}</AppText>
            <TouchableOpacity 
                style={[styles.inputFieldWrapper, inputRef.current?.isFocused() === true  ? {borderColor: '#334056'} : {borderColor: '#202B3F'}]}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
            >
                <TextInput 
                    ref={inputRef}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#202B3F'}
                    onChangeText={(text: string) => props.onValueChange}
                    style={styles.inputField}
                    keyboardType={props.keyboardType}
                    returnKeyType={'done'}
                    maxLength={props.maxLength ? props.maxLength : 20}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <AppTextSecondary style={styles.suffix}>{props.suffix}</AppTextSecondary>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
    name: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        marginBottom: 10,
    },
    inputFieldWrapper: {
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
    },
    inputField: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        alignSelf: 'stretch',
        height: '100%',
        color: '#FFF',
    },
    suffix: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        color: '#202B3F',
        paddingLeft: 15,
    }
});