import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import { fetchStock } from '../../redux';
import { connect } from 'react-redux';

const StyledInfoContainer = styled.div`
    width: 100%;
    height: 500px;
    /* border: 1px solid blue; */
    color: white;
`;

const StockInfoPage = ({ stockinfo }) => {
    useEffect(() => {
        console.log(stockinfo)
        fetchStock()
    }, [])

    const [state1, setState1] = useState('stockinfo')

    return (
        <DefaultLayout>
            <StyledInfoContainer>基本面</StyledInfoContainer>
            <StyledInfoContainer>技術面</StyledInfoContainer>
            <StyledInfoContainer>籌碼面</StyledInfoContainer>
            <StyledInfoContainer>消息面</StyledInfoContainer>
            this is stock info page
        </DefaultLayout>
    )
};

const mapStateToProps = state => {
    console.log(state.stockInfo.stockinfo)
    return {
        stockinfo: state.stockInfo.stockinfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStock: dispatch(fetchStock())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoPage);