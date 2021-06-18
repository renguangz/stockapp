import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import DefaultLayout from '../layouts/DefaultLayout';
import { StockListColumns, data } from './StockListData';
import Container from '../common/Container';
import { MenuOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { listStock, addListStock } from '../../redux';

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
            <Container>
                <Table columns={StockListColumns} dataSource={data} expandable={{
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
                {/* 做 addStock的搜尋 */}
                <form>
                    <input type='text' value={search} onChange={inputSearch} />
                    <input type='submit' onSubmit={handleSubmit} />
                </form>
            </Container>
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