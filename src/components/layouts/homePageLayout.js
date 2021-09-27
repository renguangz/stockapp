import { CaretUpOutlined } from '@ant-design/icons';
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as d3 from 'd3';
import './homePageLayout.css';
import Taiwan_index from '../../data/taiwan_index.json';
import Dowj from '../../data/DOWJ.json';
import Spx from '../../data/SPX.json';
import Japan from '../../data/japan.json';
import useResponsive from '../common/useResponsive';
import { drawSmallChart } from '../common/drawSmallChart';

const StyledBackground = styled.div`
    background: #111;
`;

const StyledContainer = styled.div`
    /* border: 1px solid white; */
    width: 96vw;
    height: 96vh;
    margin: auto;
    display: flex;
    justify-content: space-between;
`;

const LeftContainer = styled.div`
    /* border: 1px solid red; */
    height: 100%;
    width: 30%;
`;

const LeftTitleContainer = styled.div`
    margin-top: 28%;
`;

const LeftTitle = styled.h1`
    color: white;
    font-size: 4rem;
    font-weight: 700;
    text-align: left;
`;

const InfoContainer = styled.div`
    height: 10%;
`;

const StockInfo = styled.h2`
    color: ${props => props.color};
    font-size: 3.4rem;
    text-align: left;
`;

const NumContainer = styled.div``;

const StockRise = styled.h3`
    color: ${props => props.color};
    font-size: 2.2rem;
    text-align: left;
`;

const BtnContainer = styled.div`
    display: flex;
    width: 100%;
    /* border: 1px solid white; */
    /* height: 8%; */
    align-items: center;
    justify-content: space-between;
    margin-top: 16%;
    /* padding: 8px 0; */
`;

const FirstBtn = styled.div`
    /* border: 1px solid #75AADB; */
    border: 1px solid #54AA5E;
    border-radius: 4px;
    /* height: 100%; */
    padding: 8px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #75AADB;
    background-color: #54AA5E;
    transition: .3s;
    &:hover {
        background-color: transparent;
    }
`;

const BtnWord = styled.h2`
    color: white;
    font-size: 1.4rem;
    margin: auto 28px;
`;

const SecondBtn = styled(FirstBtn)`
    background: transparent;  
    &:hover {
        background-color: #54AA5E;
        color: white;
    }
`;

const ImgContainer = styled.div`
    /* border: 1px solid white; */
    height: 60%;
    width: 50%;
    margin: auto;
`;

const CardContainer = styled.div`
    /* border: 1px solid yellow; */
    height: 100%;
    width: 18%;
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardOutter = styled.div`
    border: 1px solid grey;
    /* width: 64%; 固定比例 */
    /* margin-left: 36%; */
    width: 100%;
    /* margin-left: 20%; */
    /* height: 20%; */
    border-radius: 8px;
    padding: 12px;
    margin: 6px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 15px #fffd;
    }
`;

const CardTitleContainer = styled.div`
    /* border: 1px solid pink; */
    padding: 0 auto;
`;

const SmallChartContainer = styled.div`
    /* border: 1px solid white; */
    width: 48%;
    padding: 0;
`;

const CardTitle = styled.h2`
    color: grey;
    text-align: left;
`;

const CardNum = styled.h2`
    color: red;
    font-size: 13px;
    text-align: left;
`;

const HomePageLayout = () => {

    const containerRef = useRef();
    const taiwanRef = useRef();
    const dowRef = useRef();
    const spxRef = useRef();
    const japanRef = useRef();

    const taiwanDatas = Taiwan_index.slice(-80)
    const dowDatas = Dowj.slice(-80)
    const spxDatas = Spx.slice(-80)
    const japanDatas = Japan.slice(-80)

    const [drawData, setDrawData] = useState(taiwanDatas);
    const [leftTitle, setLeftTitle] = useState('台股加權指數')
    const handleClickTaiwan = () => {
        setLeftTitle('台股加權指數')
        setDrawData(taiwanDatas)
    }
    const handleClickDow = () => {
        setLeftTitle('道瓊指數')
        setDrawData(dowDatas)
    }
    const handleClickSpx = () => {
        setLeftTitle('標普500')
        setDrawData(spxDatas)
    }

    const handleClickJapan = () => {
        setLeftTitle('日經指數')
        setDrawData(japanDatas)
    }

    // 中間大圖
    const drawMidChart = (data) => {
        d3.select('.midChart').remove()
        const width = containerRef.current.offsetWidth
        const height = containerRef.current.offsetHeight
        const box = d3.select(containerRef.current)

        const svg = box.append('svg').attr('class', 'midChart').attr('width', width).attr('height', height)

        const margin = { top: 10, left: 10, bottom: 30, right: 65 }
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom
        const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, innerWidth])
            .padding(0.5)
        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.low) * 0.99, d3.max(data, d => d.high) * 1.01])
            .range([innerHeight, 0])

        const yAxisArray = [yScale.domain()[0], yScale.domain()[0] + (yScale.domain()[1] - yScale.domain()[0]) / 3, yScale.domain()[0] + ((yScale.domain()[1] - yScale.domain()[0]) / 3 * 2), yScale.domain()[1]]
        const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d, i) => { return !((i + 1) % 21) })).tickSize(-innerHeight)
        const yAxis = d3.axisRight(yScale).tickValues(yAxisArray).tickSize(-innerWidth)
        const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
        const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

        g.selectAll('line')
            .data(data, d => d.date)
            .enter()
            .append('line')
            .attr('x1', d => xScale(d.date) + xScale.bandwidth() / 2)
            .attr('x2', d => xScale(d.date) + xScale.bandwidth() / 2)
            .attr('y1', d => yScale(d.high))
            .attr('y2', d => yScale(d.low))
            .attr('stroke', 'white')

        g.selectAll('rect')
            .data(data, d => d.date)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.date))
            .attr('y', d => yScale(Math.max(d.open, d.close)))
            .attr('width', xScale.bandwidth())
            .attr('height', d => (d.open === d.close) ? 15 : (Math.abs(yScale(d.open) - yScale(d.close))))
            .attr('fill', d => (d.open === d.close) ? 'yellow' : (d.open < d.close) ? '#FF2627' : '#1DFF1E')
        g.selectAll('.domain').attr('stroke', '#999999').attr('stroke-width', '2px')
        g.selectAll('.tick line').attr('stroke', '#616161').attr('stroke-width', '1.5px').attr('stroke-dasharray', '8px')
        yAxisG.select('.tick line').remove()
        yAxisG.selectAll('.tick:last-child line').remove()
        xAxisG.selectAll('.tick text').attr('transform', `translate(0, 10)`)
        yAxisG.selectAll('.tick text').attr('transform', `translate(7, 0)`)
    }

    useEffect(() => {
        drawMidChart(drawData)
    }, [drawData])

    useEffect(() => {
        drawSmallChart(88, 104, taiwanRef, taiwanDatas, 'steelblue', 'steelblue', 'steelblue', 'areaGradient')
        drawSmallChart(88, 104, dowRef, dowDatas, '#EDBB56', '#EDBB56', '#EDBB56', 'areaGradient1')
        drawSmallChart(88, 104, spxRef, spxDatas, '#74C5A6', '#74C5A6', '#74C5A6', 'areaGradient2')
        drawSmallChart(88, 104, japanRef, japanDatas, '#9D6ABC', '#9D6ABC', '#9D6ABC', 'areaGradient3')
    }, [])

    const {screenType} = useResponsive();

    useEffect(() => {
        if (screenType === 'DESKTOP') {

        } else if (screenType === 'TABLET') {

        } else {

        }
    }, [screenType])

    return (
        <StyledBackground>
            <StyledContainer>
                <LeftContainer>
                    <LeftTitleContainer>
                        <LeftTitle>{leftTitle}</LeftTitle>
                    </LeftTitleContainer>
                    <InfoContainer>
                        <StockInfo className={(drawData[79].close > drawData[78].close) ? 'redColor' : 'greenColor'}>{drawData[79].close}</StockInfo>
                    </InfoContainer>
                    <NumContainer>
                        <StockRise className={(drawData[79].close > drawData[78].close) ? 'redColor' : 'greenColor'}><CaretUpOutlined rotate={(drawData[79].close > drawData[78].close) ? 0 : 180} />{(Math.abs(drawData[79].close - drawData[78].close).toFixed(2))}({(Math.abs(drawData[79].close - drawData[78].close) / drawData[79].close * 100).toFixed(2)}%)</StockRise>
                    </NumContainer>
                    <BtnContainer>
                        <FirstBtn>
                            <Link to='/mylist'>
                                <BtnWord>進入股票清單</BtnWord>
                            </Link>
                        </FirstBtn>
                        <SecondBtn>
                            <Link to='/search'>
                                <BtnWord>查詢個股資訊</BtnWord>
                            </Link>
                        </SecondBtn>
                    </BtnContainer>
                </LeftContainer>
                <ImgContainer ref={containerRef}>
                    <svg className='midChart'></svg>
                </ImgContainer>
                <CardContainer>
                    <CardOutter onClick={handleClickTaiwan}>
                        <CardTitleContainer>
                            <CardTitle>台股指數</CardTitle>
                            <CardNum className={(taiwanDatas[79].close > taiwanDatas[78].close) ? 'redColor' : 'greenColor'}>{taiwanDatas[79].close}</CardNum>
                            <CardNum className={(taiwanDatas[79].close > taiwanDatas[78].close) ? 'redColor' : 'greenColor'}><CaretUpOutlined />{(Math.abs(taiwanDatas[79].close - taiwanDatas[78].close).toFixed(2))} ({(Math.abs(taiwanDatas[79].close - taiwanDatas[78].close) / taiwanDatas[79].close * 100).toFixed(2)}%)</CardNum>
                        </CardTitleContainer>
                        <SmallChartContainer>
                            <svg ref={taiwanRef}></svg>
                        </SmallChartContainer>
                    </CardOutter>
                    <CardOutter onClick={handleClickDow}>
                        <CardTitleContainer>
                            <CardTitle>道瓊指數</CardTitle>
                            <CardNum className={(dowDatas[79].close > dowDatas[78].close) ? 'redColor' : 'greenColor'}>{dowDatas[79].close}</CardNum>
                            <CardNum className={(dowDatas[79].close > dowDatas[78].close) ? 'redColor' : 'greenColor'}><CaretUpOutlined />{Math.abs(dowDatas[79].close - dowDatas[78].close).toFixed(2)} ({(Math.abs(dowDatas[79].close - dowDatas[78].close) / dowDatas[79].close * 100).toFixed(2)}%)</CardNum>
                        </CardTitleContainer>
                        <SmallChartContainer>
                            <svg ref={dowRef}></svg>
                        </SmallChartContainer>
                    </CardOutter>
                    <CardOutter onClick={handleClickSpx}>
                        <CardTitleContainer>
                            <CardTitle>標普500</CardTitle>
                            <CardNum className={(spxDatas[79].close > spxDatas[78].close) ? 'redColor' : 'greenColor'}>{spxDatas[79].close}</CardNum>
                            <CardNum className={(spxDatas[79].close > spxDatas[78].close) ? 'redColor' : 'greenColor'}><CaretUpOutlined />{Math.abs(spxDatas[79].close - spxDatas[78].close).toFixed(2)} ({(Math.abs(spxDatas[79].close - spxDatas[78].close) / spxDatas[79].close * 100).toFixed(2)}%)</CardNum>
                        </CardTitleContainer>
                        <SmallChartContainer>
                            <svg ref={spxRef}></svg>
                        </SmallChartContainer>
                    </CardOutter>
                    <CardOutter onClick={handleClickJapan}>
                        <CardTitleContainer>
                            <CardTitle>日經指數</CardTitle>
                            <CardNum className={(japanDatas[79].close > japanDatas[78].close) ? 'redColor' : 'greenColor'}>{japanDatas[79].close}</CardNum>
                            <CardNum className={(japanDatas[79].close > japanDatas[78].close) ? 'redColor' : 'greenColor'}><CaretUpOutlined />{Math.abs(japanDatas[79].close - japanDatas[78].close).toFixed(2)} ({(Math.abs(japanDatas[79].close - japanDatas[78].close) / japanDatas[79].close * 100).toFixed(2)}%)</CardNum>
                        </CardTitleContainer>
                        <SmallChartContainer>
                            <svg ref={japanRef}></svg>
                        </SmallChartContainer>
                    </CardOutter>
                </CardContainer>
            </StyledContainer>
        </StyledBackground>
    )
};

export default HomePageLayout;