import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { fetchPrice } from '../../../redux';
import * as Storage from '../../helper/StorageHelper';
import { connect } from 'react-redux';
import techmid from '../../images/mocked/techmid.png';
import techmid1 from '../../images/mocked/techmid1.png';
import techmid2 from '../../images/mocked/techmid2.png';

const TechContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
`;

const TechNav = styled.div`
    /* border: 2px solid green; */
    width: 100%;
    height: 8%;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const TechNavRight = styled.div`
    /* border: 1px solid pink; */
    display: flex;
    width: 50%;
    justify-content: space-around;
`;

const NavButton = styled.div`
    border: 1px solid #A9A9A9;
    border-radius: 4px;
    background-color: #676767;
    height: 28px;
`;

const TechDropSelect = styled(NavButton)`
    display: flex;
`;

const TechDropOption = styled.option`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
`;

const TechMainContainer = styled.div`
    /* border: 2px solid pink; */
    width: 100%;
    height: ${props => props.height || '24'}%;
    display: flex;
    flex-wrap: wrap;
`;

const TechMainLeft = styled.div`
    /* border: 2px solid pink; */
    width: 10%;
    padding-right: 4px;
`;

const TechMainTitleContainer = styled(NavButton)`
    height: 32px;
`;

const TechMainTitle = styled.h2`
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
`;

const TechMainH4 = styled.h4`
    /* border: 1px solid yellow; */
    color: ${props => props.color || 'white'};
    text-align: ${props => props.textAlign || 'left'};
`;

const TechMainMid = styled.div`
    border: 2px solid #999999;
    background-color: #333333;
    width: 84%;
    height: ${props => props.height || '100'}%;
`;

const TechMainRight = styled.div`
    /* border: 1px solid white; */
    height: ${props => props.height || '88'}%;
    width: 6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 4px;
`;

const TechMainDate = styled.div`
    /* border: 1px solid white; */
    width: 80%;
    margin-left: 10%;
    display: flex;
    /* align-items: center; */
    vertical-align: middle;
    padding-top: 4px;
    justify-content: space-around;
`;

