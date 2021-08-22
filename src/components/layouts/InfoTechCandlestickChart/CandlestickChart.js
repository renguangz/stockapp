import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import techmid from '../../images/mocked/techmid.png';
import techmid1 from '../../images/mocked/techmid1.png';
import techmid2 from '../../images/mocked/techmid2.png';

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

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const CandleStickChart = () => {

    useEffect(() => {

    }, [])


    return (
        <TechContainer>
            <TechNav>
                <TechMainH4>2021/07/02 開: 605.00 高: 607.00 低: 601.00 收: 604.00 量: 4000 ⬇️5.00</TechMainH4>
                <TechNavRight>
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
                    <svg id='candlestickChartMain'></svg>
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
    )
};

export default CandleStickChart;