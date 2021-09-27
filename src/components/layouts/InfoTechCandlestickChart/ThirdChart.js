import React, { useRef } from 'react';
import * as d3 from 'd3';
import { TechMainContainer, TechMainLeft, TechMainTitle, TechMainTitleContainer, TechMainH4, TechMainSvg, SecondSvg } from './Styled';
import { connect } from 'react-redux';
import './candlestick.css';

const ThirdChart = ({ price }) => {

    const datas = price && price.price && price.price.slice(-80)
    const lastData = datas.slice(-1)
    const lastSecondData = datas[datas.length - 2]
    const tooltipDatas = price.price.slice(-81)
    datas[-1] = tooltipDatas[0]

    const thirdSvgRef = useRef();
    const svg = d3.select(thirdSvgRef.current)
    const width = 990;
    const height = 163;

    const margin = { top: 0, left: 10, bottom: 0, right: 70 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const g = svg.append('g').attr('class', 'gBackground').attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3.scaleBand()
        .domain(datas.map(d => d.Date))
        .range([0, innerWidth])
        .padding(0.5)
    // console.log(d3.min(0, datas.slowj))
    console.log(d3.min(datas, d => d.slowj))
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0])

    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => { return !((i + 1) % 21) })).tickSize(-innerHeight)
    const yAxis = d3.axisRight(yScale).tickValues([0, 20, 50, 80, 100]).tickSize(-innerWidth)
    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

    const k = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.slowk))
    const d = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.slowd))
    const renderPath = (strokeColor, lineGenerator) => {
        g.append('path')
            .datum(datas)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', strokeColor)
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator)
    }
    console.log(datas, 'datas')
    renderPath('steelblue', k)
    renderPath('#FF9800', d)

    g.selectAll('.domain').attr('stroke', '#999999').attr('stroke-width', '2px')
    g.selectAll('.tick line').attr('class', 'candlestick-grid').attr('stroke-dasharray', '8px').attr('stroke', '#616161').attr('stroke-width', '1.5px')
    yAxisG.select('.tick line').remove()
    yAxisG.select('.tick:last-child line').remove()
    xAxisG.selectAll('.tick text').attr('transform', `translate(0, 10)`)
    yAxisG.selectAll('.tick text').attr('transform', `translate(${margin.right - 35}, 0)`)
    yAxisG.select('.tick text').attr('transform', `translate(${margin.right - 35}, -8)`)
    yAxisG.select('.tick:last-of-type text').attr('transform', `translate(${margin.right - 35}, 8)`)



    return (
        <TechMainContainer>
            <TechMainLeft>
                {
                    lastData.map((item, index) => {
                        return (
                            <TechMainTitleContainer>
                                <TechMainTitle>KD</TechMainTitle>
                                <TechMainH4 fontSize={'14px'} color={'steelblue'}>KVALUE: {item.slowk.toFixed(2)}</TechMainH4>
                                <TechMainH4 fontSize={'14px'} color={'#FF9800'}>DVALUE: {item.slowd.toFixed(2)}</TechMainH4>
                            </TechMainTitleContainer>
                        )
                    })
                }
            </TechMainLeft>
            <TechMainSvg>
                <SecondSvg ref={thirdSvgRef} />
            </TechMainSvg>
        </TechMainContainer>
    )
};

const mapStateToProps = state => {
    return {
        price: state.price,
    }
}

export default connect(mapStateToProps,)(ThirdChart);