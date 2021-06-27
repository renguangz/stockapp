import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import { fetchStock } from '../../redux';
import { connect } from 'react-redux';
import stock1 from '../images/mocked/base.png';
import stock2 from '../images/mocked/fundstock.png';
import movingstock from '../images/mocked/movingstock.png';
import StockInoTable from '../layouts/StockInfotable';
import { row1, row2, row3 } from '../common/mocked_data/StockInfoMoving';
import { mockedRightRow1, mockedRightRow2, mockedRightRow3, mockedRightRow4 } from '../common/mocked_data/StockinfoRightTop';

const StyledInfoContainer = styled.div`
    width: 100%;
    height: 90vh;
    /* border: 1px solid blue; */
    color: white;
    display: flex;
    padding-top: 20px;
`;

const MovingContainer = styled.div`
    border: 2px solid yellow;
    width: 100%;
    height: 100%;
    display: flex;
`;

const MovingImg = styled.div`
    background-image: url(${movingstock});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
`;

const MovingLeft = styled.div`
    height: 100%;
    border: 1px solid greenyellow;
    width: 64%;
    margin-right: 12px;
`;

const LeftTop = styled.div`
    border: 1px solid pink;
    width: 98%;
    height: 68%;
    margin: 4px auto;
`;

const LeftBot = styled.div`
    border: 1px solid white;
    width: 98%;
    height: 30%;
    margin: auto;
`;

const BotRow = styled.div`
    border: 1px solid goldenrod;
    width: 100%;
    height: 28%;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BotItem = styled.div`
    /* border: 1px solid pink; */
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 0 8px;

`;

const BotItemTitle = styled.h2`
    color: white;
    margin: auto 0;
`;

const BotItemNum = styled.h2`
    color: white;
    margin: auto 0;
    color: ${props => props.fall === 'white' ? 'white' :
        props.fall ? 'green' : 'red'};
`;

const MovingRight = styled.div`
    height: 100%;
    width: 36%;
    border: 1px solid orange;
`;

const RightTop = styled.div`
    border: 1px solid pink;
    width: 100%;
    height: 40%;
    margin-top: 4px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
`;

const TopCol = styled.div`
    border: 1px solid greenyellow;
    height: 80%;
    width: 24%;
    padding: 0 12px;
    text-align: ${props => props.textalign};
    font-size: 1rem;
`;

const ColNum = styled.h3`
    color: white;
`;

const RightBot = styled.div`
    border: 1px solid gold;
    width: 100%;
    height: 56%;
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
    /* border: 2px solid green; */
    width: 40%;
    height: 76%;
    margin: auto 4%;
    transform: ${props => `translate(${props.translate})`};
`;

const NewsTitleContainer = styled.div`
    display: flex;
`;

const NewsTitle = styled.h2`
    color: white;
    text-align: start;
`;

const NewsDate = styled.span`
    color: white;
    font-size: 0.5rem;
`;

const News = styled.p`
    display: inline-block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
    color: white;
    text-align: start;
    text-overflow: ellipsis;
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
                    {/* <MovingImg /> */}
                    <MovingLeft>
                        <LeftTop>
                            走勢圖
                        </LeftTop>
                        <LeftBot>
                            <BotRow>
                                {
                                    row1.map((data, index) => {
                                        return (
                                            <BotItem>
                                                <BotItemTitle>{data.title}</BotItemTitle>
                                                <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                            </BotItem>
                                        )
                                    })
                                }
                            </BotRow>
                            <BotRow>
                                {
                                    row2.map((data, index) => {
                                        return (
                                            <BotItem>
                                                <BotItemTitle>{data.title}</BotItemTitle>
                                                <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                            </BotItem>
                                        )
                                    })
                                }
                            </BotRow>
                            <BotRow>
                                {
                                    row3.map((data, index) => {
                                        return (
                                            <BotItem>
                                                <BotItemTitle>{data.title}</BotItemTitle>
                                                <BotItemNum fall={data.fall}>{data.num}</BotItemNum>
                                            </BotItem>
                                        )
                                    })
                                }
                            </BotRow>
                        </LeftBot>
                    </MovingLeft>
                    <MovingRight>
                        <RightTop>
                            <TopCol textalign={'right'}>
                                {
                                    mockedRightRow1.map((data, index) => {
                                        return (
                                            <ColNum>{data}</ColNum>
                                        )
                                    })
                                }
                            </TopCol>
                            <TopCol textalign={'right'}>
                                {
                                    mockedRightRow2.map((data, index) => {
                                        return (
                                            <ColNum>{data}</ColNum>
                                        )
                                    })
                                }
                            </TopCol>
                            <TopCol textalign={'left'}>
                                {
                                    mockedRightRow3.map((data, index) => {
                                        return (
                                            <ColNum>{data}</ColNum>
                                        )
                                    })
                                }
                            </TopCol>
                            <TopCol textalign={'left'}>
                                {
                                    mockedRightRow4.map((data, index) => {
                                        return (
                                            <ColNum>{data}</ColNum>
                                        )
                                    })
                                }
                            </TopCol>
                        </RightTop>
                        <RightBot>價量表</RightBot>
                    </MovingRight>
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
                    {/* <Img url={stock1} /> */}
                    <StockInoTable />
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
                    <NewsSection translate={'50px, -68px'}>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                    </NewsSection>
                    <NewsSection translate={'-36px, 68px'}>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                        <NewsTitle>Ipsum mollit id nostrud deserunt deserunt Lorem fugiat ad Lorem.    <NewsDate>2021/6/25</NewsDate></NewsTitle>
                        <News>Excepteur voluptate elit reprehenderit minim velit laborum ullamco Lorem est. Elit proident occaecat cupidatat reprehenderit id excepteur labore anim eu ex sit enim eiusmod elit. Nulla elit irure reprehenderit cupidatat nisi nulla exercitation aliquip. Pariatur sunt tempor tempor exercitation duis et veniam minim fugiat. Non reprehenderit dolor consectetur mollit voluptate. Voluptate ea quis magna ex exercitation nulla.</News>
                    </NewsSection>
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