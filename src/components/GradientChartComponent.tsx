import { Component } from "react";
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { LinearGradient, Stop } from 'react-native-svg';

type GradientLineChartProps = {
    height: number,
    width: number,
    chartData: Array<lineDataItem>,
}

export const GradientLineChart = (props: GradientLineChartProps) => {
    return (
        <LineChart
        height={props.height}
        width={props.width}
        lineGradient
        lineGradientId="ggrd"
        lineGradientComponent={() => {
            return (
                <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={'#0057FF'} />
                    <Stop offset="1" stopColor={'#00C2FF'} />
                </LinearGradient>
            )
        }}
        initialSpacing={12}
        data={props.chartData}
        adjustToWidth={true}
        hideDataPoints
        curved
        curvature={.15}
        isAnimated
        thickness={3}
        hideRules
        hideYAxisText
        hideAxesAndRules
        disableScroll
        xAxisLength={props.width}
    />
    )
}