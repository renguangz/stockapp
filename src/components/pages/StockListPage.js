import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Container from '../common/Container';
import { MenuOutlined, EditFilled, CloseSquareFilled, CaretUpOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { listStock, addListStock, removeListStock, fetchIdName, fetchBasic, fetchListInfo } from '../../redux';
import styled from 'styled-components';
import * as Storage from '../helper/StorageHelper';
import useResponsive from '../common/useResponsive';
import Taiwan_index from '../../data/taiwan_index.json';
import Dowj from '../../data/DOWJ.json';
import Spx from '../../data/SPX.json';
import Japan from '../../data/japan.json';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { drawSmallChart } from '../common/drawSmallChart';

const StyledContainer = styled(Container)`
    /* border: 1px solid greenyellow; */
    height: 89vh;
    width: 90%;
    margin: auto;
    @media screen and (max-width: 540px) {
        border: 1px solid yellow;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 96%;
    }
`;

const ListCardContainer = styled.div`
    /* border: 2px solid orangered; */
    display: flex;
    justify-content: space-between;
    transform: translateY(36px);
    @media screen and (max-width: 540px) {
        /* display: none; */
    }
`;

const ListCard = styled.div`
    border: 2px solid #999999;
    /* display: flex; */
    width: 20%;
    /* margin: 10%; */
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #808080;
    text-align: left;
    margin-bottom: -10px;
    padding: 4px;
`;

const ListCardChart = styled.div`
    /* border: 1px solid white; */
    display: flex;
`;

const TableOrder = styled.div`
    /* border: 2px solid red; */
    height: 10%;
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    margin-bottom: -15px;
    @media screen and (max-width: 540px) {
        /* display: none; */
    }
`;

const TableSwitch = styled.div`
    /* border: 2px solid green; */
    height: 100%;
    display: flex;
    @media screen and (max-width: 540px) {
        /* border: 1px solid red; */
    }
`;

const TableSwitchButton = styled.h3`
    color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    &:hover {
        border-bottom: 2px solid #1890ff;
        color: #1890ff;
    }
`;

const AddStock = styled.form`
    /* border: 2px solid green; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AddStockInput = styled.input``;

const AddStockButton = styled.button``;

const TableContainer = styled.div`
    /* border: 1px solid greenyellow; */
    @media screen and (max-width: 540px) {
        border: 1px solid yellow;
        /* overflow: scroll; */
        display: block;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

const StyledTable = styled.table`
    /* border: 2px solid pink; */
    width: 100%;
    border-collapse: collapse;
    font-size: ${props => props.fontSize}rem;
    overflow: hidden;
    @media screen and (max-width: 540px) {
        /* display: none; */
        border: 1px solid white;
    }
`;

const StyledThead = styled.thead``;

const StyledTbody = styled.tbody``;

const StyledHeadTr = styled.tr`
    /* border: 2px solid white; */
    color: white;
    width: 100%;
    height: 70px;
`;

const StyledBodyTr = styled.tr`
    /* border: 2px solid red; */
    width: 100%;
    height: 70px;
    background-color: #2C3845;
    &:nth-child(even) {
        background-color: black;
    }
`;

const StyledTh = styled.th`
    color: white;
    /* width: ${props => props.width || '50'}px; */
    @media screen and (max-width: 540px) {
        /* border: 1px solid red; */
    }
`;

const StickyStyledTh = styled(StyledTh)`
    @media screen and (max-width: 540px) {
        border: 1px solid pink;
        position: sticky;
        /* position: absolute; */
        left: 0;
    }
`;

const StyledTd = styled.td`
    color: ${props => props.fontColor || 'white'};
    font-weight: 700;
    font-size: 1.1rem;
    /* width: ${props => props.width || '50'}px; */
    text-align: ${props => props.textAlign || 'center'};
    /* border: 2px solid white; */
    white-space: nowrap;
    @media screen and (max-width: 540px) {
        /* border: 1px solid blue; */
        /* width: 100px; */
        font-size: 16px;
        padding: 0 8px;
    }
`;

const StickyStyledTd = styled(StyledTd)`
    @media screen and (max-width: 540px) {
        border: 1px solid red;
        position: sticky;
        position: -webkit-sticky;
        &:first-child {
            left: 0;
            z-index: 1;
            /* width: 70px; */
        }
        &:nth-child(2) {
            left: 0;
            /* left: 70px; */
            /* width: 70px; */
        }
    }
`;

const Action = styled.div`
    margin: auto;
    display: flex;
    justify-content: space-between;
    width: 64%;
`;

const SearchUl = styled.ul`
    border: 1px solid white;
    position: absolute;
    right: 5%;
    padding: 0;
`;

const SearchLi = styled.li`
    border: 1px solid pink;
    background-color: white;
    list-style: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
`;

const SearchSpan = styled.span`
    color: black;
`;

const StockListPage = ({ searchRedux, stockList, listStock, addStock, removeStock, fetchIdName, fetchBasic, fetchListInfo }) => {
    useEffect(() => {
        fetchIdName()
        listStock()
    }, [])
    const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

    const searchList = searchRedux.id_and_name.map(item => Object.values(item)[0])
    const filtered = (searchList, searchInput) => {
        return searchList.filter(value => {
            const regex = new RegExp(searchInput, 'g')
            return value.match(regex)
        })
    }
    const handleClick = (m) => {
        addStock(m)
        setSearch('')
        listStock()
    }
    const DisplayMatches = () => {
        const matchArray = filtered(searchList, search)
        if (search === '') {
            return null
        } else return (
            <>
                {
                    matchArray.map((m, index) => {
                        return (
                            <SearchLi key={index} onClick={() => handleClick(m)}>
                                <SearchSpan>{m}</SearchSpan>
                            </SearchLi>
                        )
                    })
                }
            </>
        )
    }

    // draw chart

    const taiwanDatas = Taiwan_index.slice(-80)
    const dowDatas = Dowj.slice(-80)
    const spxDatas = Spx.slice(-80)
    const japanDatas = Japan.slice(-80)

    const cardChartRef = useRef();
    const taiwanRef = useRef();
    const dowRef = useRef();
    const spxRef = useRef();
    const japanRef = useRef();
    useEffect(() => {
        const width = cardChartRef.current.offsetWidth
        const height = cardChartRef.current.offsetHeight

        drawSmallChart(height, width, taiwanRef, taiwanDatas, 'steelblue', 'steelblue', 'steelblue', 'areaGradient')
        drawSmallChart(height, width, dowRef, dowDatas, '#EDBB56', '#EDBB56', '#EDBB56', 'areaGradient1')
        drawSmallChart(height, width, spxRef, spxDatas, '#74C5A6', '#74C5A6', '#74C5A6', 'areaGradient2')
        drawSmallChart(height, width, japanRef, japanDatas, '#9D6ABC', '#9D6ABC', '#9D6ABC', 'areaGradient3')
        d3.selectAll('svg .domain').remove()
        // d3.select(taiwanRef.current).attr('transform', `translate(0, 10)`)

        d3.select(taiwanRef.current).append('text').text(`台灣指數`).attr('transform', `translate(0, 20)`).attr('fill', '#808080')
        d3.select(taiwanRef.current).append('text').text(`${taiwanDatas[79].close}`).attr('transform', `translate(0, 45)`).attr('class', `${taiwanDatas[79].close > taiwanDatas[78].close ? 'redColor' : 'greenColor'}`)
        d3.select(dowRef.current).append('text').text(`道瓊指數`).attr('transform', `translate(0, 20)`).attr('fill', '#808080')
        d3.select(dowRef.current).append('text').text(`${dowDatas[79].close}`).attr('transform', `translate(0, 45)`).attr('class', `${dowDatas[79].close > dowDatas[78].close ? 'redColor' : 'greenColor'}`)
        d3.select(spxRef.current).append('text').text(`標普500`).attr('transform', `translate(0, 20)`).attr('fill', '#808080')
        d3.select(spxRef.current).append('text').text(`${spxDatas[79].close}`).attr('transform', `translate(0, 45)`).attr('class', `${spxDatas[79].close > spxDatas[78].close ? 'redColor' : 'greenColor'}`)
        d3.select(japanRef.current).append('text').text(`日經指數`).attr('transform', `translate(0, 20)`).attr('fill', '#808080')
        d3.select(japanRef.current).append('text').text(`${japanDatas[79].close}`).attr('transform', `translate(0, 45)`).attr('class', `${japanDatas[79].close > japanDatas[78].close ? 'redColor' : 'greenColor'}`)
        // d3.select(taiwanRef.current).append('text').text(`${taiwanDatas[79].close}`).attr('transform', `translate(0, 65)`).attr('class', `${taiwanDatas[79].close > taiwanDatas[78].close ? 'redColor' : 'greenColor'}`)
    }, [])

    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }
    const handleSubmit = () => {
        const matchArray = filtered(searchList, search)
        addStock(matchArray[0])
        setSearch('')
        listStock()
    }

    const handleClickRemove = stockid => {
        removeStock(stockid)
        listStock()
    }

    const handleClickLink = (e) => {
        Storage.setData('stock_id_and_name', e)
        // fetchBasic(e)
    }

    const ListID = []

    // RWD
    const { windowWidth, screenType } = useResponsive();

    const [tableFontSize, setTableFontSize] = useState(0);
    const [displayTableCol, setDisplayTableCol] = useState(true)
    useEffect(() => {
        if (screenType === 'MOBILE') {
            setTableFontSize(0.8);
            setDisplayTableCol(false);
        } else if (screenType === 'TABLET') {
            setTableFontSize(0.9);
            setDisplayTableCol(true);
        } else {
            setTableFontSize(1.1);
            setDisplayTableCol(true);
        }
    }, [screenType])


    return (
        <DefaultLayout noSidebar>
            <StyledContainer>
                <ListCardContainer>
                    <ListCard >
                        <ListCardChart ref={cardChartRef}>
                            <svg ref={taiwanRef} />
                        </ListCardChart>
                    </ListCard>
                    <ListCard >
                        <ListCardChart ref={cardChartRef}>
                            <svg ref={dowRef} />
                        </ListCardChart>
                    </ListCard>
                    <ListCard >
                        <ListCardChart ref={cardChartRef}>
                            <svg ref={spxRef} />
                        </ListCardChart>
                    </ListCard>
                    <ListCard >
                        <ListCardChart ref={cardChartRef}>
                            <svg ref={japanRef} />
                        </ListCardChart>
                    </ListCard>
                </ListCardContainer>
                <TableOrder>
                    <TableSwitch>
                        <TableSwitchButton>自選一</TableSwitchButton>
                        <TableSwitchButton>自選二</TableSwitchButton>
                        <TableSwitchButton>自選三</TableSwitchButton>
                        <TableSwitchButton>自選四</TableSwitchButton>
                    </TableSwitch>
                    <AddStock>
                        <AddStockInput type='text' placeholder="新增股票" value={search} onChange={inputSearch} />
                        <AddStockButton onClick={handleSubmit}>➕</AddStockButton>
                    </AddStock>
                </TableOrder>
                <SearchUl>
                    <DisplayMatches />
                </SearchUl>
                <TableContainer>
                    <StyledTable>
                        <StyledThead>
                            <StyledHeadTr>
                                <StickyStyledTh width={20}><EditFilled style={{ fill: 'white' }} /></StickyStyledTh>
                                <StickyStyledTh width={76}>商品</StickyStyledTh>
                                <StyledTh>成交價</StyledTh>
                                {
                                    displayTableCol ? <StyledTh width={76}>走勢圖</StyledTh> : ''
                                }
                                <StyledTh width={48}>漲跌</StyledTh>
                                <StyledTh>幅度</StyledTh>
                                <StyledTh>成交量</StyledTh>
                                <StyledTh>開盤價</StyledTh>
                                <StyledTh>最高價</StyledTh>
                                <StyledTh>最低價</StyledTh>
                                <StyledTh>昨收</StyledTh>
                                <StyledTh>營收</StyledTh>
                                <StyledTh>毛利率</StyledTh>
                            </StyledHeadTr>
                        </StyledThead>
                        <StyledTbody>
                            {
                                stockList.stockListId.map((data, index) => {
                                    const d = data.stockid
                                    const splitID = d.split('　')[0]
                                    const splitName = d.split('　')[1]
                                    ListID.push(splitID)
                                    return (
                                        <StyledBodyTr key={index}>
                                            <StyledTd textAlign={'left'}>
                                                <Action>
                                                    <CloseSquareFilled style={{ fill: 'white' }} onClick={() => handleClickRemove(d)} />
                                                    <MenuOutlined style={{ fill: 'white' }} />
                                                </Action>
                                            </StyledTd>
                                            <StickyStyledTd onClick={() => handleClickLink(d)} textAlign={'center'}>
                                                <Link style={{ color: '#00AEFF' }} to='/stockinfo'>{splitID}<br />{splitName}</Link>
                                            </StickyStyledTd>
                                            <StyledTd fontColor={data.Close > data.last_close ? '#FF2627' : (data.Close === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{data.Close}</StyledTd>
                                            {
                                                displayTableCol ? <StyledTd>走勢圖</StyledTd> : ''
                                            }
                                            <StyledTd fontColor={data.Close > data.last_close ? '#FF2627' : (data.Close === data.last_close) ? '#E7DC61' : '#1DFF1E'}>
                                                {/* <TdFlex> */}
                                                    {data.Close === data.last_close ? '' : <CaretUpOutlined rotate={data.Close > data.last_close ? 0 : 180} className={data.Close > data.last_close ? 'redColor' : 'greenColor'} />}
                                                    {Math.abs((data.Close - data.last_close)).toFixed(2)}
                                                {/* </TdFlex> */}
                                            </StyledTd>
                                            <StyledTd fontColor={data.Close > data.last_close ? '#FF2627' : (data.Close === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{(Math.abs(data.Close - data.last_close) / data.Close * 100).toFixed(2)}%</StyledTd>
                                            <StyledTd fontColor={'#E7DC61'}>{data.Volume.toFixed(0)}</StyledTd>
                                            <StyledTd fontColor={data.Open > data.last_close ? '#FF2627' : (data.Open === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{data.Open}</StyledTd>
                                            <StyledTd fontColor={data.High > data.last_close ? '#FF2627' : (data.High === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{data.High}</StyledTd>
                                            <StyledTd fontColor={data.Low > data.last_close ? '#FF2627' : (data.Low === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{data.Low}</StyledTd>
                                            <StyledTd fontColor={'#E7DC61'}>{data.last_close}</StyledTd>
                                            <StyledTd fontColor={'#808080'}>{(data.benefit_total / 1000000).toFixed(1)}M</StyledTd>
                                            <StyledTd fontColor={'#808080'}>{data.grossMargin}%</StyledTd>
                                        </StyledBodyTr>
                                    )
                                })
                            }
                        </StyledTbody>
                    </StyledTable>
                </TableContainer>
            </StyledContainer>
        </DefaultLayout>
    )
};

const mapStateToProps = state => {
    return {
        stockList: state.stockList,
        searchRedux: state.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listStock: () => dispatch(listStock()),
        addStock: (stockid) => dispatch(addListStock(stockid)),
        removeStock: (stockid) => dispatch(removeListStock(stockid)),
        fetchIdName: () => dispatch(fetchIdName()),
        fetchListInfo: (stockid) => dispatch(fetchListInfo(stockid)),
        // fetchBasic: (stockid) => dispatch(fetchBasic(stockid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockListPage);