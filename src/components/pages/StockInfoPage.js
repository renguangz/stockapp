import React, { useEffect, useState } from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import styled from 'styled-components';
import { fetchStock, fetchIdName, clickSearch, fetchBasic } from '../../redux';
import { connect } from 'react-redux';
import StockInfoTable from '../layouts/StockInfotable';
import * as Storage from '../helper/StorageHelper';
import InfoTableBasicChart from '../layouts/InfoTableBasicChart';
import CandleStickChart from '../layouts/InfoTechCandlestickChart/CandlestickChart';
import ChipPage from '../layouts/ChipPage';
import useResponsive from '../common/useResponsive';
import StockMove from '../layouts/stockMove';

const StyledInfoContainer = styled.section`
    /* border: 1px solid blue; */
    width: 100%;
    height: 90vh;
    color: white;
    display: flex;
    padding-top: 20px;
`;

const FundTableContainer = styled.div`
    /* border: 2px solid orange; */
    width: ${props => props.width}%;
    margin-right: ${props => props.marginRight}px;
`;

const SearchLi = styled.li`
    /* border: 1px solid pink; */
    background-color: #EEF2F8;
    background-color: #4A4A4A;
    list-style: none;
    height: 48px;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    margin-top: 12px;
    margin-right: 12px;
    border-radius: 4px;
`;

const SearchSpan = styled.span`
    color: white;
    font-size: 20px;
`;


const StockInfoPage = ({ searchRedux, clickSearch }) => {
    useEffect(() => {
        fetchStock()
        fetchIdName()
    }, [])

    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }
    const searchList = searchRedux.id_and_name.map(item => Object.values(item)[0])
    const filtered = (searchList, searchInput) => {
        return searchList.filter(value => {
            const regex = new RegExp(searchInput, 'g')
            return value.match(regex)
        })
    }

    const handleClick = (m) => {
        setSearch('')
        Storage.setData('stock_id_and_name', m)
        Storage.setData('notSearch', false)
        clickSearch(m)
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

    const { screenType } = useResponsive();

    const [tableWidth, setTableWidth] = useState(36);
    const [tableMarginRight, setTableMarginRight] = useState(0);
    useEffect(() => {
        if (screenType === 'DESKTOP') {
            setTableWidth(36)
            setTableMarginRight(0)
        } else if (screenType === 'TABLET') {
            setTableWidth(48)
            setTableMarginRight(12)
        } else {
            setTableWidth(48)
            setTableMarginRight(12)
        }
    }, [screenType])

    return (
        <>
            <SidebarLayout>
                <StyledInfoContainer id='move'>
                    <StockMove />
                </StyledInfoContainer >
                <StyledInfoContainer id='basic'>
                    <InfoTableBasicChart />
                    <FundTableContainer width={tableWidth} marginRight={tableMarginRight}>
                        <StockInfoTable />
                    </FundTableContainer>
                </StyledInfoContainer>
                <StyledInfoContainer id='tech'>
                    <CandleStickChart />
                </StyledInfoContainer>
                <StyledInfoContainer id='chip'>
                    <ChipPage />
                </StyledInfoContainer>
            </SidebarLayout >
        </>
    )
};

const mapStateToProps = state => {
    return {
        stockinfo: state.stockInfo.stockinfo,
        searchRedux: state.search,
        basic: state.basic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clickSearch: (s) => dispatch(clickSearch(s)),
        fetchBasic: (stockid) => dispatch(fetchBasic(stockid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoPage);