import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { chipRightTop, chipRightBot } from '../common/mocked_data/ChipRight';
import { chipbot } from '../common/mocked_data/ChipBot';
import chiprighttop from '../images/mocked/chiprighttop1.jpeg';
import chip from '../images/mocked/chip.jpeg';
import { connect } from 'react-redux';
import { fetchChip } from '../../redux';
import './chipPage.css';

const ChipContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
    display: flex;
`;

const ChipLeft = styled.div`
    /* border: 1px solid red; */
    height: 100%;
    width: 60%;
    margin-right: 2%;
`;

const ChipTitle = styled.h2`
    color: grey;
    margin-bottom: 0;
    text-align: left;
    /* background-color: grey; */
    margin-top: ${props => props.margintop || '0'}px;
`;

const ChipLeftTop = styled.div`
    /* border: 1px solid white; */
    width: 96%;
    height: 48%;
    margin: 0 auto;
`;

const ButtonContainer = styled.div`
    border: 2px solid #2B3234;
    border-radius: 12px;
    height: 16%;
    width: 52%;
    display: flex;
    align-items: center;
    padding: 2px;
    margin: 0 auto;
`;

const ButtonChange = styled.div`
    /* border: 1px solid pink; */
    background-color: ${props => props.bgc};
    border-radius: 8px;
    width: 50%;
    height: 100%;
    cursor: pointer;
`;

const ButtonTitle = styled.h2`
    color: white;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.8rem;
`;

const ChipLeftBot = styled.div`
    /* border: 1px solid greenyellow; */
    width: 100%;
    height: 50%;
    margin: 8px auto;
`;

const ChipTable = styled.table`
    height: ${props => props.height || '100'}%;
    width: 100%;
    border-collapse: collapse;
    color: white;
    margin-top: ${props => props.margintop || '20'}px;
`;

const ChipHeadTr = styled.tr`
    border-bottom: 2px solid grey;
`;

const ChipTh = styled.th`
    color: ${props => props.color || 'white'};
    text-align: ${props => props.textalign || 'right'};
`;

const ChipBodytr = styled.tr`
    border-bottom: 2px solid #2A2A2A;
    &:last-child {
        border-bottom: none;
    }
`;

const ChipTd = styled.td`
    text-align: ${props => props.textalign || 'right'};
    color: ${props => props.color || 'white'};
`;

const ChipRight = styled.div`
    /* border: 1px solid gainsboro; */
    height: 100%;
    width: 38%;
`;

const ChipRightTop = styled.div`
    /* border: 1px solid white; */
    width: 100%;
    height: 52%;
`;

const ChipRightBot = styled.div`
    /* border: 1px solid greenyellow; */
    width: 100%;
    height: 44%;
    padding-top: 8px;
`;

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const RightBotNav = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
    height: 34px;
    display: flex;
`;

const RadioLabel = styled.label`
    /* border: 2px solid pink; */
    display: inline-block;
    border-radius: 8px;
    font-size: 1rem;
    /* background-color: goldenrod; */
    cursor: pointer;
    width: 50%;
    height: 100%;
    line-height: 100%;
`;

const RightBotRadio = styled.div`
    border: 2px solid #2A3033;
    border-radius: 8px;
    margin: auto 4px;
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    padding: 1px;
`;

const RadioButton = styled.div`
    /* border: 1px solid pink; */
    background-color: ${props => props.bgc};
    border-radius: 6px;
    height: 100%;
    width: 50%;
    cursor: pointer;
`;

const RadioButtonTitle = styled.h2`
    color: white;
    font-size: 1rem;
    line-height: 1.25rem;
`;

const DropSelectButton = styled.div`
    display: flex;
    background-color: #2C3235;
    margin: 4px 8px;
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

const ChipSvg = styled.svg`
    /* border: 1px solid red; */
    height: 280px;
    width: 620px;
`;

const ChipPage = ({ chipInfo, price, marginTrade }) => {

    const [LeftButtonBgc, setLeftButtonBgc] = useState('#2B3234');
    const [rightButtonBgc, setRightButtonBgc] = useState('transparent')
    const [chipDatasDisplay, setChipDatasDisplay] = useState(true);
    const handleClickLeftButton = () => {
        setLeftButtonBgc('#2B3234')
        setRightButtonBgc('transparent')
        setChipDatasDisplay(true)
    }
    const handleClickRightButton = () => {
        setLeftButtonBgc('transparent')
        setRightButtonBgc('#2B3234')
        setChipDatasDisplay(false)
    }

    const [buyButtonBgc, setBuyButtonBgc] = useState('#2B3234')
    const [sellButtonBgc, setSellButtonBgc] = useState('transparent')
    const handleClickBuyButton = () => {
        setBuyButtonBgc('#2B3234')
        setSellButtonBgc('transparent')
    }
    const handleClickSellButton = () => {
        setBuyButtonBgc('transparent')
        setSellButtonBgc('#2B3234')
    }

    const datas = chipInfo.data.slice(-11)
    const reverseData = chipInfo.data.slice(-11).reverse();
    const keys = ['foreign_invest', 'credit', 'self_employee']
    const stackDatas = d3.stack().keys(keys).offset(d3.stackOffsetDiverging)(datas)

    const marginDatas = marginTrade.data.slice(-11)

    const margin_trade_array = []
    const short_sell_array = []
    const total_offset_array = []
    marginTrade && marginDatas && marginDatas.map(item => {
        margin_trade_array.push(item.margin_trade_total)
        short_sell_array.push(item.short_sell_total)
        total_offset_array.push(item.total_offset)
    })
    margin_trade_array.reverse()
    short_sell_array.reverse()
    total_offset_array.reverse()
    const marginKeys = ['margin_trade_total', 'short_sell_total']
    const stackMarginData = d3.stack().keys(marginKeys).offset(d3.stackOffsetDiverging)(marginDatas)

    const priceDatas = price.price.slice(-11)
    const displayPrice = []
    priceDatas.map(item => {
        displayPrice.push(item.Close)
    })
    displayPrice.reverse()

    const chipRef = useRef();
    const chipSvg = d3.select(chipRef.current)
    const width = 620;
    const height = 280;

    useEffect(() => {

        const margin = { top: 10, left: 80, bottom: 30, right: 50 }
        const innerHeight = height - margin.top - margin.bottom
        const innerWidth = width - margin.left - margin.right
        const g = chipSvg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

        const xScale = d3.scaleBand()
            .domain(datas.map(d => d.date.split(' ')[0].split('-')[2]))
            .range([0, innerWidth])
            .padding(0.3)

        const yAxisMaxValue = Math.max(Math.abs(d3.min(datas, d => d.total_invest)), d3.max(datas, d => d.total_invest)) * 1.2
        const yAxisTickvalue = [-yAxisMaxValue, -yAxisMaxValue * 2 / 3, -yAxisMaxValue / 3, 0, yAxisMaxValue / 3, yAxisMaxValue * 2 / 3, yAxisMaxValue]
        const yScale = d3.scaleLinear()
            .domain([-yAxisMaxValue, yAxisMaxValue])
            .range([innerHeight, 0])
        const yExtentRight = [d3.min(displayPrice) * 0.95, d3.max(displayPrice) * 1.05]
        const yRightTickvalues = [yExtentRight[0].toFixed(1), (yExtentRight[0] + (yExtentRight[1] - yExtentRight[0]) / 4).toFixed(1), (yExtentRight[0] + (yExtentRight[1] - yExtentRight[0]) / 2).toFixed(1), (yExtentRight[0] + (yExtentRight[1] - yExtentRight[0]) / 4 * 3).toFixed(1), yExtentRight[1].toFixed(1)]
        const yScaleRight = d3.scaleLinear()
            .domain(yExtentRight)
            .range([innerHeight, 0])

        const xAxis = d3.axisBottom(xScale).tickSize(0)
        const yAxis = d3.axisLeft(yScale).tickValues(yAxisTickvalue).tickSize(0)
        const yAxisRight = d3.axisRight(yScaleRight).tickValues(yRightTickvalues).tickSize(0)
        const xAxisG = g.append('g').attr('class', 'chip-x-axis').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
        const yAxisG = g.append('g').call(yAxis).attr('class', 'legalPersonDisplay').attr('transform', `translate(0, 0)`)
        const yAxisRightG = g.append('g').call(yAxisRight).attr('transform', `translate(${innerWidth}, 0)`)

        const color = d3.scaleOrdinal()
            .range(['#1889D0', '#E34E40', '#7B4EA4'])

        // background bar
        g.selectAll('rect').data(datas, d => d.date).enter()
            .append('rect').attr('class', 'bgc-bar')
            .attr('x', d => xScale(d.date.split(' ')[0].split('-')[2]))
            .attr('y', d => yScale(yAxisMaxValue))
            .attr('width', xScale.bandwidth())
            .attr('height', innerHeight)
            .attr('fill', '#171C1D')

        g.selectAll('.stacked-bar').data(stackDatas).enter().append('g').attr('class', 'stacked-bar legalPersonDisplay')
            .attr('fill', item => { return color(item.key) })
            .selectAll('.bar-chart').data(layer => layer).enter().append('rect')
            .attr('x', item => { return xScale(item.data.date.split(' ')[0].split('-')[2]) })
            .attr('y', item => { return yScale(item[1]) })
            .attr('width', xScale.bandwidth())
            .attr('height', item => { return Math.abs(yScale(item[0]) - yScale(item[1])) })
        // .attr('rx', 12)
        // .attr('ry', 12)

        // const rx = 12;
        // const ry = 12;
        // g.selectAll('.stacked-bar').data(stackDatas).enter().append('g').attr('class', 'stacked-bar')
        //     .attr('fill', item => { return color(item.key) })
        //     .selectAll('.bar-chart').data(layer => layer).enter().append('path')
        //     .attr('d', item => `
        //         M${xScale(item.data.date.split(' ')[0].split('-')[2])}, ${yScale(item[1]) + ry}
        //         h${xScale.bandwidth() - rx}
        //         a${rx}, ${ry} 0 0 1 ${rx}, ${-ry}
        //         v${innerHeight - yScale(item[1]) - ry}
        //         a${rx}, ${ry} 0 0 1 ${rx}, ${ry}
        //         h${-xScale.bandwidth()}Z
        // `)
        // Move to bottom left corner => M x,y
        // Line to bottom of top left arc => L x,y-height+radius
        // Arc to top of top left arc => A radius,radius,0,0,1,x+radius,y-height
        // Line to the top of the top right arc => L x+width-r,y-height
        // Arc to the bottom of the top right arc. => A radius,radius,0,0,1,x+width,y-height+radius
        // Line to the bottom right corner => L x+width,y
        // Close path. => Z


        const mtYAxisMaxValue = d3.max(stackMarginData[stackMarginData.length - 1], d => d[0] + d[1]) * 1.5
        const mtYAxisTicks = mtYAxisMaxValue / 3
        const mtYAxisTickValue = [-mtYAxisMaxValue, -mtYAxisTicks * 2, -mtYAxisTicks, 0, mtYAxisTicks, mtYAxisTicks * 2, mtYAxisMaxValue]

        const mtYScale = d3.scaleLinear()
            .domain([-mtYAxisMaxValue, mtYAxisMaxValue])
            .range([innerHeight, 0])
        const mtYAxis = d3.axisLeft(mtYScale).tickValues(mtYAxisTickValue).tickSize(0)
        const mtYAxisG = g.append('g').call(mtYAxis).attr('class', 'marginTradeDisplay')

        const mtColor = d3.scaleOrdinal()
            .range(['#029899', '#84584A'])
        g.selectAll('.stackedMarginTrade').data(stackMarginData).enter().append('g').attr('class', ' stacked-bar marginTradeDisplay')
            .attr('fill', item => { return mtColor(item.key) })
            .selectAll('.mt-bar-chart').data(layer => layer).enter().append('rect')
            .attr('x', item => xScale(item.data.date.split('-')[2]))
            .attr('y', item => { return mtYScale(item[1]) })
            .attr('width', xScale.bandwidth())
            .attr('height', item => { return Math.abs(mtYScale(item[0]) - mtYScale(item[1])) })


        const pricePath = d3.line()
            .x(d => xScale(d.Date.split('/')[2]))
            .y(d => yScaleRight(d.Close))

        g.append('path').datum(priceDatas)
            .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', '#F6B305')
            .attr('stroke-width', 2)
            .attr('d', pricePath)

        // g.append('circle').datum(priceDatas)
        //     .attr('cx', d => d.map(item => xScale(item.Date.split('/')[2])))
        //     .attr('cy', d => d.map(item => yScaleRight(item.Close)))
        //     .attr('r', 5)
        //     .attr('fill', 'yellow')



        const legalPersonDisplay = chipSvg.selectAll('.legalPersonDisplay, .legalPersonDisplay text')
        const marginTradeDisplay = chipSvg.selectAll('.marginTradeDisplay, .marginTradeDisplay text')
        chipDatasDisplay ? (legalPersonDisplay.attr('opacity', 1)) : (legalPersonDisplay.attr('opacity', 0))
        chipDatasDisplay ? (marginTradeDisplay.attr('opacity', 0)) : (marginTradeDisplay.attr('opacity', 1))

        xAxisG.selectAll('.tick text').attr('transform', `translate(0, 8)`)
        g.selectAll('.domain').remove()
    })


    return (
        <ChipContainer>
            <ChipLeft>
                <ChipTitle>三大法人 融資融券</ChipTitle>
                <ChipLeftTop>
                    <ButtonContainer>
                        <ButtonChange bgc={LeftButtonBgc} onClick={handleClickLeftButton}>
                            <ButtonTitle>三大法人</ButtonTitle>
                        </ButtonChange>
                        <ButtonChange bgc={rightButtonBgc} onClick={handleClickRightButton}>
                            <ButtonTitle>融資融券</ButtonTitle>
                        </ButtonChange>
                    </ButtonContainer>
                    <ChipSvg ref={chipRef} />
                </ChipLeftTop>
                <ChipLeftBot>
                    <ChipTable height={'0'}>
                        <thead>
                            <ChipHeadTr>
                                <ChipTh textalign={'left'}>日期</ChipTh>
                                <ChipTh color={'#1889D0'}>外資</ChipTh>
                                <ChipTh color={'#E34E40'}>投信</ChipTh>
                                <ChipTh color={'#7B4EA4'}>自營商</ChipTh>
                                <ChipTh>法人合計</ChipTh>
                                <ChipTh color={'#029899'}>融資</ChipTh>
                                <ChipTh color={'#84584A'}>融券</ChipTh>
                                <ChipTh>資券相抵</ChipTh>
                                <ChipTh color={'#FEB805'}>股價</ChipTh>
                            </ChipHeadTr>
                        </thead>
                        <tbody>
                            {
                                reverseData.map((data, index) => {
                                    console.log(index)
                                    return (
                                        <ChipBodytr key={index}>
                                            <ChipTd textalign={'left'}>{data.date.split(' ')[0]}</ChipTd>
                                            <ChipTd color={data.foreign_invest > 0 ? '#FF2627' : data.foreign_invest == 0 ? 'white' : '#1DFF1E'}>{data.foreign_invest}</ChipTd>
                                            <ChipTd color={data.credit > 0 ? '#FF2627' : data.credit == 0 ? 'white' : '#1DFF1E'}>{data.credit}</ChipTd>
                                            <ChipTd color={data.self_employee > 0 ? '#FF2627' : data.self_employee == 0 ? 'white' : '#1DFF1E'}>{data.self_employee}</ChipTd>
                                            <ChipTd color={data.total_invest > 0 ? '#FF2627' : data.total_invest == 0 ? 'white' : '#1DFF1E'}>{data.total_invest}</ChipTd>
                                            <ChipTd color={margin_trade_array[index] > 0 ? '#FF2627' : margin_trade_array[index] === 0 ? 'white' : '#1DFF1E'}>{margin_trade_array[index]}</ChipTd>
                                            <ChipTd color={short_sell_array[index] > 0 ? '#FF2627' : short_sell_array[index] == 0 ? 'white' : '#1DFF1E'}>{short_sell_array[index]}</ChipTd>
                                            <ChipTd>{total_offset_array[index]}</ChipTd>
                                            <ChipTd>{displayPrice[index]}</ChipTd>
                                        </ChipBodytr>
                                    )
                                })
                            }
                        </tbody>
                    </ChipTable>
                </ChipLeftBot>
            </ChipLeft>
            <ChipRight>
                <ChipTitle>籌碼分布</ChipTitle>
                <ChipRightTop>
                    <ChipImg url={chiprighttop} />
                    <ChipTable margintop={'0'} height={'0'}>
                        <thead>
                            <ChipHeadTr>
                                <ChipTh textalign={'left'}>項目</ChipTh>
                                <ChipTh>持股張數</ChipTh>
                                <ChipTh>持股比例</ChipTh>
                            </ChipHeadTr>
                        </thead>
                        <tbody>
                            {
                                chipRightTop.map(data => {
                                    return (
                                        <ChipBodytr>
                                            <ChipTd textalign={'left'}>{data.name}</ChipTd>
                                            <ChipTd>{data.hold}</ChipTd>
                                            <ChipTd>{data.percent}</ChipTd>
                                        </ChipBodytr>
                                    )
                                })
                            }
                        </tbody>
                    </ChipTable>
                </ChipRightTop>
                <ChipRightBot>
                    <ChipTitle margintop={'12'}>15大券商進出</ChipTitle>
                    <RightBotNav>
                        <DropSelectButton>
                            <DropSelect>
                                <option>近日</option>
                                <option>5日</option>
                                <option>10日</option>
                                <option>30日</option>
                            </DropSelect>
                        </DropSelectButton>
                        <RightBotRadio>
                            <RadioButton bgc={buyButtonBgc} onClick={handleClickBuyButton}>
                                <RadioButtonTitle>買超券商</RadioButtonTitle>
                            </RadioButton>
                            <RadioButton bgc={sellButtonBgc} onClick={handleClickSellButton}>
                                <RadioButtonTitle>賣超券商</RadioButtonTitle>
                            </RadioButton>
                        </RightBotRadio>
                    </RightBotNav>
                    <ChipTable margintop={'0'} height={'0'}>
                        <thead>
                            <ChipHeadTr>
                                <ChipTh textalign={'left'}>券商</ChipTh>
                                <ChipTh>買進</ChipTh>
                                <ChipTh>賣出</ChipTh>
                                <ChipTh>買賣超</ChipTh>
                                <ChipTh>成交比例</ChipTh>
                            </ChipHeadTr>
                        </thead>
                        <tbody>
                            {
                                chipRightBot.map(data => {
                                    return (
                                        <ChipBodytr>
                                            <ChipTd textalign={'left'}>{data.name}</ChipTd>
                                            <ChipTd>{data.buy}</ChipTd>
                                            <ChipTd>{data.sell}</ChipTd>
                                            <ChipTd>{data.total}</ChipTd>
                                            <ChipTd>{data.percent}</ChipTd>
                                        </ChipBodytr>
                                    )
                                })
                            }
                        </tbody>
                    </ChipTable>
                </ChipRightBot>
            </ChipRight>
        </ChipContainer>
    )
};

const mapStateToProps = state => {
    return {
        chipInfo: state.chip,
        price: state.price,
        marginTrade: state.marginTrade,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChip: stockid => dispatch(fetchChip(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChipPage);