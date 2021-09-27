import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Move_2330 from '../../data/move_2330.json';
import * as d3 from 'd3';
import { connect } from 'react-redux';

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
`;

const LeftTop = styled.div`
    border: 1px solid pink;
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
    width: 36%;
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
    color: white;
    vertical-align: center;
    /* font-size: 1.16rem; */
    /* border: 1px solid white; */
`;

const RightTopTotal = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    height: 16%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightBot = styled.div`
    /* border: 1px solid gold; */
    width: 100%;
    height: 56%;
`;

const StockMove = ({ price }) => {

    const leftChartRef = useRef();
    const leftChartContainer = useRef();
    // var lastClose
    // price.price.map(item => {
    //     if (item.Date === '110/09/17') {
    //         // console.log(item.Close)
    //         lastClose = item.Close
    //         return lastClose
    //     } 
    // })
    // const lastData = price.price.slice(-2)
    // const lastClose = lastData[0].Close
    // console.log('lastClose: ', lastClose)
    // const yAxisValues = [lastClose * 0.9, lastClose * 0.95, lastClose, lastClose * 1.05, lastClose * 1.1]

    useEffect(() => {

        // price.price.map(item => {
        //     if (item.Date === '110/09/17') {
        //         lastClose = item.Close
        //         console.log('item:',item)
        //         return lastClose
        //     }
        // })
        // const lastClose = price.price.filter(d => { return d.time ===  })
        const lastData = price.price.slice(-2)[0]
        const lastClose = lastData
        console.log(lastClose)


        // const width = parseInt(d3.select('#leftChart').style('width'))
        // const height = parseInt(d3.select('#leftChart').style('height'))
        const width = leftChartContainer.current.offsetWidth
        const height = leftChartContainer.current.offsetHeight
        const svg = d3.select(leftChartRef.current).attr('width', width).attr('height', height)

        console.log('width: ', width, 'height: ', height)

        const margin = { top: 10, left: 10, bottom: 30, right: 55 }
        const innerWidth = width - margin.right - margin.left
        const innerHeight = height - margin.top - margin.bottom
        const g = svg.append('g').attr('transform', `translate(${margin.top}, ${margin.left})`)

        console.log('innerWidth: ', innerWidth, 'innerHeight: ', innerHeight)

        const xScale = d3.scaleBand()
            .domain(Move_2330.map(item => item.time.split(' ')[1].split(':').slice(0, 2).join(':')))
            .range([0, innerWidth])
        const yScale = d3.scaleLinear()
            .domain([lastClose * 0.9, lastClose * 1.1])
            .range([innerHeight, 0])

        const yAxisValues = [lastClose * 0.9, lastClose * 0.95, lastClose, lastClose * 1.05, lastClose * 1.1]
        const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => { return !((i + 1) % 68) })).tickSize(-innerHeight).tickFormat(d => { return '上午' + d.split(':')[0] + '時' })
        const yAxis = d3.axisRight(yScale).tickValues(yAxisValues).tickSize(-innerWidth)
        const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
        const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

        const line = d3.line()
            .x(d => xScale(d.time.split(' ')[1].split(':').slice(0, 2).join(':')))
            // .x(Move_2330.map(d => xScale(d.time.split(' ')[1].split(':').slice(0, 2).join(':'))))
            .y(d => yScale(d.close))
            // .y(Move_2330.map(d => yScale(d.close)))
        const renderPath = (strokeColor, lineGenerator) => {
            g.append('path')
                .datum(Move_2330)
                .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
                .attr('fill', 'white')
                .attr('stroke', strokeColor)
                .attr('stroke-width', 2)
                .attr('d', lineGenerator)
        }
        g.append('path')
            .datum(Move_2330)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('fill', 'white')
            .attr('stroke', 'red')
            .attr('stroke-width', 1.5)
            .attr('d', d => line(d))
        // renderPath('steelBlue', line)
        console.log('lastClose1: ', lastClose)
        console.log('price: ', price.price)
    }, [])
    // console.log('move_2330: ', Move_2330)

    // Move_2330.map(item => {
    // // console.log(item.time.split(' ')[1].split(':').slice(0,2).join(':'))
    // console.log(item.close)
    // })
    return (
        <MovingContainer>
            <MovingLeft>
                <LeftTop id='leftChart' ref={leftChartContainer}>
                    <svg ref={leftChartRef}></svg>
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
                    <TopCol textalign={'right'}>
                        {
                            mockedRightRow1.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'right'}>
                        {
                            mockedRightRow2.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'left'}>
                        {
                            mockedRightRow3.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <TopCol textalign={'left'}>
                        {
                            mockedRightRow4.map((data, index) => {
                                return (
                                    <ColNum key={index}>{data}</ColNum>
                                )
                            })
                        }
                    </TopCol>
                    <RightTopTotal>
                        <ColNum>63.03</ColNum>
                        <ChipImg url={mockedmoving} height={'100'} />
                        <ColNum>31.16</ColNum>
                    </RightTopTotal>
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