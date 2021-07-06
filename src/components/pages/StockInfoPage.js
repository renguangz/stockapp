import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import SidebarLayout from '../layouts/SidebarLayout';
import styled from 'styled-components';
import { fetchStock } from '../../redux';
import { connect } from 'react-redux';
import stock1 from '../images/mocked/base.png';
import stock2 from '../images/mocked/fundstock.png';
import movingstock from '../images/mocked/movingstock.png';
import mockedmoving from '../images/mocked/mockedmoving.png';
import StockInoTable from '../layouts/StockInfotable';
import { row1, row2, row3 } from '../common/mocked_data/StockInfoMoving';
import { mockedRightRow1, mockedRightRow2, mockedRightRow3, mockedRightRow4 } from '../common/mocked_data/StockinfoRightTop';
import { chipbot } from '../common/mocked_data/ChipBot';
import { chipRightTop, chipRightBot } from '../common/mocked_data/ChipRight';
import chiprighttop from '../images/mocked/chiprighttop1.jpeg';
import chip from '../images/mocked/chip.jpeg';
import techmid from '../images/mocked/techmid.png';
import techmid1 from '../images/mocked/techmid1.png';
import techmid2 from '../images/mocked/techmid2.png';

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
    border: 1px solid pink;
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
    border: 1px solid gold;
    width: 100%;
    height: 56%;
`;

const FundImgContainer = styled.div`
    /* border: 2px solid yellow; */
    height: 100%;
    width: 68%;
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
    /* border: 2px solid orange; */
    width: 36%;
`;

const TechContainer = styled.div`
    /* border: 2px solid yellow; */
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

const TechDropSelect = styled(NavButton)`
    display: flex;
`;

const TechDropOption = styled.option`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
`;

const TechMainContainer = styled.div`
    /* border: 2px solid pink; */
    width: 100%;
    height: ${props => props.height || '24'}%;
    display: flex;
    flex-wrap: wrap;
`;

const TechMainLeft = styled.div`
    /* border: 2px solid pink; */
    width: 10%;
    padding-right: 4px;
`;

const TechMainTitleContainer = styled(NavButton)`
    height: 32px;
`;

const TechMainTitle = styled.h2`
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
`;

const TechMainH4 = styled.h4`
    /* border: 1px solid yellow; */
    color: ${props => props.color || 'white'};
    text-align: ${props => props.textAlign || 'left'};
`;

const TechMainMid = styled.div`
    border: 2px solid #999999;
    width: 84%;
    height: ${props => props.height || '100'}%;
`;

const TechMainRight = styled.div`
    /* border: 1px solid white; */
    height: ${props => props.height || '88'}%;
    width: 6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 4px;
`;

const TechMainDate = styled.div`
    /* border: 1px solid white; */
    width: 80%;
    margin-left: 10%;
    display: flex;
    /* align-items: center; */
    vertical-align: middle;
    padding-top: 4px;
    justify-content: space-around;
`;

const ChipContainer = styled.div`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
    display: flex;
`;

const ChipLeft = styled.div`
    /* border: 1px solid red; */
    height: 100%;
    width: 66%;
    margin-right: 2%;
`;

const ChipTitle = styled.h2`
    color: grey;
    margin-bottom: 0;
    text-align: left;
    /* background-color: grey; */
    margin-top: ${props => props.margintop || '0'}px;
`;

const ChipLeftTop = styled.div`
    border: 1px solid white;
    width: 64%;
    height: 48%;
    margin: 0 auto;
`;

const ChipLeftBot = styled.div`
    /* border: 1px solid greenyellow; */
    width: 100%;
    height: 50%;
    margin: 8px auto;
`;

const ChipTable = styled.table`
    height: ${props => props.height || '100'}%;
    width: 100%;
    border-collapse: collapse;
    color: white;
    margin-top: ${props => props.margintop || '20'}px;
`;

const ChipHeadTr = styled.tr`
    border-bottom: 2px solid grey;
`;

const ChipTh = styled.th`
    color: ${props => props.color || 'white'};
    text-align: ${props => props.textalign || 'right'};
`;

const ChipBodytr = styled.tr`
    border-bottom: 2px solid #2A2A2A;
    &:last-child {
        border-bottom: none;
    }
`;

const ChipTd = styled.td`
    text-align: ${props => props.textalign || 'right'};
`;

const ChipRight = styled.div`
    /* border: 1px solid gainsboro; */
    height: 100%;
    width: 32%;
`;

const ChipRightTop = styled.div`
    /* border: 1px solid white; */
    width: 100%;
    height: 52%;
`;

const ChipRightBot = styled.div`
    /* border: 1px solid greenyellow; */
    width: 100%;
    height: 44%;
    padding-top: 8px;
`

const RightBotNav = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
    height: 34px;
    display: flex;
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

