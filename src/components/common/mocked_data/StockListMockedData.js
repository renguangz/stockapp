import React from 'react';
import styled from 'styled-components';
import stockclose from '../../images/mocked/stockclose.png';
import stocktrans from '../../images/mocked/stocktrans.png';
import stockmove from '../../images/mocked/stockmove.jpeg';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'

export const StockListMockedData = [
    {
        stockid: '2317 鴻海',
        close: '105.6',
        url: stockmove,
        increase: false,
        advance: <div><CaretDownFilled />0.5 (0.01%)</div>,
        vol: '120000',
        hold: '5',
    },
    {
        stockid: '2330 台積電',
        close: '612.0',
        url: stocktrans,
        increase: true,
        advance: <div><CaretUpFilled />1.0 (2.5%)</div>,
        vol: '5000',
        hold: '8',
    },
    {
        stockid: '2409 友達',
        close: '25',
        url: stockclose,
        increase: true,
        advance: <div><CaretUpFilled />1.0 (2.5%)</div>,
        vol: '90000',
        hold: '2',
    }
]