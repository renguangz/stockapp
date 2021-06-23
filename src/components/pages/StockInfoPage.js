import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import { fetchStock } from '../../redux';
import { connect } from 'react-redux';
import stock1 from '../images/mocked/base.png';
import stock2 from '../images/mocked/fundstock.png';
import movingstock from '../images/mocked/movingstock.png';

const StyledInfoContainer = styled.div`
    width: 100%;
    height: 90vh;
    /* border: 1px solid blue; */
    color: white;
    display: flex;
    padding-top: 20px;
`;

const MovingContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
`;

const MovingImg = styled.div`
    background-image: url(${movingstock});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
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
    /* border: 2px solid yellow; */
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

const NewsContainer = styled.div`
    border: 2px solid yellow;
    width: 100%;
    height: 100%;
    display: flex;
`;

const NewsSection = styled.div`
    border: 2px solid green;
    width: 40%;
    height: 76%;
    margin: auto 4%;
`;

const News = styled.span`
    color: white;
`;

const StockInfoPage = ({ stockinfo }) => {
    useEffect(() => {
        console.log(stockinfo)
        fetchStock()
    }, [])

    return (
        <DefaultLayout>
            <StyledInfoContainer>
                <MovingContainer>
                    <MovingImg />
                </MovingContainer>
            </StyledInfoContainer>
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
            <StyledInfoContainer>
                <NewsContainer>
                    消息面
                    <NewsSection>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                    </NewsSection>
                    <NewsSection></NewsSection>
                </NewsContainer>
            </StyledInfoContainer>
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