import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Move_2330 from '../../data/move_2330.json';
import Move_bid from '../../data/move_bid.json';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import './stockMove.css';

import { row1, row2, row3 } from '../common/mocked_data/StockInfoMoving';
import { mockedRightRow1, mockedRightRow2, mockedRightRow3, mockedRightRow4 } from '../common/mocked_data/StockinfoRightTop';
import movingstock1 from '../images/mocked/movingstock1.png';
import mockedmoving from '../images/mocked/mockedmoving.png';
import movingstock2 from '../images/mocked/movingstock2.png';

const MovingContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
    display: flex;
`;

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const MovingLeft = styled.div`
    /* border: 1px solid greenyellow; */
    height: 100%;
    width: 64%;
    margin-right: 12px;
    margin-right: 2%;
`;

const LeftTop = styled.div`
    /* border: 1px solid pink; */
    width: 98%;
    height: 68%;
    /* margin: 4px auto; */
`;

const LeftBot = styled.div`
    /* border: 1px solid white; */
    width: 98%;
    height: 30%;
    margin: auto;
`;

const BotRow = styled.div`
    /* border: 1px solid goldenrod; */
    width: 100%;
    height: 28%;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BotItem = styled.div`
    /* border: 1px solid pink; */
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 0 8px;

`;

const BotItemTitle = styled.h2`
    color: white;
    margin: auto 0;
`;

const BotItemNum = styled.h2`
    color: white;
    margin: auto 0;
    color: ${props => props.fall === 'white' ? 'white' :
        props.fall ? 'green' : 'red'};
`;

const MovingRight = styled.div`
    /* border: 1px solid orange; */
    height: 100%;
    width: 34%;
`;

const RightTop = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
    height: 40%;
    margin-top: 4px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const TopCol = styled.div`
    /* border: 1px solid greenyellow; */
    /* height: 80%; */
    width: 24%;
    padding: 0 12px;
    text-align: ${props => props.textalign};
    font-size: 1rem;
    padding-bottom: 0;
`;

const ColNum = styled.h3`
    /* border: 1px solid white; */
    color: white;
    vertical-align: center;
    /* font-size: 1.16rem; */
`;

const RightTopTotal = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    height: 16%;
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
`;

const RightBot = styled.div`
    /* border: 1px solid gold; */
    width: 100%;
    height: 56%;
`;

const StockMove = ({ price }) => {

    const leftChartRef = useRef();
    const leftChartContainer = useRef();
    const lastData = price.price.slice(-2)[0]
    console.log('lastData1: ', lastData)
    const lastClose = lastData && lastData.Close

    useEffect(() => {
        console.log('lastData: ',lastData, lastClose)
        d3.select('.leftMovingChart').remove()

        const width = leftChartContainer.current.offsetWidth
        const height = leftChartContainer.current.offsetHeight
        const svg = d3.select(leftChartContainer.current).append('svg').attr('class', 'leftMovingChart').attr('width', width).attr('height', height)

        const margin = { top: 10, left: 45, bottom: 30, right: 10 }
        const innerWidth = width - margin.right - margin.left
        const innerHeight = height - margin.top - margin.bottom
        const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

        const xScale = d3.scaleBand()
            .domain(Move_2330.map(item => item.time.split(' ')[1].split(':').slice(0, 2).join(':')))
            .range([0, innerWidth])
        const yScale = d3.scaleLinear()
            .domain([lastClose * 0.9, lastClose * 1.1])
            .range([innerHeight, 0])

        const yAxisValues = [lastClose * 0.9, lastClose * 0.95, lastClose, lastClose * 1.05, lastClose * 1.1]
        const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => { return !((i + 1) % 68) })).tickSize(-innerHeight).tickFormat(d => { return '上午' + d.split(':')[0] + '時' })
        const yAxis = d3.axisLeft(yScale).tickValues(yAxisValues).tickSize(-innerWidth)
        const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
        const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(0, 0)`)

        const line = d3.line()
            .x(d => xScale(d.time.split(' ')[1].split(':').slice(0, 2).join(':')))
            .y(d => yScale(d.close))
        const area = d3.area()
            .x(d => xScale(d.time.split(' ')[1].split(':').slice(0, 2).join(':')))
            .y0(yScale(lastClose))
            .y1(d => yScale(d.close))

        const areaGradient = g.append('defs')
            .append('linearGradient')
            .attr('id', 'areaGradientMovingchart')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')
        areaGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'red')
            .attr('stop-opacity', 0.8)
        areaGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'red')
            .attr('stop-opacity', 0.2)

        g.append('path')
            .datum(Move_2330)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('stroke', d => {
                if (d.close > lastClose) {
                    return '#BA0001'
                } else if (d.Close === lastClose) {
                    return 'yellow'
                } else {
                    return '#00B000'
                }
            })
            .attr('stroke-width', 2)
            .attr('d', d => line(d))
        g.append('path')
            .datum(Move_2330)
            .style('fill', `#areaGradientMovingChart`)
            .attr('d', area)
    }, [lastData])
    const searchStockId = '2330'
    const strongWeakChartData = [Move_bid[searchStockId].best_bid_volume.reduce((curr, next) => curr + next), Move_bid[searchStockId].best_ask_volume.reduce((curr, next) => curr + next)]
    const diskContainerRef = useRef();

    useEffect(() => {
        d3.selectAll('.diskSvg').remove()
        const width = diskContainerRef.current.offsetWidth
        // const width = + d3.select('.diskContainer').style('width')
        // const width = 367;
        const height = diskContainerRef.current.offsetHeight 
        const box = d3.select(diskContainerRef.current)

        const svg = box.append('svg').attr('class', 'diskSvg').attr('height', height).attr('width', width)

        const margin = { top: 10, left: 20, bottom: 10, right: 20 }
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom
        const g = svg.append('g').attr('class', 'strong-weak-chart')
            // .attr('width', 327)
            // .attr('height', 24)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // border
        // g.append('rect').attr('width', width + 20).attr('height', height).attr('fill', 'white')//.attr('transform', `translate(20, 20)`)

        let percent_now = 0
        const color = d3.scaleOrdinal()
            .range(['#1DFF1E', '#FF2627'])
        g.selectAll('.stacked-single-barchart').data(strongWeakChartData).enter()
            .append('rect')
            .attr('width', d => { return (d / (strongWeakChartData[0] + strongWeakChartData[1]) * 100) + '%' })
            .attr('height', innerHeight)
            .attr('x', d => {
                var prev_percent = percent_now
                const this_percent = 100 * (d / (strongWeakChartData[0] + strongWeakChartData[1]))
                percent_now = percent_now + this_percent
                console.log('prev_percent: ', prev_percent, 'percent_now: ', percent_now)
                return prev_percent + '%'
            })
            .attr('fill', d => color(d))
            .attr('rx', 12)
            .attr('ry', 12)
        g.selectAll('.stacked-single-text').data(strongWeakChartData).enter()
            .append('text')
            .text(`%`)
            .attr('fill', 'white')
            .attr('transform', `translate(0, ${height / 2})`)
    }, [searchStockId])

    return (
        <MovingContainer>
            <MovingLeft>
                <LeftTop id='leftChart' ref={leftChartContainer}>
                    <svg ref={leftChartRef} className='leftMovingChart'></svg>
                    {/* <ChipImg url={movingstock1} height={'100'} width={'100'} /> */}
                </LeftTop>
                <LeftBot>
                    <BotRow>
                        {
                            row1.map((data, index) => {
                                return (
                                    <BotItem key={index}>
                                        <BotItemTitle>{data.title}</BotItemTitle>
                                        <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                    </BotItem>
                                )
                            })
                        }
                    </BotRow>
                    <BotRow>
                        {
                            row2.map((data, index) => {
                                return (
                                    <BotItem key={index}>
                                        <BotItemTitle>{data.title}</BotItemTitle>
                                        <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                    </BotItem>
                                )
                            })
                        }
                    </BotRow>
                    <BotRow>
                        {
                            row3.map((data, index) => {
                                return (
                                    <BotItem key={index}>
                                        <BotItemTitle>{data.title}</BotItemTitle>
                                        <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                    </BotItem>
                                )
                            })
                        }
                    </BotRow>
                </LeftBot>
            </MovingLeft >
            <MovingRight>
                <RightTop>
                    <RightTopTotal ref={diskContainerRef} className='diskContainer'>
                        {/* <ColNum>63.03</ColNum>
                        <ChipImg url={mockedmoving} height={'100'} />
                        <ColNum>31.16</ColNum> */}
                        <svg className='diskSvg'></svg>
                    </RightTopTotal>
                    <TopCol textalign={'right'}>
                        <ColNum>{Move_bid[searchStockId].best_bid_volume.reduce((curr, next) => curr + next)}</ColNum>
                        {
                            Move_bid[searchStockId].best_bid_volume.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'right'}>
                        <ColNum>委買價</ColNum>
                        {
                            Move_bid[searchStockId].best_bid_price.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'left'}>
                        <ColNum>委賣價</ColNum>
                        {
                            Move_bid[searchStockId].best_ask_price.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'left'}>
                        <ColNum>{Move_bid[searchStockId].best_ask_volume.reduce((curr, next) => curr + next)}</ColNum>
                        {
                            Move_bid[searchStockId].best_ask_volume.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                </RightTop>
                <RightBot>
                    <ChipImg url={movingstock2} height={'100'} width={'100'} />
                </RightBot>
            </MovingRight>
        </MovingContainer >
    )
};

const mapStateToProps = state => ({
    price: state.price,
})

export default connect(mapStateToProps,)(StockMove);