import React, { useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { chipRightTop, chipRightBot } from '../common/mocked_data/ChipRight';
import { chipbot } from '../common/mocked_data/ChipBot';
import chiprighttop from '../images/mocked/chiprighttop1.jpeg';
import chip from '../images/mocked/chip.jpeg';

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
    /* border: 1px solid white; */
    width: 64%;
    height: 48%;
    margin: 0 auto;
`;

const ButtonContainer = styled.div`
    border: 2px solid #2B3234;
    border-radius: 12px;
    height: 16%;
    width: 88%;
    display: flex;
    align-items: center;
    padding: 2px;
`;

const ButtonChange = styled.div`
    /* border: 1px solid pink; */
    background-color: ${props => props.bgc};
    border-radius: 8px;
    width: 50%;
    height: 100%;
    cursor: pointer;
`;

const ButtonTitle = styled.h2`
    color: white;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.8rem;
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
`;

const ChipImg = styled.div`
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: cover;
    width: ${props => props.width || '60'}%;
    height: ${props => props.height || '45'}%;
    margin: 0 auto;
`;

const RightBotNav = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
    height: 34px;
    display: flex;
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

const RightBotRadio = styled.div`
    border: 2px solid #2A3033;
    border-radius: 8px;
    margin: auto 4px;
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    padding: 1px;
`;

const RadioButton = styled.div`
    /* border: 1px solid pink; */
    background-color: ${props => props.bgc};
    border-radius: 6px;
    height: 100%;
    width: 50%;
    cursor: pointer;
`;

const RadioButtonTitle = styled.h2`
    color: white;
    font-size: 1rem;
    line-height: 1.25rem;
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

const ChipPage = () => {

    const [LeftButtonBgc, setLeftButtonBgc] = useState('#2B3234');
    const [rightButtonBgc, setRightButtonBgc] = useState('transparent')
    const handleClickLeftButton = () => {
        setLeftButtonBgc('#2B3234')
        setRightButtonBgc('transparent')
    }
    const handleClickRightButton = () => {
        setLeftButtonBgc('transparent')
        setRightButtonBgc('#2B3234')
    }

    const [buyButtonBgc, setBuyButtonBgc] = useState('#2B3234')
    const [sellButtonBgc, setSellButtonBgc] = useState('transparent')
    const handleClickBuyButton = () => {
        setBuyButtonBgc('#2B3234')
        setSellButtonBgc('transparent')
    }
    const handleClickSellButton = () => {
        setBuyButtonBgc('transparent')
        setSellButtonBgc('#2B3234')
    }

    return (
        <ChipContainer>
            <ChipLeft>
                <ChipTitle>三大法人 融資融券</ChipTitle>
                <ChipLeftTop>
                    <ButtonContainer>
                        <ButtonChange bgc={LeftButtonBgc} onClick={handleClickLeftButton}>
                            <ButtonTitle>進出</ButtonTitle>
                        </ButtonChange>
                        <ButtonChange bgc={rightButtonBgc} onClick={handleClickRightButton}>
                            <ButtonTitle>持股</ButtonTitle>
                        </ButtonChange>
                    </ButtonContainer>
                    {/* <ChipImg width={'100'} height={'100'} url={chip} /> */}
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
                            <RadioButton bgc={buyButtonBgc} onClick={handleClickBuyButton}>
                                <RadioButtonTitle>買超券商</RadioButtonTitle>
                            </RadioButton>
                            <RadioButton bgc={sellButtonBgc} onClick={handleClickSellButton}>
                                <RadioButtonTitle>賣超券商</RadioButtonTitle>
                            </RadioButton>
                            {/* <RadioInput type='radio' id='buy' />
                            <RadioLabel for="buy">買超券商</RadioLabel>
                            <RadioInput type='radio' id='sell' />
                            <RadioLabel for='sell'>賣超券商</RadioLabel> */}
                        </RightBotRadio>
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
    )
};

export default ChipPage;