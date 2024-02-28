import { Component } from "react";
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { LinearGradient, Stop } from 'react-native-svg';

type GradientLineChartProps = {
    height: number,
    width: number,
    chartData: Array<lineDataItem>,
    chartData2?: Array<lineDataItem>,
    options?: {},
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
        endSpacing={0}
        noOfSections={12}
        data={props.chartData}
        data2={props.chartData2 ? props.chartData2 : []}
        adjustToWidth={true}
        hideDataPoints
        curved
        curvature={.15}
        isAnimated
        animationDuration={500}
        thickness={3}
        hideRules
        hideYAxisText
        hideAxesAndRules
        disableScroll
        xAxisLength={props.width}
        xAxisIndicesHeight={5}
        xAxisIndicesWidth={1}
        xAxisIndicesColor='white'
        xAxisLabelTextStyle={{color: 'white'}}
    />
    )
}