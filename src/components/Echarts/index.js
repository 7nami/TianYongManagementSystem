// 封装Echarts逻辑
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 有坐标系的
const axisOptions = {
    // 图例文字颜色
    textStyle: {
        color: '#333'
    },
    // 提示框
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: "category",
        data: [],
        axisLine: {
            lineStyle: {
                color: '#17b3a3'
            },
        },
        axisLabel: {
            color: '#333',
            interval: 0,
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: '#17b3a3'
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb988", "#d87a80", "#8d98b3"],
    series: [],
}

// 无坐标系的
const normalOption = {
    tooltip: {
        trigger: "item",
    },
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
}

const Echarts = ({ style, chartData, isAxisChart = true }) => {
    // 获取dom实例
    const echartsRef = useRef(null);
    // 创建响应式变量，不让当前页面重新渲染
    let echartObj = useRef(null);
    useEffect(() => {
        console.log("chartData in Echarts component:", chartData); // 打印传入的数据
        let options =
            // 初始化echarts实例
            echartObj.current = echarts.init(echartsRef.current)
        // 设置option
        if (isAxisChart) {
            // 设置x轴
            axisOptions.xAxis.data = chartData.xData
            axisOptions.series = chartData.series
            options = axisOptions
        } else {
            normalOption.series = chartData.series
            options = normalOption
        }
        echartObj.current.setOption(options)
    }, [chartData])

    return (
        <div style={style} ref={echartsRef}></div>
    )
}

export default Echarts;