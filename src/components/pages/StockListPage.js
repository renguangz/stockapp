import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import DefaultLayout from '../layouts/DefaultLayout';
import { StockListColumns, data } from './StockListData';
import Container from '../common/Container';
import { MenuOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { listStock, addListStock } from '../../redux';
import styled from 'styled-components';

// Mocked
// import stockclose from '../images/mocked/stockclose.png';
import { StockListMockedData } from '../common/mocked_data/StockListMockedData';

const StyledContainer = styled(Container)`
    height: 100vh;
    width: 90%;
    margin: auto;
`;

const ListCardContainer = styled.div`
    border: 2px solid orangered;
    /* width: 90%; */
    height: 120px;
    /* margin: auto; */
    display: flex;
    justify-content: space-between;
    /* padding: 12px; */
`;

const ListCard = styled.div`
    border: 2px solid yellow;
    display: flex;
    width: 20%;
    border-radius: 8px;
`;

const TableOrder = styled.div`
    /* border: 2px solid red; */
    height: 10%;
    margin-top: 10%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    margin-bottom: -15px;
`;

const TableSwitch = styled.div`
    /* border: 2px solid green; */
    height: 100%;
    display: flex;
    /* justify-content: center;
    align-items: center; */
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AddStockInput = styled.input`

`;

const StyledTable = styled.table`
    /* border: 2px solid pink; */
    /* height: 60vh; */
    width: 100%;
    /* margin: auto; */
    /* margin-top: 80px; */
    /* border-radius: 12px; */
    border-collapse: collapse;
    /* border-spacing: 0 20px; */
    table-layout: fixed;
`;

const StyledThead = styled.thead`
    /* width: 80vw; */
    /* color: white; */
    /* border: 2px solid white; */
`;

const StyledTbody = styled.tbody`
    /* width: 100%; */
    /* border: 2px solid orange; */
`;

const StyledHeadTr = styled.tr`
    color: white;
    /* border: 2px solid white; */
    width: 100%;
    height: 70px;
    /* background-color: #F5F7F9; */
    /* border-radius: 12px; */
`;

const StyledBodyTr = styled.tr`
    width: 100%;
    height: 70px;
    /* border: 2px solid red; */
    background-color: #2C3845;
    &:nth-child(even) {
        background-color: black;
    }
`;

const StyledTh = styled.th`
    color: white;
    width: ${props => props.width || '50'}px;
    /* border: 2px solid white; */
`;

const StyledTd = styled.td`
    color: white;
    /* border: 2px solid white; */
`;

const MockedClose = styled.div`
    /* border: 2px solid white; */
    width: 80%;
    /* height: 70%; */
    height: 50px;
    margin: auto;
    display: flex;
    /* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */
    /* background-color: #554F24; */
    background-image: linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);
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
    width: 64%;
    height: 98%;
    margin: auto 0;
    margin-left: 2%;
    background-image: ${props => `url(${props.url})`};
    background-size: cover;
    background-position: center;
`;

const MockedAdvanced = styled.div`
    width: 100%;
    border-radius: 4px;
    background-color: #38C28E;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

const Advanced = styled.h3`
    margin: auto;
    color: white;
`;

const StockListPage = ({ stockListId, addStock }) => {
    // useEffect(() => {
    //     listStock()
    // }, [])
    const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

    // 做 addStock的搜尋
    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    return (
        <DefaultLayout noSidebar>
            <StyledContainer>
                {/* <Table columns={StockListColumns} dataSource={data} expandable={{
                    expandIcon: () => {
                        return (
                            <div style={{ display: 'flex' }}>
                                <DragHandle />
                                <MinusSquareOutlined />
                            </div>
                        )
                    }
                }}
                    pagination={false}
                />
                <button onClick={() => console.log(stockListId)} />
                <form>
                    <input type='text' value={search} onChange={inputSearch} />
                    <input type='submit' onSubmit={handleSubmit} />
                </form> */}
                <ListCardContainer>
                    <ListCard></ListCard>
                    <ListCard></ListCard>
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
                        <AddStockInput type='text' placeholder="新增股票" />
                        <input type="submit" value="➕" />
                    </AddStock>
                </TableOrder>
                <StyledTable>
                    <StyledThead>
                        <StyledHeadTr>
                            <StyledTh>操作</StyledTh>
                            <StyledTh>代碼</StyledTh>
                            <StyledTh width={100}>收盤、走勢圖</StyledTh>
                            <StyledTh width={48}>漲跌、漲幅</StyledTh>
                            <StyledTh>成交量</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                        </StyledHeadTr>
                    </StyledThead>
                    <StyledTbody>
                        {
                            StockListMockedData.map((data, index) => {
                                return (
                                    <StyledBodyTr>
                                        <StyledTd>actions</StyledTd>
                                        <StyledTd>{data.stockid}</StyledTd>
                                        <StyledTd>
                                            <MockedClose>
                                                <MockedPrice>
                                                    <Price>{data.close}</Price>
                                                </MockedPrice>
                                                <MockedImg url={data.url} />
                                            </MockedClose>
                                        </StyledTd>
                                        <StyledTd>
                                            <MockedAdvanced>
                                                <Advanced>{data.advance}</Advanced>
                                            </MockedAdvanced>
                                        </StyledTd>
                                        <StyledTd>{data.vol}</StyledTd>
                                    </StyledBodyTr>
                                )
                            })
                        }
                        <StyledBodyTr>
                            <StyledTd>this is first stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>
                                <MockedAdvanced>
                                    <Advanced>🔻 0.5 (0.01%)</Advanced>
                                </MockedAdvanced>
                            </StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                        </StyledBodyTr>
                    </StyledTbody>
                </StyledTable>
            </StyledContainer>
        </DefaultLayout>
    )
};

const mapStateToProps = state => {
    console.log(state.stockList)
    return {
        stockListId: state.stockList.stockid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listStock: dispatch(listStock()),
        addStock: (stockid) => dispatch(addListStock(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockListPage);