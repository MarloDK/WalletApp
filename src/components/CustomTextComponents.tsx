import { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { stylingConfig } from "../configs/styling.config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../storage/StackParams";
import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";
import { Link } from "@react-navigation/native";

type TextProps = {
    fontWeight?: string,
    style?: {},
    children?: any,
}

export const Header = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textLight,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.semiBold,
                fontSize: stylingConfig.fontSizes.h1,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

export const Subheader = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textLight,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.semiBold,
                fontSize: stylingConfig.fontSizes.sh,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

export const Header2 = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textPrimary,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.medium,
                fontSize: stylingConfig.fontSizes.h2,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

export const Header3 = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textPrimary,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.medium,
                fontSize: stylingConfig.fontSizes.h3,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

export const Header4 = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textPrimary,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.medium,
                fontSize: stylingConfig.fontSizes.h4,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

export const Paragraph = (props: TextProps) => {
    return (
        <Text style={[
            {
                color: stylingConfig.colors.text.textSecondary,
                fontFamily: props.fontWeight ? props.fontWeight : stylingConfig.fontWeight.light,
                fontSize: stylingConfig.fontSizes.p,
            }, 
            props?.style
            
        ]}>
            {props?.children}
        </Text>
    )
}

type LinkProps = {
    to: To
    style?: {}
    children?: any
}

export const CustomLink = (props: LinkProps) => {
    return (
        <Link
            to={props.to}
            style={[
                {
                    color: stylingConfig.colors.text.link,
                    fontFamily: stylingConfig.fontWeight.light,
                    fontSize: stylingConfig.fontSizes.p,
                }, 
                props?.style   
            ]}
        >
            {props?.children}
        </Link>
    )
}