const DropSelect = styled.select`
    background-color: transparent;
    border: none;
    /* border: 1px solid pink; */
    margin: 0;
    margin-left: 4px;
    line-height: inherit;
    cursor: inherit;
    font-size: 1rem;
    width: 100px;
`;

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const CandleStickChart = ({ price, fetchPrice }) => {

    const searchStockIdName = Storage.getData('stock_id_and_name')
    const searchStock = searchStockIdName.split('　')[0]
    useEffect(() => {
        fetchPrice(searchStock)
    }, [])
    const datas = price.price.slice(-60)
    console.log(datas)

    const width = 1020;
    const height = 340;
    const padding = 50;
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2

    // g
    const svg = d3.select('#candlestick_main_chart').attr('width', innerWidth).attr('height', innerHeight)
    const rootLayer = svg.append('g').attr('transform', `translate(0, 0)`)
    const axisLayer = rootLayer.append('g')
    const xAxisLayer = axisLayer.append('g').attr('transform', `translate(0, ${height})`)
    const yAxisLayer = axisLayer.append('g')
    const lineLayer = rootLayer.append('g')
    const rectLayer = rootLayer.append('g')
    // ["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]

    // inital
    let xExtent;
    let yExtent;

    let xScale;
    let yScale;

    let xAxis;
    let yAxis;

    let lines;
    let rects;

    const calcExtent = () => {
        xExtent = [d3.min(datas, data => new Date(data.Date)), d3.max(datas, data => new Date(data.Date))]
        yExtent = [d3.min(datas, data => data.Low), d3.max(datas, data => data.High)]
        console.log(xExtent, yExtent)
    }

    const calcScale = () => {
        xScale = d3.scaleTime().domain(xExtent).range([0, innerWidth])
        yScale = d3.scaleLinear().domain(yExtent).range([innerHeight, 0])
    }

    const paintAxis = () => {
        xAxis = d3.axisBottom().scale(xScale)
        yAxis = d3.axisLeft().scale(yScale)

        xAxisLayer.call(xAxis)
        yAxisLayer.call(yAxis)
    }

    const paintLines = () => {
        lines = lineLayer.selectAll('line')
            .data(datas, data => data.Date)
            .enter()
            .append('line')
            .attr('class', 'line')
            .attr('x1', (d, i) => xScale(new Date(d.Date)))
            .attr('x2', (d, i) => xScale(new Date(d.Date)))
            .attr('y1', d => yScale(d.High))
            .attr('y2', d => yScale(d.Low))
            .attr('stroke', d => (d.Open === d.Close) ? 'yellow' : (d.Open < d.Close) ? 'green' : 'red')
        return lines
    }

    const paintRects = () => {
        rects = rectLayer.selectAll('rect')
            .data(datas, data => data.Date)
            .enter()
            .append('rect')
            .attr('class', 'rect')
            .attr('x', d => xScale(new Date(d.Date)) - 2)
            .attr('y', d => yScale(Math.max(d.Open, d.Close)))
            .attr('width', 5)
            .attr('height', d => Math.abs(yScale(d.Open) - yScale(d.Close)))
            .attr('fill', d => (d.Open > d.Close) ? 'red' : 'green')
        return rects
    }

    // cross hair
    const transRect = svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('opacity', 0)
    const verticalLine = svg.append('line')
        .attr('opacity', 0)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')
    const horizontalLine = svg.append('line')
        .attr('opacity', 0)
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')

    transRect.on('mousemove', (event) => {
        const mousex = d3.pointer(event, this)[0]
        const mousey = d3.pointer(event, this)[1]

        verticalLine.attr('x1', mousex).attr('x2', mousex).attr('opacity', 1)
        second_verticalLine.attr('x1', mousex).attr('x2', mousex).attr('opacity', 1)
        horizontalLine.attr('y1', mousey).attr('y2', mousey).attr('opacity', 1)
    }).on('mouseout', () => {
        verticalLine.attr('opacity', 0)
        second_verticalLine.attr('opacity', 0)
        horizontalLine.attr('opacity', 0)
    })

    calcExtent();
    calcScale();
    paintAxis();
    paintLines();
    paintRects();

    const second_svg = d3.select('#candlestick_secondary_chart').attr('width', innerWidth).attr('height', innerHeight)
    const second_rootLayer = second_svg.append('g').attr('transform', `translate(0, 0)`)
    const second_xAxisLayer = second_rootLayer.append('g').attr('transform', `translate(0, 0)`)
    const second_yAxisLayer = second_rootLayer.append('g')
    const second_rectLayer = second_rootLayer.append('g')

    let secondYextent
    let secondYscale
    let secondYaxis
    let secondRects

    const secondCalcExtent = () => {
        secondYextent = [d3.min(datas, data => data.Volume), d3.max(datas, data => data.Volume)]
    }

    const secondCalcScale = () => {
        secondYscale = d3.scaleLinear().domain(secondYextent).range([innerHeight, 0])
    }

    const secondPaintAxis = () => {
        secondYaxis = d3.axisLeft().scale(secondYscale)
        second_xAxisLayer.call(xAxis).attr('opacity', 0)
        second_yAxisLayer.call(secondYaxis)
    }

    const secondPaintRects = () => {
        secondRects = second_rectLayer.selectAll('rect')
            .data(datas, data => data.Date)
            .enter()
            .append('rect')
            .attr('class', 'rect')
            .attr('x', d => xScale(new Date(d.Date)) - 2)
            .attr('y', d => secondYscale(d.Volume))
            .attr('width', 5)
            .attr('height', d => secondYscale(d.Volume / 1000))
            .attr('fill', d => 'red')
        return secondRects
    }

    const second_verticalLine = second_svg.append('line')
        .attr('opacity', 0)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')

    secondCalcExtent();
    secondCalcScale();
    secondPaintAxis();
    secondPaintRects();





    return (
        <TechContainer>
            <TechNav>
                <TechMainH4>2021/07/02 開: 605.00 高: 607.00 低: 601.00 收: 604.00 量: 4000 ⬇️5.00</TechMainH4>
                <TechNavRight>
                    <TechDropSelect>
                        <DropSelect>
                            {/* <TechDropOption>1分鐘</TechDropOption>
                            <TechDropOption>5分鐘</TechDropOption>
                            <TechDropOption>10分鐘</TechDropOption>
                            <TechDropOption>15分鐘</TechDropOption>
                            <TechDropOption>30分鐘</TechDropOption>
                            <TechDropOption>60分鐘</TechDropOption> */}
                            <TechDropOption>日線</TechDropOption>
                            <TechDropOption>週線</TechDropOption>
                            <TechDropOption>月線</TechDropOption>
                        </DropSelect>
                    </TechDropSelect>
                    <NavButton>
                        <TechMainTitle>關閉隔線</TechMainTitle>
                    </NavButton>
                    <NavButton>
                        <TechMainTitle>重新整理</TechMainTitle>
                    </NavButton>
                </TechNavRight>
            </TechNav>
            <TechMainContainer height={'40'}>
                <TechMainLeft>
                    <TechMainTitleContainer>
                        <TechMainTitle>K線</TechMainTitle>
                        <TechMainH4>MA5: 26.01</TechMainH4>
                        <TechMainH4>MA100: 26.01</TechMainH4>
                        <TechMainH4>MA: 26.01</TechMainH4>
                    </TechMainTitleContainer>
                </TechMainLeft>
                <TechMainMid height={'88'}>
                    {/* <ChipImg url={techmid} width={'100'} height={'100'} /> */}
                    <svg id='candlestick_main_chart'></svg>
                </TechMainMid>
                <TechMainRight>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                </TechMainRight>
                {/* <TechMainDate>
                    <TechMainH4>2021/02</TechMainH4>
                    <TechMainH4>2021/02</TechMainH4>
                    <TechMainH4>2021/02</TechMainH4>
                    <TechMainH4>2021/02</TechMainH4>
                </TechMainDate> */}
            </TechMainContainer>
            <TechMainContainer>
                <TechMainLeft>
                    <TechMainTitleContainer>
                        <TechMainTitle>成交量</TechMainTitle>
                        <TechMainH4>MA5: 26.01</TechMainH4>
                        <TechMainH4>MA100: 26.01</TechMainH4>
                        <TechMainH4>MA: 26.01</TechMainH4>
                    </TechMainTitleContainer>
                </TechMainLeft>
                <TechMainMid>
                    <ChipImg url={techmid1} width={'100'} height={'100'} />
                    {/* <svg id='candlestick_secondary_chart'></svg> */}
                </TechMainMid>
                <TechMainRight height={'100'}>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                </TechMainRight>
            </TechMainContainer>
            <TechMainContainer>
                <TechMainLeft>
                    <TechMainTitleContainer>
                        <TechMainTitle>KDJ</TechMainTitle>
                        <TechMainH4>MA5: 26.01</TechMainH4>
                        <TechMainH4>MA100: 26.01</TechMainH4>
                        <TechMainH4>MA: 26.01</TechMainH4>
                    </TechMainTitleContainer>
                </TechMainLeft>
                <TechMainMid>
                    <ChipImg url={techmid2} width={'100'} height={'100'} />
                </TechMainMid>
                <TechMainRight height={'100'}>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                    <TechMainH4 textAlign={'right'}>
                        35.55
                    </TechMainH4>
                </TechMainRight>
            </TechMainContainer>
        </TechContainer>
    )
};

const mapStateToProps = state => {
    return {
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPrice: (stockid) => dispatch(fetchPrice(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandleStickChart);