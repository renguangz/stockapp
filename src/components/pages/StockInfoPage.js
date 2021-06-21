import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import { fetchStock } from '../../redux';
import { connect } from 'react-redux';
import stock1 from '../images/mocked/base.png';
import stock2 from '../images/mocked/fundstock.png';

const StyledInfoContainer = styled.div`
    width: 100%;
    height: 90vh;
    /* border: 1px solid blue; */
    color: white;
    display: flex;
    padding-top: 20px;
`;

const FundImgContainer = styled.div`
    height: 100%;
    width: 68%;
    border: 2px solid yellow;
    margin-right: 16px;
    display: flex;
    flex-wrap: wrap;
`;

const FundImgBorder = styled.div`
    border: 2px solid green;
    width: 46.4%;
    height: 30%;
    margin: 12px;
`;

const FundTableContainer = styled.div`
    border: 2px solid orange;
    width: 36%;
`;

const ChipContainer = styled.div`
    border: 2px solid yellow;
    width: 100%;
    height: 100%;
`;

const Img = styled.div`
    background-image: ${(props) => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 90%;
`;

const StockInfoPage = ({ stockinfo }) => {
    useEffect(() => {
        console.log(stockinfo)
        fetchStock()
    }, [])

    return (
        <DefaultLayout>
            <StyledInfoContainer>
                <FundImgContainer>
                    <FundImgBorder>
                        柱狀圖一
                        <Img url={stock2} />
                    </FundImgBorder>
                    <FundImgBorder>柱狀圖一</FundImgBorder>
                    <FundImgBorder>柱狀圖一</FundImgBorder>
                    <FundImgBorder>柱狀圖一</FundImgBorder>
                    <FundImgBorder>柱狀圖一</FundImgBorder>
                    <FundImgBorder>柱狀圖一</FundImgBorder>
                </FundImgContainer>
                <FundTableContainer>
                    基本面明細
                    <Img url={stock1} />
                </FundTableContainer>
            </StyledInfoContainer>
            <StyledInfoContainer>技術面</StyledInfoContainer>
            <StyledInfoContainer>
                <ChipContainer>
                    籌碼面
                </ChipContainer>
            </StyledInfoContainer>
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