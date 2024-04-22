import React, { useRef, useState } from "react";
import { Header2, Header3, Paragraph } from "./CustomTextComponents";
import { KeyboardTypeOptions, StyleSheet, TextInput, TextInputTextInputEventData, TouchableOpacity, View } from "react-native";
import { stylingConfig } from "../configs/styling.config";

type InputFieldProps = {
    name: string,
    value: string | number,
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

    if (typeof props.value === "number") {
        props.value = props.value.toString();
    }

    const returnSafeInput = (input: string) => {
        if (!props.onValueChange) {
            return;
        }

        if (typeof props.value === 'string') {
            return props.onValueChange(input.toString());
        }

        let inputAsNum = parseInt(input);
        if (Number.isNaN(inputAsNum)) {
            input = '';
        }

        props.onValueChange(input.toString());
    }
    return (
        <View style={[styles.container, props.flex ? {flex: props.flex} : {}]}>
            <Header2 style={styles.name}>{props.name}</Header2>
            <TouchableOpacity 
                style={[styles.inputFieldWrapper, inputRef.current?.isFocused() === true  ? {borderColor: stylingConfig.colors.secondaryVar} : {borderColor: stylingConfig.colors.divider}]}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
            >
                <TextInput 
                    ref={inputRef}
                    placeholder={props.placeholder}
                    placeholderTextColor={stylingConfig.colors.divider}
                    onChangeText={(text: string) => returnSafeInput(text)}
                    value={props.value.toString()}
                    style={styles.inputField}
                    keyboardType={props.keyboardType}
                    returnKeyType={'done'}
                    maxLength={props.maxLength ? props.maxLength : 20}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Paragraph style={styles.suffix}>{props.suffix}</Paragraph>
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
        fontFamily: stylingConfig.fontWeight.light,
        alignSelf: 'stretch',
        height: '100%',
        color: stylingConfig.colors.text.textSecondary,
    },
    suffix: {
        fontSize: 12,
        fontFamily: stylingConfig.fontWeight.medium,
        color: '#202B3F',
        paddingLeft: 15,
    }
});