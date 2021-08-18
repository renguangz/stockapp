import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as techan from 'techan';
import { event as currentEvent } from 'd3-selection';

const CandleStickChart = () => {

    const candlestickRef = useRef()

    useEffect(() => {
        // 設定畫圖的width, height
        const margin = { top: 20, right: 50, bottom: 30, left: 50 }
        const width = 960 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom

        // 設定parse資料時間的格式，範例資料為 9-Jun-14
        const parseDate = d3.timeParse('%d-%b-%y')
        // 使用techan這個framework拉出以時間為基準的x
        const x = techan.scale.financetime()
            .range([0, width])

        // 設定y，範圍在0 ~ height之間
        const y = d3.scaleLinear()
            .range([height, 0])

        //設定k線圖
        const candlestick = techan.plot.candlestick()
            .xScale(x)
            .yScale(y)
        
        // 設定x,y 軸
        const xAxis = d3.axisBottom(x)
        const xTopAxis = d3.axisTop(x)
        const yAxis = d3.axisLeft(y)
        const yRightAxis = d3.axisRight(y)

        // 設定十字線左右邊要顯示的文字，根據不同的軸線(yAxis, yRightAxis)來決定
        const ohlcAnnotation = techan.plot.axisannotation()
            .axis(yAxis)
            .orient('left')
            .format(d3.format(',.2f'))

        const ohlcRightAnnotation = techan.plot.axisannotation()
            .axis(yRightAxis)
            .orient('right')
            .translate([width, 0])

        // 設定十字線上下顯示的時間
        const timeAnnotation = techan.plot.axisannotation()
            .axis(xAxis)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d')) // 顯示日期的格式 2019-03-19
            .width(65)
            .translate([0, height]);

        const timeTopAnnotation = techan.plot.axisannotation()
            .axis(xTopAxis)
            .orient('top')

        // 設定十字線
        const crosshair = techan.plot.crosshair()
            .xScale(x)
            .yScale(y)
            .xAnnotation([timeAnnotation, timeTopAnnotation])
            .yAnnotation([ohlcAnnotation, ohlcRightAnnotation])
            // .on("enter", enter) // 設定滑鼠移動過去時要呼叫的function
            // .on("out", out)
            // .on("move", move);

        //設定畫圖區域
        // const svg = d3.select(candlestickRef.current)
        //     .attr('width', width + margin.left + margin.right)
        //     .attr('height', height + margin.top + margin.bottom)
        //     .append('g')
        //     .attr('transform', `translate(${margin.left}, ${margin.top})`)

        //設定右上角顯示的日期以及股價

    }, [])

    return (
        <div>
            <svg ref={candlestickRef}></svg>
        </div>
    )
};

export default CandleStickChart;