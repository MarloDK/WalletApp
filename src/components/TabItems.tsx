import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { AppText, AppTextSecondary } from "./CustomTextComponents"
import { Tab } from "../storage/TabEnum";
import { formatNumber } from "../utils/NumberFormatter";

type TabItemProps = {
    tabType: Tab,
    name: string,
    imageSource: any,
    value: number,
    description: string,
    secondaryDescription?: string,
    key: number,
}

export const TabItem = (props: TabItemProps) => {
    const getTabItemIcon = () => {
        const tabItemIcon = props.imageSource;

        // <Icon /> is a function
        if (typeof tabItemIcon.type === 'function') {
            return tabItemIcon;
        }
        else {
            return <Image source={tabItemIcon} style={styles.image}/>
        }
    }

    const buildSecondaryDescription = () => {
        switch (props.tabType) {
            case Tab.ACCOUNTS:
                let toNumber = Number(props.secondaryDescription);
                if (!toNumber)
                    break;

                return (
                    <AppTextSecondary 
                        style={[
                            styles.description,
                            toNumber < 0 ? styles.red : {}
                        ]}
                    >
                        {formatNumber(toNumber)} DKK
                    </AppTextSecondary>
                )

            case Tab.SUBSCRIPTIONS:
                return (
                    <AppTextSecondary style={styles.description}>
                        {props.secondaryDescription}
                    </AppTextSecondary>
                )

            case Tab.LOANS:
                return (
                    <AppTextSecondary style={styles.description}>
                        {props.secondaryDescription} DKK
                    </AppTextSecondary>
                )
        
            default:
                return (
                    <AppTextSecondary style={styles.description}>
                        Noge gik galt
                    </AppTextSecondary>
                );
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
        >
            <View style={styles.circle}>
                {getTabItemIcon()}
            </View>
            
            <View style={styles.infoWrapper}>
                <View style={styles.infoContainer}>
                    <AppText style={styles.header}>{props.name}</AppText>
                    <AppText style={styles.header}>{formatNumber(props.value)} DKK</AppText>
                </View>
                <View style={styles.infoContainer}>
                    <AppTextSecondary style={styles.description}>{props.description}</AppTextSecondary>
                    {buildSecondaryDescription()}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202B3F',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 15,
    },
    circle: {
        borderRadius: 20,
        width: 40,
        height: 40,  
        marginRight: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#334056',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
        fontWeight: '400',
    },
    red: {
        color: '#FF5A5A',
        fontSize: 12,
    }
});