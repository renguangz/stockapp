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

const StyledContainer = styled(Container)`
    height: 100vh;
`;

const ListCardContainer = styled.div`
    border: 2px solid orangered;
    width: 90%;
    height: 120px;
    margin: auto;
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

const StyledTable = styled.table`
    /* border: 2px solid pink; */
    /* height: 60vh; */
    width: 90%;
    margin: auto;
    margin-top: 90px;
    border-radius: 12px;
    border-collapse: separate;
    border-spacing: 0 20px;
    table-layout: fixed;
`;

const StyledThead = styled.thead`
    width: 80vw;
    /* color: white; */
    /* border: 2px solid white; */
`;

const StyledTbody = styled.tbody`
    width: 100%;
    /* border: 2px solid orange; */
`;

const StyledHeadTr = styled.tr`
    color: white;
    /* border: 2px solid white; */
    width: 100%;
    height: 40px;
    background-color: goldenrod;

`;

const StyledBodyTr = styled.tr`
    width: 100%;
    height: 60px;
    /* border: 2px solid red; */
    border-radius: 12px;
    background-color: grey;
`;

const StyledTh = styled.th`
    color: white;
    width: ${props => props.width || '50'}px;
    /* border: 2px solid white; */
`;

const StyledTd = styled.td`
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
                <StyledTable>
                    <StyledThead>
                        <StyledHeadTr>
                            <StyledTh>操作</StyledTh>
                            <StyledTh>代碼</StyledTh>
                            <StyledTh>名稱</StyledTh>
                            <StyledTh width={100}>收盤、走勢圖</StyledTh>
                            <StyledTh>漲跌、漲幅</StyledTh>
                            <StyledTh>成交量</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                            <StyledTh>stock name</StyledTh>
                        </StyledHeadTr>
                    </StyledThead>
                    <StyledTbody>
                        <StyledBodyTr>
                            <StyledTd>first stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                            <StyledTd>second stock</StyledTd>
                        </StyledBodyTr>
                        <StyledBodyTr>
                            <StyledTd>this is first stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
                            <StyledTd>this is second stock</StyledTd>
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