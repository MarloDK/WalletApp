import { StyleSheet, View } from "react-native"
import { AppText } from "./CustomTextComponents"
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { LinearGradient, Stop } from 'react-native-svg';
import { GradientLineChart } from "./GradientChartComponent";
import { formatNumber } from "../utils/NumberFormatter";

type OverviewWithGraphProps = {
    title: string,
    value: number,
    maxFractions?: number,
    chartData: Array<lineDataItem>,
}

export const OverviewWithGraph = (props: OverviewWithGraphProps) => {
    return (
        <View style={[styles.container]}>
            <AppText style={styles.overviewTitle}>{props.title}</AppText>
            <AppText style={styles.overviewValue}>{formatNumber(props.value, 'da-dk', props.maxFractions)} DKK</AppText>
            <View style={{marginLeft: -30}}>
                <GradientLineChart 
                    height={40}
                    width={100}
                    chartData={props.chartData}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202B3F',
        paddingTop: 20,
        paddingBottom: 0,
        paddingHorizontal: 25,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'baseline',
        width: 175,
        borderRadius: 20,
    },
    overviewTitle: {
        fontSize: 12,
    },
    overviewValue: {
        fontSize: 18,
        fontFamily: 'Inter_500Medium',
        marginBottom: 5,
    },
});