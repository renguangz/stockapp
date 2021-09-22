import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './InfoTableChart.css';
import { connect } from 'react-redux';
import { fetchBasic } from '../../redux';
import useResponsive from '../common/useResponsive';

const InfoTableChart = ({ basic }) => {
    const d3Chart = useRef();
    // 營業收入: benefit_total, 毛利率: (benefit_total - cost_total) / benefit_total * 100
    const incomeDisplay = basic.income.slice(-4)
    const grossMargin = [] // 毛利率array
    const operating_income = [] // 營業收入 array
    incomeDisplay.map(data => {
        operating_income.push(data.benefit_total / 1000000)
        grossMargin.push(parseInt(((data.benefit_total - data.cost_total) / data.benefit_total * 100).toFixed(0)))
    })

    useEffect(() => {
        const margin = { top: 10, right: 20, bottom: 8, left: 30 }
        const chartWidth = parseInt(d3.select('#d3chart').style('width'))
        const chartHeight = parseInt(d3.select('#d3chart').style('height')) - margin.top - margin.bottom

        const svg = d3.select(d3Chart.current)
            .attr('width', chartWidth + margin.left + margin.right)
            .attr('height', chartHeight + margin.top + margin.bottom)

        // date data
        const xAxisData = ['Q1', 'Q2', 'Q3', 'Q4']
        const x = d3.scaleBand()
            .domain(d3.range(xAxisData.length))
            .range([margin.left, chartWidth - margin.right])
            .padding(0.5)
        svg.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .attr('class', 'xAxis')
            .call(d3.axisBottom(x).tickFormat(i => xAxisData[i]).tickSizeOuter(0))

        const max = d3.max(operating_income) * 1.1
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([chartHeight, margin.top])
        svg.append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(5).tickSizeInner(-chartWidth + margin.right + margin.left))

        const yRightMax = d3.max(grossMargin) + 20
        const yRight = d3.scaleLinear()
            .domain([0, yRightMax])
            .range([chartHeight, margin.top])
        svg.append('g')
            .attr('transform', `translate(${chartWidth - margin.right}, 0)`)
            .call(d3.axisRight(yRight).ticks(5).tickSize(0))

        // grid
        // svg.append('g')
        //     .attr('class', 'grid')
        //     .attr('width', chartWidth - margin.left - margin.right)
        //     .attr('height', chartHeight - margin.top - margin.bottom)
        //     .attr('transform', `translate(${margin.left}, 0)`)
        //     .call(d3.axisLeft().scale(yRight).tickSize(-chartWidth + margin.left + margin.right).tickFormat('').ticks(5))
        //     .style('color', 'grey')


        // tooltips
        const tooldiv = d3.select('#d3chart')
            .append('div')
            .style('visibility', 'hidden')
            .style('position', 'absolute')
            .style('border', '1px solid white')
            .style('color', 'white')
            .style('background-color', 'red')

        // draw bars    
        svg.append('g')
            .attr('fill', '#FE8473')
            .selectAll('rect')
            .data(operating_income)
            .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d))
            .attr('height', d => y(0) - y(d))
            .attr('width', x.bandwidth())
            .on('mouseover', (e, d) => {
                tooldiv.style('visibility', 'visible')
                    .text(`毛利率: 10% 營業收入: ${d.toFixed(0)}百萬`)
            })
            .on('mousemove', (e, d) => {
                tooldiv.style('top', (e.pageY - 50) + 'px')
                    .style('left', (e.pageX - 50) + 'px')
            })
            .on('mouseout', () => {
                tooldiv.style('visibility', 'hidden')
            })

        // draw line
        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => yRight(d))
        // .curve(d3.curveMonotoneX)
        svg.append('path')
            .datum(grossMargin)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line)
    }, [])

    const DrawChart = (leftAxisData, rightAxisData) => {
        const margin = { top: 10, right: 24, bottom: 8, left: 30 }
        const chartWidth = parseInt(d3.select('#d3chart').style('width'))
        const chartHeight = parseInt(d3.select('#d3chart').style('height')) - margin.top - margin.bottom

        const svg = d3.select(d3Chart.current)
            .attr('width', chartWidth + margin.left + margin.right)
            .attr('height', chartHeight + margin.top + margin.bottom)
        
        const xAxisData = ['Q1', 'Q2', 'Q3', 'Q4']
        const x = d3.scaleBand()
            .domain(d3.range(xAxisData.length))
            .range([margin.left, chartWidth - margin.right])
            .padding(0.5)
        svg.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(d3.axisBottom(x).tickFormat(i => xAxisData[i]).tickSizeOuter(0))

        const max = d3.max(leftAxisData) * 1.1
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([chartHeight, margin.top])
        svg.append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(3).tickSize(0))

        const yRightMax = d3.max(rightAxisData) + 20
        const yRight = d3.scaleLinear()
            .domain([0, yRightMax])
            .range([chartHeight, margin.top])
        svg.append('g')
            .attr('transform', `translate(${chartWidth - margin.right}, 0)`)
            .call(d3.axisRight(yRight).ticks(3).tickSize(0))

        // grid
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft().scale(y).tickSize(-chartWidth + margin.left + margin.right, 0).tickFormat('').ticks(3))
            .style('color', 'grey')

        // tooltips
        const tooldiv = d3.select('#d3chart')
            .append('div')
            .style('visibility', 'hidden')
            .style('position', 'absolute')
            .style('border', '1px solid white')
            .style('color', 'white')
            .style('background-color', 'red')

        // draw bars    
        svg.append('g')
            .attr('fill', 'purple')
            .selectAll('rect')
            .data(leftAxisData)
            .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d))
            .attr('height', d => y(0) - y(d))
            .attr('width', x.bandwidth())
            .on('mouseover', (e, d) => {
                tooldiv.style('visibility', 'visible')
                    .text(`毛利率: 10% 營業收入: ${d.toFixed(0)}百萬`)
            })
            .on('mousemove', (e, d) => {
                tooldiv.style('top', (e.pageY - 50) + 'px')
                    .style('left', (e.pageX - 50) + 'px')
            })
            .on('mouseout', () => {
                tooldiv.style('visibility', 'hidden')
            })

        // draw line
        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => yRight(d))
        // .curve(d3.curveMonotoneX)
        svg.append('path')
            .datum(rightAxisData)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line)
    }

    const { windowWidth, screenType } = useResponsive();

    return (
        <div id='d3chart'>
            <svg ref={d3Chart}></svg>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        basic: state.basic,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBasic: (stockid) => dispatch(fetchBasic(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoTableChart);