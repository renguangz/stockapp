import React, { useRef } from 'react';
import * as d3 from 'd3';
import './candlestick.css';
import { TechMainContainer, TechMainLeft, TechMainTitle, TechMainTitleContainer, TechMainH4, TechMainSvg, SecondSvg } from './Styled';
import { connect } from 'react-redux';
import * as Storage from '../../helper/StorageHelper';

const SecondChart = ({ price }) => {

    const datas = price && price.price && price.price.slice(-80)
    const lastData = datas.slice(-1)
    const lastSecondData = datas[datas.length - 2]
    const tooltipDatas = price.price.slice(-81)
    datas[-1] = tooltipDatas[0]


    const secondSvgRef = useRef();
    const svg = d3.select(secondSvgRef.current)
    const width = 990
    const height = 163

    const margin = { top: 0, left: 10, bottom: 0, right: 70 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const g = svg.append('g').attr('class', 'gBackground').attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3.scaleBand()
        .domain(datas.map(d => d.Date))
        .range([0, innerWidth])
        .padding(0.5)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(datas, d => d.Volume) * 1.1])
        .range([innerHeight, 0])

    const yAxisArray = [yScale.domain()[0], yScale.domain()[0] + (yScale.domain()[1] - yScale.domain()[0]) / 3, yScale.domain()[0] + ((yScale.domain()[1] - yScale.domain()[0]) / 3 * 2), yScale.domain()[1]]
    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (d, i) { return !((i + 1) % 21) })).tickSize(-innerHeight)
    const yAxis = d3.axisRight(yScale).tickValues(yAxisArray).tickSize(-innerWidth)
    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

    g.selectAll('rect')
        .data(datas, d => d.Date)
        .enter()
        .append('rect')
        .attr('class', (d, i) => (datas[i].Close > datas[i - 1].Close) ? 'redColor' : datas[i].Close === datas[-1].Close ? 'whiteColor' : 'greenColor')
        .attr('x', d => xScale(d.Date))
        .attr('y', d => yScale(d.Volume))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(0) - yScale(d.Volume))

    // path ma
    const pathMa5 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.volumeMa5))
        .curve(d3.curveBasis)
    const pathMa10 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.volumeMa10))
        .curve(d3.curveBasis)
    const pathMa20 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.volumeMa20))
        .curve(d3.curveBasis)

    const renderMa = (strokeColor, lineGenerator) => {
        g.append('path')
            .datum(datas)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', strokeColor)
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator)
    }
    renderMa('steelblue', pathMa5)
    renderMa('#FF9800', pathMa10)
    renderMa('#9526AD', pathMa20)

    g.selectAll('.domain').attr('stroke', '#999999').attr('stroke-width', '2px')
    g.selectAll('.tick line').attr('class', 'candlestick-grid').attr('stroke-dasharray', '8px').attr('stroke', '#616161').attr('stroke-width', '1.5px')
    yAxisG.select('.tick line').remove()
    yAxisG.select('.tick:last-child line').remove()
    xAxisG.selectAll('.tick text').attr('transform', `translate(0, 10)`)
    yAxisG.selectAll('.tick text').attr('transform', `translate(${margin.right - 35}, 0)`)
    yAxisG.select('.tick text').attr('transform', `translate(${margin.right - 35}, -8)`)
    yAxisG.select('.tick:last-of-type text').attr('transform', `translate(${margin.right - 35}, 8)`)

    const maRef = useRef();
    const firstMa = useRef();
    const secondMa = useRef();
    const thirdMa = useRef();

    const ma5Tooltip = d3.select(firstMa.current)
    const ma10Tooltip = d3.select(secondMa.current)
    const ma20Tooltip = d3.select(thirdMa.current)

    // cross hair
    const transRect = g
        .datum(datas, d => d.Date)
        .append('rect')
        .attr('class', 'secondTrans')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', 'yellow')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('opacity', 0)
    const verticalLine = g.append('line')
        .attr('class', 'secondVerLine')
        .attr('opacity', 0)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')
    const horizontalLine = g.append('line')
        .attr('class', 'secondHorLine')
        .attr('opacity', 0)
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')

    transRect.on('mousemove', (event, data) => {
        const mousex = d3.pointer(event, this)[0]
        const mousey = d3.pointer(event)[1]

        const xEachband = xScale.step()
        const index = Math.floor(mousex / xEachband)
        const xValue = xScale.domain()[index] // 輸出 cross hair 的正確日期
        const dataIndex = datas[index] // 輸出對應日期的 object
        const lastDayData = datas[index - 1]

        verticalLine.attr('x1', xScale(xValue) + xScale.bandwidth() / 2).attr('x2', xScale(xValue) + xScale.bandwidth() / 2).attr('opacity', 1)
        dataIndex && dataIndex.Volume && horizontalLine.attr('y1', yScale(dataIndex.Volume)).attr('y2', yScale(dataIndex.Volume)).attr('opacity', 1)

        dataIndex && dataIndex.volumeMa5 && ma5Tooltip.html(`MA5: ${dataIndex.volumeMa5.toFixed(0)}`)
        dataIndex && dataIndex.volumeMa10 && ma10Tooltip.html(`MA10: ${dataIndex.volumeMa10.toFixed(0)}`)
        dataIndex && dataIndex.volumeMa20 && ma20Tooltip.html(`MA20: ${dataIndex.volumeMa20.toFixed(0)}`)
    }).on('mouseout', () => {
        verticalLine.attr('opacity', 0)
        horizontalLine.attr('opacity', 0)

        lastData.map(item => {
            // const lastDay
            ma5Tooltip.html(`MA5: ${item.volumeMa5.toFixed(0)}`)
            ma10Tooltip.html(`MA10: ${item.volumeMa10.toFixed(0)}`)
            ma20Tooltip.html(`MA20: ${item.volumeMa20.toFixed(0)}`)
        })
    })

    return (
        <TechMainContainer>
            <TechMainLeft>
                {
                    lastData.map((item, index) => {
                        return (
                            <TechMainTitleContainer key={index}>
                                <TechMainTitle>成交量</TechMainTitle>
                                <TechMainH4 ref={firstMa} color={'steelblue'} fontSize={'12px'} >MA5: {item.volumeMa5.toFixed(0)}</TechMainH4>
                                <TechMainH4 ref={secondMa} color={'#FF9800'} fontSize={'12px'} >MA10: {item.volumeMa10.toFixed(0)}</TechMainH4>
                                <TechMainH4 ref={thirdMa} color={'#9526AD'} fontSize={'12px'} >MA20: {item.volumeMa20.toFixed(0)}</TechMainH4>
                            </TechMainTitleContainer>
                        )
                    })
                }
            </TechMainLeft>
            <TechMainSvg>
                <SecondSvg ref={secondSvgRef} />
            </TechMainSvg>
        </TechMainContainer>
    )
};

const mapStateToProps = state => {
    return {
        price: state.price,
    }
}

export default connect(mapStateToProps,)(SecondChart);