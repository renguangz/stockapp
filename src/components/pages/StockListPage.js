import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Container from '../common/Container';
import { MenuOutlined, MinusSquareOutlined, EditFilled, CloseSquareFilled, CaretUpOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { listStock, addListStock, removeListStock, fetchIdName, fetchBasic, fetchListInfo } from '../../redux';
import styled from 'styled-components';
import * as Storage from '../helper/StorageHelper';

// Mocked
import { StockListMockedData } from '../common/mocked_data/StockListMockedData';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
    /* border: 1px solid greenyellow; */
    height: 89vh;
    width: 90%;
    margin: auto;
`;

const ListCardContainer = styled.div`
    /* border: 2px solid orangered; */
    height: 180px;
    display: flex;
    justify-content: space-between;
    transform: translateY(36px);
`;

const ListCard = styled.div`
    border: 2px solid yellow;
    display: flex;
    width: 20%;
    border-radius: 8px;
    color: white;
`;

const TableOrder = styled.div`
    /* border: 2px solid red; */
    height: 10%;
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    margin-bottom: -15px;
`;

const TableSwitch = styled.div`
    /* border: 2px solid green; */
    height: 100%;
    display: flex;
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

const AddStockInput = styled.input`

`;

const AddStockButton = styled.button``;

const StyledTable = styled.table`
    /* border: 2px solid pink; */
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
`;

const StyledThead = styled.thead`
`;

const StyledTbody = styled.tbody`

`;

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
    width: ${props => props.width || '50'}px;
    /* border: 2px solid white; */
    font-size: 1.1rem;
    `;

const StyledTd = styled.td`
    color: ${props => props.fontColor || 'white'};
    font-weight: 700;
    font-size: 1.1rem;
    width: ${props => props.width || '50'}px;
    text-align: ${props => props.textAlign || 'center'};
    /* border: 2px solid white; */
    `;

const MockedClose = styled.div`
    /* border: 2px solid white; */
    width: 72%;
    /* height: 70%; */
    height: 60px;
    margin: auto;
    display: flex;
    border-radius: 8px;
`;

const MockedPrice = styled.div`
    /* border: 2px solid yellow; */
    width: 30%;
    height: 98%;
    margin: auto 0;
    display: flex;
    justify-content: center;
`;

const Price = styled.h3`
    color: white;
    margin: auto;
`;

const MockedImg = styled.div`
    /* border: 2px solid orange; */
    width: 100%;
    height: 100%;
    margin: auto 0;
    margin-left: 2%;
    background-image: ${props => `url(${props.url})`};
    background-size: cover;
    background-position: center;
`;

const MockedAdvanced = styled.div`
    width: 100%;
    border-radius: 4px;
    background-color: ${props => props.bgc};
    display: flex;
    flex-wrap: nowrap;
`;

const Advanced = styled.h3`
    margin: auto;
    color: white;
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

const StockListPage = ({ searchRedux, stockList, listStock, addStock, removeStock, fetchIdName, fetchListInfo }) => {
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
    }

    // stockList.stockListId.map(d => {
    //     console.log(d)
    // })
    const ListID = []
    let listInfo

    useEffect(() => {
        console.log(ListID)
        // fetchListInfo(ListID[0])
    }, [ListID])

    return (
        <DefaultLayout noSidebar>
            <StyledContainer>
                <ListCardContainer>
                    <ListCard>台股指數</ListCard>
                    <ListCard>總報酬</ListCard>
                    <ListCard></ListCard>
                    <ListCard></ListCard>
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
                <StyledTable>
                    <StyledThead>
                        <StyledHeadTr>
                            <StyledTh width={20}><EditFilled style={{ fill: 'white' }} /></StyledTh>
                            <StyledTh width={'76'}>商品</StyledTh>
                            <StyledTh>成交價</StyledTh>
                            <StyledTh width={76}>走勢圖</StyledTh>
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
                                        <StyledTd>
                                            <Action>
                                                <CloseSquareFilled style={{ fill: 'white' }} onClick={() => handleClickRemove(d)} />
                                                <MenuOutlined style={{ fill: 'white' }} />
                                            </Action>
                                        </StyledTd>
                                        <StyledTd onClick={() => handleClickLink(d)} textAlign={'right'}>
                                            <Link style={{ color: '#00AEFF' }} to='/stockinfo'>{splitID}&ensp;{splitName}</Link>
                                        </StyledTd>
                                        <StyledTd fontColor={data.Close > data.last_close ? '#FF2627' : (data.Close === data.last_close) ? '#E7DC61' : '#1DFF1E'}>{data.Close}</StyledTd>
                                        <StyledTd>走勢圖</StyledTd>
                                        <StyledTd fontColor={data.Close > data.last_close ? '#FF2627' : (data.Close === data.last_close) ? '#E7DC61' : '#1DFF1E'}>
                                            {data.Close === data.last_close ? '' : <CaretUpOutlined rotate={data.Close > data.last_close ? 0 : 180} className={data.Close > data.last_close ? 'redColor' : 'greenColor'} />}
                                            {Math.abs((data.Close - data.last_close)).toFixed(2)}
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
                        {/* {
                            StockListMockedData.map((data, index) => {
                                return (
                                    <StyledBodyTr key={index}>
                                        <StyledTd>
                                            <Action>
                                                <CloseSquareFilled />
                                                <MenuOutlined />
                                            </Action>
                                        </StyledTd>
                                        <StyledTd>{data.stockid}</StyledTd>
                                        <StyledTd>{data.close}</StyledTd>
                                        <StyledTd>
                                            <MockedClose>
                                                <MockedImg url={data.url} />
                                            </MockedClose>
                                        </StyledTd>
                                        <StyledTd>
                                            {
                                                data.increase ? (
                                                    <MockedAdvanced bgc={'#E41E63'}>
                                                        <Advanced>{data.advance}</Advanced>
                                                    </MockedAdvanced>
                                                ) : (
                                                    <MockedAdvanced bgc={'#38C28E'}>
                                                        <Advanced>{data.advance}</Advanced>
                                                    </MockedAdvanced>
                                                )
                                            }
                                        </StyledTd>
                                        <StyledTd>{data.vol}</StyledTd>
                                        <StyledTd>{data.hold} 張</StyledTd>
                                    </StyledBodyTr>
                                )
                            })
                        } */}
                    </StyledTbody>
                </StyledTable>
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
        // fetchBasic: stockid => dispatch(fetchBasic(stockid)),
        fetchListInfo: (stockid) => dispatch(fetchListInfo(stockid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockListPage);