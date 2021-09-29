import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SideBarData, addStockToList } from './SideBarData';
import './sideBar.css';
import { connect } from 'react-redux';
import { fetchIdName, fetchBasic, addListStock, removeListStock, fetchChip, fetchMarginTrade, fetchSellBuy, fetchPrice } from '../../../redux';
import * as Storage from '../../helper/StorageHelper';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const Sidebar = styled.div`
    background-color: #272821;
    /* border: 1px solid grey; */
    height: 100vh;
    width: 20vw;
    display: flex;
    justify-content: center;
`;

const StyledStockName = styled.div`
    /* border: 2px solid green; */
    width: 80%;
    height: 120px;
    margin-bottom: 16%;
    margin-left: 10%;
`;

const StockName = styled.h2`
    font-size: ${props => props.fontSize || '1.8'}rem;
    color: ${props => props.color || 'white'};
`;

const SidebarContainer = styled.div`
    /* border: 1px solid goldenrod; */
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 8%;
    text-align: left;
`;

const SideBarButton = styled.div`
    /* border: 2px solid pink; */
    height: 50px;
    padding-left: 10%;
    margin-bottom: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #1890ff;
        background-color: #383838;
        // 點擊後加入background and border right
        /* border-right: 2px solid #1890ff; */
    }
`;

const Flex = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin: 0;
`;

const addToList = addStockToList

function SideBar({ price, fetchBasic, addStockToList, fetchChip, fetchMarginTrade, fetchSellBuy, fetchPrice }) {

    const scrollToAnchor = (anchorName) => {
        if (!!anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 14)
            }
        }

        if (anchorName === 'add') {
            addStockToList = !addStockToList
            console.log(addToList)
            console.log(addStockToList)
            addStockToList ? console.log('新增') : console.log('remove')
            // addStock(searchStockIdName) : removeStock(searchStockIdName)
        }
    }

    const handleScroll = e => {
        let current = '';
        const stockInfoId = ['move', 'basic', 'tech', 'chip', 'news']
        stockInfoId.forEach(id => {
            const section = e.target.getElementById(id)
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.pageYOffset >= (sectionTop - sectionHeight / 2.5)) {
                current = section.getAttribute('id')
            }
            Ref.current.map(i => {
                i.classList.remove('active')
                if (i.classList.contains(current)) {
                    i.classList.add('active')
                }
            })
        })
    }

    const Ref = useRef([])
    // console.log(Ref.current[4])
    // useEffect(() => {
    //     document.addEventListener('DOMContentLoaded', () => {
    //         window.addEventListener('scroll', handleScroll)
    //     })
    //     // window.addEventListener('scroll', handleScroll)
    // })

    const searchStockIdName = Storage.getData('stock_id_and_name')
    const searchStock = searchStockIdName.split('　')[0]
    useEffect(() => {
        // fetchBasicIncome(searchStock)
        fetchBasic(searchStock)
        fetchChip(searchStock)
        fetchMarginTrade(searchStock)
        fetchSellBuy(searchStock)
        fetchPrice(searchStock)
    }, [searchStock])

    const datas = price.price.slice(-80)
    const stockPrice = datas.slice(-1)
    const lastSecondData = datas[datas.length - 2]

    return (
        <Sidebar>
            <SidebarContainer>
                <StyledStockName>
                    <StockName fontSize={2}>{searchStockIdName}</StockName>
                    {
                        stockPrice.map(item => {
                            const lastDayClose = lastSecondData.Close
                            let color;
                            (item.Close > lastDayClose) ? (color = '#FF2627') : (item.Close === lastDayClose) ? (color = 'white') : (color = '#1DFF1E')
                            return (
                                <>
                                    <Flex>
                                        <StockName fontSize={1.8}>現:&ensp;</StockName>
                                        <StockName fontSize={1.8} color={color}>{item.Close}&ensp;</StockName>
                                        <StockName color={color}>{(item.Close > lastDayClose) ? <CaretUpOutlined style={{ fill: '#FF2627' }} /> : (item.Close === lastDayClose) ? '' : <CaretDownOutlined className='greenColor' />}</StockName>
                                        <StockName color={color}>{(Math.abs(item.Close - lastDayClose)).toFixed(2)}</StockName>
                                    </Flex>
                                </>
                            )
                        })
                    }
                </StyledStockName>
                {
                    SideBarData.map((data, index) => {
                        return (
                            <SideBarButton key={index} className={data.id} ref={ele => Ref.current[index] = ele} onClick={() => scrollToAnchor(data.id)}>{data.title}</SideBarButton>
                        )
                    })
                }
            </SidebarContainer>
        </Sidebar>
    )
}

const mapStateToProps = state => {
    return {
        // search: state.search,
        basic: state.basic,
        price: state.price,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIdName: () => dispatch(fetchIdName()),
        fetchBasic: (stockid) => dispatch(fetchBasic(stockid)),
        addStock: (stockid) => dispatch(addListStock(stockid)),
        removeStock: (stockid) => dispatch(removeListStock(stockid)),
        fetchChip: stockid => dispatch(fetchChip(stockid)),
        fetchMarginTrade: stockid => dispatch(fetchMarginTrade(stockid)),
        fetchSellBuy: stockid => dispatch(fetchSellBuy(stockid)),
        fetchPrice: stockid => dispatch(fetchPrice(stockid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
