import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { fetchPrice } from '../../../redux';
import * as Storage from '../../helper/StorageHelper';
import './candlestick.css';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { TechMainContainer, TechMainLeft, NavButton, TechMainTitleContainer, TechMainTitle, TechMainH4, TechMainSvg, Svg, mouseX } from './Styled';

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
    width: 40%;
    justify-content: space-around;
`;

const TechMainH4Flex = styled.div`
    /* border: 1px solid pink; */
    display: flex;
    line-height: 0.6rem;
    align-items: center;
    font-size: 1.2rem;
    padding-top: 0.6rem;
    width: 60%;
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

const TechDropSelect = styled(NavButton)`
    display: flex;
`;

const TechDropOption = styled.option`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
`;

const CandlestickMain = ({ price, fetchPrice }) => {

    const searchStockIdName = Storage.getData('stock_id_and_name')
    const searchStock = searchStockIdName.split('　')[0]
    // useEffect(() => {
    //     fetchPrice(searchStock)
    // }, [])

    const [newPrice, setNewPrice] = useState([])
    useEffect(() => {
        setNewPrice(price)
    }, [price])


    const datas = price.price.slice(-80)
    const lastData = datas.slice(-1)
    const lastSecondData = datas[datas.length - 2]
    const tooltipDatas = price.price.slice(-82)

    const svgRef = useRef();

    const svg = d3.select(svgRef.current)
    const width = 990
    const height = 275

    const margin = { top: 0, left: 10, bottom: 30, right: 70 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const g = svg.append('g').attr('class', 'main-chart').attr('id', 'candlestick-main').attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3.scaleBand()
        .domain(datas.map(d => d.Date))
        .range([0, innerWidth])
        .padding(0.5)
    const yScale = d3.scaleLinear()
        .domain([d3.min(datas, d => d.Low) * 0.98, d3.max(datas, d => d.High) * 1.02])
        .range([innerHeight, 0])

    const yAxisArray = [yScale.domain()[0], yScale.domain()[0] + (yScale.domain()[1] - yScale.domain()[0]) / 3, yScale.domain()[0] + ((yScale.domain()[1] - yScale.domain()[0]) / 3 * 2), yScale.domain()[1]]

    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (d, i) { return !((i + 1) % 21) })).tickSize(-innerHeight)
    const yAxis = d3.axisRight(yScale).tickValues(yAxisArray).tickSize(-innerWidth)
    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    const yAxisG = g.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

    g.selectAll('line')
        .data(datas, d => d.Date)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', d => xScale(d.Date) + xScale.bandwidth() / 2)
        .attr('x2', d => xScale(d.Date) + xScale.bandwidth() / 2)
        .attr('y1', d => yScale(d.High))
        .attr('y2', d => yScale(d.Low))
        .attr('stroke', 'white')

    g.selectAll('rect')
        .data(datas, d => d.Date)
        .enter()
        .append('rect')
        .attr('class', 'rect')
        .attr('x', d => xScale(d.Date))
        .attr('y', d => yScale(Math.max(d.Open, d.Close)))
        .attr('width', xScale.bandwidth())
        .attr('height', d => (d.Open === d.Close) ? 1.5 : (Math.abs(yScale(d.Open) - yScale(d.Close))))
        .attr('fill', d => (d.Open === d.Close) ? 'yellow' : (d.Open < d.Close) ? '#FF2627' : '#1DFF1E')

    // g.append('rect').attr('class', 'greybackground').attr('width', innerWidth).attr('height', innerHeight).attr('fill', '#333333').attr('z-index', -1)

    const pathMa5 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.Ma5))
        .curve(d3.curveBasis)
    const pathMa10 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.Ma10))
        .curve(d3.curveBasis)
    const pathMa20 = d3.line()
        .x(d => xScale(d.Date))
        .y(d => yScale(d.Ma20))
        .curve(d3.curveBasis)
    const renderMa = (strokeColor, lineGenerator) => {
        g.append('path')
            .datum(datas)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', strokeColor)
            .attr('stroke-width', 1.6)
            .attr('d', lineGenerator)
    }
    renderMa('steelblue', pathMa5)
    renderMa('#FF9800', pathMa10)
    renderMa('#9526AD', pathMa20)

    g.selectAll('.domain').attr('stroke', '#999999').attr('stroke-width', '2px')

    const [opacity, setOpacity] = useState(1)
    // g.selectAll('.domain').remove()
    g.selectAll('.tick line').attr('class', 'candlestick-grid').attr('stroke-dasharray', '8px').attr('stroke', '#616161').attr('stroke-width', '1.5px').attr('opacity', opacity)
    yAxisG.select('.tick line').remove()
    yAxisG.selectAll('.tick:last-child line').remove()
    xAxisG.selectAll('.tick text').attr('transform', `translate(0, 10)`)
    yAxisG.selectAll('.tick text').attr('transform', `translate(${margin.right - 35}, 0)`)
    yAxisG.select('.tick text').attr('transform', `translate(${margin.right - 35}, -8)`)
    yAxisG.selectAll('.tick:last-child text').attr('transform', `translate(${margin.right - 35}, 8)`)

    // tooltip
    const maRef = useRef();
    const firstMa = useRef();
    const secondMa = useRef();
    const thirdMa = useRef();
    const tooltipMa = d3.select(maRef.current)
        .append('TechMainH4')
        .attr('class', 'maTooltip')
    const ma5Tooltip = d3.select(firstMa.current)
    const ma10Tooltip = d3.select(secondMa.current)
    const ma20Tooltip = d3.select(thirdMa.current)

    const dateRef = useRef();
    const openRef = useRef();
    const highRef = useRef();
    const lowRef = useRef();
    const closeRef = useRef();
    const volumeRef = useRef();
    const triRef = useRef();
    const growRef = useRef();

    const dateText = d3.select(dateRef.current)
    const openText = d3.select(openRef.current)
    const highText = d3.select(highRef.current)
    const lowText = d3.select(lowRef.current)
    const closeText = d3.select(closeRef.current)
    const volumeText = d3.select(volumeRef.current)
    const triText = d3.select(triRef.current);
    const growText = d3.select(growRef.current)

    // cross hair
    const transRect = g
        .datum(datas, d => d.Date)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('opacity', 0)
    const verticalLine = g.append('line')
        .attr('opacity', 0)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')
    const horizontalLine = g.append('line')
        .attr('opacity', 0)
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1)
        .attr('pointer-events', 'none')

    let secondVerLine, secondHorLine
    secondVerLine = d3.select('.secondVerLine')
    secondHorLine = d3.select('.secondHorLine')

    let mousex = Storage.getData('mousex')

    transRect.on('mouseover', (event, d) => {
        tooltipMa.attr('opacity', 1)
        d3.select(this).style("stroke", "black")
            .style("opacity", 1)
    }).on('mousemove', (event, data) => {
        mousex = d3.pointer(event, this)[0]
        const mousey = d3.pointer(event)[1]
        Storage.setData('mousex', mousex)

        const y0 = yScale.invert(mousey)
        const i = d3.bisector(data, y0)

        const xEachband = xScale.step()
        const index = Math.floor(mousex / xEachband)
        const xValue = xScale.domain()[index] // 輸出 cross hair 的正確日期
        const dataIndex = data[index] // 輸出對應日期的 object
        data[-1] = tooltipDatas[1]
        data[-2] = tooltipDatas[2]
        const lastDayData = data[index - 1]

        verticalLine.attr('x1', xScale(xValue) + xScale.bandwidth() / 2).attr('x2', xScale(xValue) + xScale.bandwidth() / 2).attr('opacity', 1)
        dataIndex && dataIndex.Close && horizontalLine.attr('y1', yScale(dataIndex.Close)).attr('y2', yScale(dataIndex.Close)).attr('opacity', 1)

        dataIndex && dataIndex.Ma5 && ma5Tooltip.html(`MA5: ${dataIndex.Ma5.toFixed(2)}`)
        dataIndex && dataIndex.Ma10 && ma10Tooltip.html(`MA10: ${dataIndex.Ma10.toFixed(2)}`)
        dataIndex && dataIndex.Ma20 && ma20Tooltip.html(`MA20: ${dataIndex.Ma20.toFixed(2)}`)

        dataIndex && dataIndex.Date && dateText.html(`${dataIndex.Date}&ensp;`)
        dataIndex && dataIndex.Open && dataIndex.Close && openText.html(`${dataIndex.Open}&ensp;`).attr('class', `${dataIndex.Open > lastDayData.Close ? 'redColor' : (dataIndex.Open === lastDayData.Close) ? 'whiteColor' : 'greenColor'}`)
        dataIndex && dataIndex.High && highText.html(`${dataIndex.High}&ensp;`).attr('class', `${dataIndex.High > lastDayData.Close ? 'redColor' : (dataIndex.High === lastDayData.Close) ? 'whiteColor' : 'greenColor'}`)
        dataIndex && dataIndex.Low && lowText.html(`${dataIndex.Low}&ensp;`).attr('class', `${dataIndex.Low > lastDayData.Close ? 'redColor' : (dataIndex.Low === lastDayData.Close) ? 'whiteColor' : 'greenColor'}`)
        dataIndex && dataIndex.Close && closeText.html(`${dataIndex.Close}&ensp;`).attr('class', `${dataIndex.Close > lastDayData.Close ? 'redColor' : (dataIndex.Close === lastDayData.Close) ? 'whiteColor' : 'greenColor'}`)
        dataIndex && dataIndex.Volume && volumeText.html(`${dataIndex.Volume.toFixed(0)}&ensp;`)
        dataIndex && dataIndex.Close && growText.html(`${(Math.abs(dataIndex.Close - lastDayData.Close)).toFixed(2)}`).attr('class', `${dataIndex.Close > lastDayData.Close ? 'redColor' : (dataIndex.Close === lastDayData.Close) ? 'whiteColor' : 'greenColor'}`)
        // dataIndex && dataIndex.Close && triText.html(`${(dataIndex.Close > lastDayData.Close) ? (<CaretUpOutlined />) : (<CaretDownOutlined />)}`)
        triText.html("<CaretUpOutlined class='greenColor' />")

        // secondVerLine.attr('opacity', 1).attr('x1', xScale(xValue) + xScale.bandwidth() / 2).attr('x2', xScale(xValue) + xScale.bandwidth() / 2)
        // secondHorLine.attr('opacity', 1).attr('x1', yScale(dataIndex.Volume)).attr('x2', xScale(dataIndex.Volume))

    }).on('mouseout', () => {
        verticalLine.attr('opacity', 0)
        horizontalLine.attr('opacity', 0)
        secondVerLine.attr('opacity', 0)

        lastData.map(item => {
            ma5Tooltip.html(`MA5: ${item.Ma5.toFixed(2)}`)
            ma10Tooltip.html(`MA10: ${item.Ma10.toFixed(2)}`)
            ma20Tooltip.html(`MA20: ${item.Ma20.toFixed(2)}`)

            const lastDayClose = lastSecondData.Close
            dateText.html(`${item.Date}&ensp;`)
            openText.html(`${item.Open}&ensp;`).attr('class', `${item.Open > lastDayClose ? 'redColor' : (item.Open === lastDayClose) ? 'whiteColor' : 'greenColor'}`)
            highText.html(`${item.High}&ensp;`).attr('class', `${item.High > lastDayClose ? 'redColor' : (item.High === lastDayClose) ? 'whiteColor' : 'greenColor'}`)
            lowText.html(`${item.Low}&ensp;`).attr('class', `${item.Low > lastDayClose ? 'redColor' : (item.Low === lastDayClose) ? 'whiteColor' : 'greenColor'}`)
            closeText.html(`${item.Close}&ensp;`).attr('class', `${item.Close > lastDayClose ? 'redColor' : (item.Close === lastDayClose) ? 'whiteColor' : 'greenColor'}`)
            volumeText.html(`${item.Volume.toFixed(0)}&ensp;`)
            growText.html(`${(Math.abs(item.Close - lastDayClose).toFixed(2))}`).attr('class', `${item.Close > lastDayClose ? 'redColor' : (item.Close === lastDayClose) ? 'whiteColor' : 'greenColor'}`)

        })
    })

    const [clickGrid, setClickGrid] = useState('關閉格線')
    const handleClickGridButton = () => {
        if (clickGrid === '關閉格線') {
            setOpacity(0)
            d3.selectAll('.candlestick-grid').attr('opacity', 0)
            setClickGrid('開啟格線')
        } else {
            setOpacity(1)
            d3.selectAll('.candlestick-grid').attr('opacity', 1)
            setClickGrid('關閉格線')
        }
    }


    return (
        <>
            <TechNav>
                {
                    lastData.map(item => {
                        const lastDayClose = lastSecondData.Close // 前一天收盤價
                        return (
                            <TechMainH4Flex>
                                <TechMainH4 ref={dateRef}>{item.Date}&ensp;</TechMainH4>
                                <TechMainH4>開: </TechMainH4>
                                <TechMainH4 ref={openRef} color={(item.Open > lastDayClose) ? '#FF2627' : (item.Close === lastDayClose) ? 'white' : '#1DFF1E'}>{item.Open}&ensp;</TechMainH4>
                                <TechMainH4>高: </TechMainH4>
                                <TechMainH4 ref={highRef} color={(item.High > lastDayClose) ? '#FF2627' : (item.High === lastDayClose) ? 'white' : '#1DFF1E'}>{item.High}&ensp;</TechMainH4>
                                <TechMainH4>低: </TechMainH4>
                                <TechMainH4 ref={lowRef} color={(item.Low > lastDayClose) ? '#FF2627' : (item.Low === lastDayClose) ? 'white' : '#1DFF1E'}>{item.Low}&ensp;</TechMainH4>
                                <TechMainH4>收: </TechMainH4>
                                <TechMainH4 ref={closeRef} color={(item.Close > lastDayClose) ? '#FF2627' : (item.Close === lastDayClose) ? 'white' : '#1DFF1E'}>{item.Close}&ensp;</TechMainH4>
                                <TechMainH4>量: </TechMainH4>
                                <TechMainH4 ref={volumeRef}>{item.Volume.toFixed(0)}&ensp;</TechMainH4>
                                {
                                    item.Close === lastDayClose ? '' : <TechMainH4><CaretUpOutlined ref={triRef} rotate={item.Close > lastDayClose ? 0 : 180} className={item.Close > lastDayClose ? 'redColor' : 'greenColor'} /></TechMainH4>
                                }
                                <TechMainH4 ref={growRef} color={(item.Close > lastDayClose) ? '#FF2627' : (item.Close === lastDayClose) ? 'white' : '#1DFF1E'}>{(Math.abs(item.Close - lastDayClose)).toFixed(2)}</TechMainH4>
                            </TechMainH4Flex>
                        )
                    })
                }
                <TechNavRight>
                    <TechDropSelect>
                        <DropSelect>
                            <TechDropOption>日線</TechDropOption>
                            <TechDropOption>週線</TechDropOption>
                            <TechDropOption>月線</TechDropOption>
                        </DropSelect>
                    </TechDropSelect>
                    <NavButton onClick={handleClickGridButton}>
                        <TechMainTitle fontSize={1} margin={'auto 8px'}>{clickGrid}</TechMainTitle>
                    </NavButton>
                    <NavButton>
                        <TechMainTitle fontSize={1} margin={'auto 8px'}>重新整理</TechMainTitle>
                    </NavButton>
                </TechNavRight>
            </TechNav>
            <TechMainContainer height={'40'}>
                <TechMainLeft>
                    {
                        lastData.map((item, index) => {
                            return (
                                <TechMainTitleContainer key={index}>
                                    <TechMainTitle>K線</TechMainTitle>
                                    <TechMainH4 ref={firstMa} color={'steelblue'} fontSize={'14px'} >MA5: {item.Ma5.toFixed(2)}</TechMainH4>
                                    <TechMainH4 ref={secondMa} color={'#FF9800'} fontSize={'14px'} >MA10: {item.Ma10.toFixed(2)}</TechMainH4>
                                    <TechMainH4 ref={thirdMa} color={'#9526AD'} fontSize={'14px'} >MA20: {item.Ma20.toFixed(2)}</TechMainH4>
                                </TechMainTitleContainer>
                            )
                        })
                    }
                </TechMainLeft>
                <TechMainSvg>
                    <Svg ref={svgRef} />
                </TechMainSvg>
            </TechMainContainer>
        </>
    )
};

const mapStateToProps = state => ({
    price: state.price,
})

const mapDispatchToProps = dispatch => {
    return {
        fetchPrice: (stockid) => dispatch(fetchPrice(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandlestickMain);