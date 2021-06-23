import React from 'react';
import styled from 'styled-components';
import stockclose from '../../images/mocked/stockclose.png';
import stocktrans from '../../images/mocked/stocktrans.png';

const MockedClose = styled.div`
    /* border: 2px solid white; */
    width: 80%;
    /* height: 70px; */
    margin: auto;
    display: flex;
    background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
    border-radius: 8px;
`;

const MockedPrice = styled.div`
    /* border: 2px solid yellow; */
    width: 30%;
    height: 98%;
    margin: auto 0;
    display: flex;
    justify-content: center;
`;

const Price = styled.h3`
    color: white;
    margin: auto;
`;

const MockedImg = styled.div`
    /* border: 2px solid orange; */
    width: 64%;
    height: 64px;
    margin: auto 0;
    margin-left: 2%;
    background-image: ${props => `url(${props.url})`};
    background-size: cover;
    background-position: center;
`;
export const StockListMockedData = [
    {
        stockid: '2317 鴻海',
        close: '105.6',
        url: stockclose,
        advance: '🔻0.5 (0.01%)',
        vol: '120000',
    },
    {
        stockid: '2330 台積電',
        close: '612.0',
        url: stocktrans,
        advance: '🔺1.0 (2.5%)',
        vol: '5000',
    }
]