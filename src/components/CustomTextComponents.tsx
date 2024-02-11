import { Component } from "react";
import { StyleSheet, Text } from "react-native";

type TextProps = {
    style?: {},
    children?: any,
}

export const AppText = (props: TextProps) => {
    return (
        <Text style={[styles.primaryText, props?.style]}>
            {props?.children}
        </Text>
    )
}

export const AppTextSecondary = (props: TextProps) => {
    return (
        <Text style={[styles.secondaryText, props?.style]}>
            {props?.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    primaryText: {
        fontFamily: 'Inter_400Regular',
        color: '#FFF',
    },
    secondaryText: {
        fontFamily: 'Inter_400Regular',
        color: '#647087',
    }
});