const StockInfoPage = ({ stockinfo }) => {
    useEffect(() => {
        console.log(stockinfo)
        fetchStock()
    }, [])

    return (
        <SidebarLayout>
            <StyledInfoContainer id='move'>
                <MovingContainer>
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
                            <RightTopTotal>
                                <ColNum>63.03</ColNum>
                                <ChipImg url={mockedmoving} height={'100'} />
                                <ColNum>31.16</ColNum>
                            </RightTopTotal>
                        </RightTop>
                        <RightBot>價量表</RightBot>
                    </MovingRight>
                </MovingContainer>
            </StyledInfoContainer>
            <StyledInfoContainer id='basic'>
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
                    <StockInoTable />
                </FundTableContainer>
            </StyledInfoContainer>
            <StyledInfoContainer id='tech'>
                <TechContainer>
                    {/* 技術面 */}
                    <TechNav>
                        <TechMainH4>2021/07/02 開: 605.00 高: 607.00 低: 601.00 收: 604.00 量: 4000 ⬇️5.00</TechMainH4>
                        <TechNavRight>
                            {/* <NavButton>日線</NavButton> */}
                            <TechDropSelect>
                                <DropSelect>
                                    <TechDropOption>1分鐘</TechDropOption>
                                    <TechDropOption>5分鐘</TechDropOption>
                                    <TechDropOption>10分鐘</TechDropOption>
                                    <TechDropOption>15分鐘</TechDropOption>
                                    <TechDropOption>30分鐘</TechDropOption>
                                    <TechDropOption>60分鐘</TechDropOption>
                                    <TechDropOption>日線</TechDropOption>
                                    <TechDropOption>週線</TechDropOption>
                                    <TechDropOption>月線</TechDropOption>
                                </DropSelect>
                            </TechDropSelect>
                            <NavButton>
                                <TechMainTitle>關閉隔線</TechMainTitle>
                            </NavButton>
                            <NavButton>
                                <TechMainTitle>重新整理</TechMainTitle>
                            </NavButton>
                        </TechNavRight>
                    </TechNav>
                    <TechMainContainer height={'40'}>
                        <TechMainLeft>
                            <TechMainTitleContainer>
                                <TechMainTitle>K線</TechMainTitle>
                                <TechMainH4>MA5: 26.01</TechMainH4>
                                <TechMainH4>MA100: 26.01</TechMainH4>
                                <TechMainH4>MA: 26.01</TechMainH4>
                            </TechMainTitleContainer>
                        </TechMainLeft>
                        <TechMainMid height={'88'}>
                            <ChipImg url={techmid} width={'100'} height={'100'} />
                        </TechMainMid>
                        <TechMainRight>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                        </TechMainRight>
                        <TechMainDate>
                            <TechMainH4>2021/02</TechMainH4>
                            <TechMainH4>2021/02</TechMainH4>
                            <TechMainH4>2021/02</TechMainH4>
                            <TechMainH4>2021/02</TechMainH4>
                        </TechMainDate>
                    </TechMainContainer>
                    <TechMainContainer>
                        <TechMainLeft>
                            <TechMainTitleContainer>
                                <TechMainTitle>成交量</TechMainTitle>
                                <TechMainH4>MA5: 26.01</TechMainH4>
                                <TechMainH4>MA100: 26.01</TechMainH4>
                                <TechMainH4>MA: 26.01</TechMainH4>
                            </TechMainTitleContainer>
                        </TechMainLeft>
                        <TechMainMid>
                            <ChipImg url={techmid1} width={'100'} height={'100'} />
                        </TechMainMid>
                        <TechMainRight height={'100'}>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                        </TechMainRight>
                    </TechMainContainer>
                    <TechMainContainer>
                        <TechMainLeft>
                            <TechMainTitleContainer>
                                <TechMainTitle>KDJ</TechMainTitle>
                                <TechMainH4>MA5: 26.01</TechMainH4>
                                <TechMainH4>MA100: 26.01</TechMainH4>
                                <TechMainH4>MA: 26.01</TechMainH4>
                            </TechMainTitleContainer>
                        </TechMainLeft>
                        <TechMainMid>
                            <ChipImg url={techmid2} width={'100'} height={'100'} />
                        </TechMainMid>
                        <TechMainRight height={'100'}>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                            <TechMainH4 textAlign={'right'}>
                                35.55
                            </TechMainH4>
                        </TechMainRight>
                    </TechMainContainer>
                </TechContainer>
            </StyledInfoContainer>
            <StyledInfoContainer id='chip'>
                <ChipContainer>
                    {/* 籌碼面 */}
                    <ChipLeft>
                        <ChipTitle>三大法人 融資融券</ChipTitle>
                        <ChipLeftTop>
                            <ChipImg width={'100'} height={'100'} url={chip} />
                        </ChipLeftTop>
                        <ChipLeftBot>
                            <ChipTable height={'0'}>
                                <thead>
                                    <ChipHeadTr>
                                        <ChipTh textalign={'left'}>日期</ChipTh>
                                        <ChipTh color={'#1889D0'}>外資</ChipTh>
                                        <ChipTh color={'#E34E40'}>投信</ChipTh>
                                        <ChipTh color={'#7B4EA4'}>自營商</ChipTh>
                                        <ChipTh>法人合計</ChipTh>
                                        <ChipTh color={'greenyellow'}>融資</ChipTh>
                                        <ChipTh color={'pink'}>融券</ChipTh>
                                        <ChipTh>資券相抵</ChipTh>
                                        <ChipTh color={'#FEB805'}>股價</ChipTh>
                                    </ChipHeadTr>
                                </thead>
                                <tbody>
                                    {
                                        chipbot.map((data, index) => {
                                            return (
                                                <ChipBodytr>
                                                    <ChipTd textalign={'left'}>{data.date}</ChipTd>
                                                    <ChipTd>{data.foreign}</ChipTd>
                                                    <ChipTd>{data.security}</ChipTd>
                                                    <ChipTd>{data.selfEmployed}</ChipTd>
                                                    <ChipTd>{data.total}</ChipTd>
                                                    <ChipTd>{data.financing}</ChipTd>
                                                    <ChipTd>{data.securityLend}</ChipTd>
                                                    <ChipTd>{data.total2}</ChipTd>
                                                    <ChipTd>{data.price}</ChipTd>
                                                </ChipBodytr>
                                            )
                                        })
                                    }
                                </tbody>
                            </ChipTable>
                        </ChipLeftBot>
                    </ChipLeft>
                    <ChipRight>
                        <ChipTitle>籌碼分布</ChipTitle>
                        <ChipRightTop>
                            <ChipImg url={chiprighttop} />
                            <ChipTable margintop={'0'} height={'0'}>
                                <thead>
                                    <ChipHeadTr>
                                        <ChipTh textalign={'left'}>項目</ChipTh>
                                        <ChipTh>持股張數</ChipTh>
                                        <ChipTh>持股比例</ChipTh>
                                    </ChipHeadTr>
                                </thead>
                                <tbody>
                                    {
                                        chipRightTop.map(data => {
                                            return (
                                                <ChipBodytr>
                                                    <ChipTd textalign={'left'}>{data.name}</ChipTd>
                                                    <ChipTd>{data.hold}</ChipTd>
                                                    <ChipTd>{data.percent}</ChipTd>
                                                </ChipBodytr>
                                            )
                                        })
                                    }
                                </tbody>
                            </ChipTable>
                        </ChipRightTop>
                        <ChipRightBot>
                            <ChipTitle margintop={'12'}>15大券商進出</ChipTitle>
                            <RightBotNav>
                                <DropSelectButton>
                                    <DropSelect>
                                        <option>近日</option>
                                        <option>5日</option>
                                        <option>10日</option>
                                        <option>30日</option>
                                    </DropSelect>
                                </DropSelectButton>
                                <RightBotRadio>
                                    <RadioInput type='radio' id='buy' />
                                    <RadioLabel for="buy">買超券商</RadioLabel>
                                    <RadioInput type='radio' id='sell' />
                                    <RadioLabel for='sell'>賣超券商</RadioLabel>
                                </RightBotRadio>
                                {/* 近日，買超券商，賣超券商 */}
                            </RightBotNav>
                            <ChipTable margintop={'0'} height={'0'}>
                                <thead>
                                    <ChipHeadTr>
                                        <ChipTh textalign={'left'}>券商</ChipTh>
                                        <ChipTh>買進</ChipTh>
                                        <ChipTh>賣出</ChipTh>
                                        <ChipTh>買賣超</ChipTh>
                                        <ChipTh>成交比例</ChipTh>
                                    </ChipHeadTr>
                                </thead>
                                <tbody>
                                    {
                                        chipRightBot.map(data => {
                                            return (
                                                <ChipBodytr>
                                                    <ChipTd textalign={'left'}>{data.name}</ChipTd>
                                                    <ChipTd>{data.buy}</ChipTd>
                                                    <ChipTd>{data.sell}</ChipTd>
                                                    <ChipTd>{data.total}</ChipTd>
                                                    <ChipTd>{data.percent}</ChipTd>
                                                </ChipBodytr>
                                            )
                                        })
                                    }
                                </tbody>
                            </ChipTable>
                        </ChipRightBot>
                    </ChipRight>
                </ChipContainer>
            </StyledInfoContainer>
            <StyledInfoContainer id='news'>
                <NewsContainer>
                    {/* 消息面 */}
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
        </SidebarLayout>
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