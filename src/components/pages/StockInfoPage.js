import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import SidebarLayout from '../layouts/SidebarLayout';
import styled from 'styled-components';
import { fetchStock, fetchIdName, clickSearch, fetchBasicIncome, fetchBasic } from '../../redux';
import { connect } from 'react-redux';
import stock2 from '../images/mocked/fundstock.png';
import mockedmoving from '../images/mocked/mockedmoving.png';
import StockInfoTable from '../layouts/StockInfotable';
import { row1, row2, row3 } from '../common/mocked_data/StockInfoMoving';
import { mockedRightRow1, mockedRightRow2, mockedRightRow3, mockedRightRow4 } from '../common/mocked_data/StockinfoRightTop';
import techmid from '../images/mocked/techmid.png';
import techmid1 from '../images/mocked/techmid1.png';
import techmid2 from '../images/mocked/techmid2.png';
import movingstock1 from '../images/mocked/movingstock1.png';
import movingstock2 from '../images/mocked/movingstock2.png';
import { SearchOutlined } from '@ant-design/icons';
import * as Storage from '../helper/StorageHelper';
import InfoTableChart from '../charts/InfoTableChart';
import InfoTableBasicChart from '../layouts/InfoTableBasicChart';
import CandleStickChart from '../layouts/InfoTechCandlestickChart/CandlestickChart';
import ChipPage from '../layouts/ChipPage';

const StyledInfoContainer = styled.section`
    /* border: 1px solid blue; */
    width: 100%;
    height: 90vh;
    
    color: white;
    display: flex;
    padding-top: 20px;
`;

const MovingContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
    display: flex;
`;

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const MovingLeft = styled.div`
    /* border: 1px solid greenyellow; */
    height: 100%;
    width: 64%;
    margin-right: 12px;
`;

const LeftTop = styled.div`
    /* border: 1px solid pink; */
    width: 98%;
    height: 68%;
    margin: 4px auto;
`;

const LeftBot = styled.div`
    /* border: 1px solid white; */
    width: 98%;
    height: 30%;
    margin: auto;
`;

const BotRow = styled.div`
    /* border: 1px solid goldenrod; */
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
    /* border: 1px solid orange; */
    height: 100%;
    width: 36%;
`;

const RightTop = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
    height: 40%;
    margin-top: 4px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const TopCol = styled.div`
    /* border: 1px solid greenyellow; */
    /* height: 80%; */
    width: 24%;
    padding: 0 12px;
    text-align: ${props => props.textalign};
    font-size: 1rem;
    padding-bottom: 0;
`;

const ColNum = styled.h3`
    color: white;
    vertical-align: center;
    /* font-size: 1.16rem; */
    /* border: 1px solid white; */
`;

const RightTopTotal = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    height: 16%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightBot = styled.div`
    /* border: 1px solid gold; */
    width: 100%;
    height: 56%;
`;

const FundTableContainer = styled.div`
    /* border: 2px solid orange; */
    width: 36%;
`;

const TechContainer = styled.div`
    border: 2px solid yellow;
    width: 100%;
    height: 100%;
`;

const TechNav = styled.div`
    /* border: 2px solid green; */
    width: 100%;
    height: 8%;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const TechNavRight = styled.div`
    /* border: 1px solid pink; */
    display: flex;
    width: 50%;
    justify-content: space-around;
`;

const NavButton = styled.div`
    border: 1px solid #A9A9A9;
    border-radius: 4px;
    background-color: #676767;
    height: 28px;
`;

const DropSelectButton = styled.div`
    display: flex;
    background-color: #2C3235;
    margin: 4px 8px;
`;

const DropSelect = styled.select`
    background-color: transparent;
    border: none;
    /* border: 1px solid pink; */
    margin: 0;
    margin-left: 4px;
    line-height: inherit;
    cursor: inherit;
    font-size: 1rem;
    width: 100px;
`;

const RightBotRadio = styled.div`
    border: 2px solid #2A3033;
    border-radius: 8px;
    margin: auto 4px;
    width: 80%;
    height: 80%;
    padding: auto;
`;

const RadioLabel = styled.label`
    /* border: 2px solid pink; */
    display: inline-block;
    border-radius: 8px;
    font-size: 1rem;
    /* background-color: goldenrod; */
    cursor: pointer;
    width: 50%;
    height: 100%;
    line-height: 100%;
`;


const RadioInput = styled.input`
    display: none;
    cursor: initial;
    &:checked + ${RadioLabel} {
        background-color: #2C3235;
    }
`;

const Img = styled.div`
    background-image: ${(props) => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 90%;
`;

const NewsContainer = styled.div`
    /* border: 2px solid yellow; */
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

const SearchForm = styled.form`
    border: 1px solid transparent;
    width: 72vw;
    height: 90vh;
    margin: 0 auto;
`;

const SearchContainer = styled.div`
    border: 2px solid white;
    width: 80%;
    height: 10%;
    margin: 0 auto;
    margin-top: 8%;
    border-radius: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchInput = styled.input`
    outline: none;
    border: none;
    width: 82.4%;
    height: 100%;
    font-size: 48px;
    background: transparent;
    color: white;
`;

const SearchIcon = styled.div`
    /* background-color: orange; */
    width: 10%;
    padding-left: 6%;
`;

const SearchUl = styled.ul`
    /* border: 1px solid white; */
    padding: 0;
    width: 80%;
    margin: 0 auto;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
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


const StockInfoPage = ({ searchRedux, clickSearch, fetchBasic }) => {
    useEffect(() => {
        fetchStock()
        fetchIdName()
        // fetchBasic(searchStock)
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
    const searchStockIdName = Storage.getData('stock_id_and_name')
    const searchStock = searchStockIdName.split('　')[0]

    return (
        <>

            <SidebarLayout>
                <StyledInfoContainer id='move'>
                    <MovingContainer>
                        <MovingLeft>
                            <LeftTop>
                                <ChipImg url={movingstock1} height={'100'} width={'100'} />
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
                        </MovingLeft >
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
                                <RightTopTotal>
                                    <ColNum>63.03</ColNum>
                                    <ChipImg url={mockedmoving} height={'100'} />
                                    <ColNum>31.16</ColNum>
                                </RightTopTotal>
                            </RightTop>
                            <RightBot>
                                <ChipImg url={movingstock2} height={'100'} width={'100'} />
                            </RightBot>
                        </MovingRight>
                    </MovingContainer >
                </StyledInfoContainer >
                <StyledInfoContainer id='basic'>
                    <InfoTableBasicChart />
                    <FundTableContainer>
                        <StockInfoTable />
                    </FundTableContainer>
                </StyledInfoContainer>
                <StyledInfoContainer id='tech'>
                    <CandleStickChart />
                </StyledInfoContainer>
                <StyledInfoContainer id='chip'>
                    <ChipPage />
                </StyledInfoContainer>
                {/* <StyledInfoContainer id='news'>
                    <NewsContainer>
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
                </StyledInfoContainer> */}
                this is stock info page
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