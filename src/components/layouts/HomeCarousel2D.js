import React from 'react';
// import './home/App.css';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import taiwan_stock from '../images/mocked/taiwan-stock.jpeg';
import styled from 'styled-components';

const StyledContainer = styled.div`
    border: 1px solid green;
    height: 100vh;
    width: 100vw;
    background: #111;
`;

const ImgContainer = styled.div`
    /* border: 1px solid yellow; */
    /* margin: auto; */
    width: 40%;
    height: 100%;
`;

const HomeCarousel2D = () => {
    return (
        <div id='flexContainer'>
            <div className='container'>
                <div className='titleContainer'>
                    <h1 className='title'>台股加權指數</h1>
                </div>
                <div className='infoContainer'>
                    <h2 className='stockinfo'>17847.52</h2>
                </div>
                <div className='numContainer'>
                    <h3 className='stockrise'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h3>
                </div>
                <div className='btnContainer'>
                    <div className='btn bgcBtn'>
                        <Link to='/mylist'>
                            <h2 className='btnWord firstBtn'>
                                進入股票清單
                            </h2>
                        </Link>
                    </div>
                    <div className='btn secondBtnBgc'>
                        <Link to='search'>
                            <h2 className='btnWord secondBtn'>查詢個股資訊</h2>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <ImgContainer> */}
            <div className='imgContainer'>

            </div>
            {/* </ImgContainer> */}
            <div className='otherCardsContainer'>
                <div className='cardOutter'>
                    <div className='cardTitleContainer'>
                        <h2 className='cardTitle'>台股指數</h2>
                        <h2 className='cardNum'>17847.52</h2>
                        <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                    </div>
                    <div className='cardImg'></div>
                </div>
                <div className='cardOutter'>
                    <div className='cardTitleContainer'>
                        <h2 className='cardTitle'>櫃買指數</h2>
                        <h2 className='cardNum'>17847.52</h2>
                        <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                    </div>
                    <div className='cardImg'></div>
                </div>
                <div className='cardOutter'>
                    <div className='cardTitleContainer'>
                        <h2 className='cardTitle'>美股指數</h2>
                        <h2 className='cardNum'>17847.52</h2>
                        <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                    </div>
                    <div className='cardImg'></div>
                </div>
                <div className='cardOutter'>
                    <div className='cardTitleContainer'>
                        <h2 className='cardTitle'>台股指數</h2>
                        <h2 className='cardNum'>17847.52</h2>
                        <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                    </div>
                    <div className='cardImg'></div>
                </div>
                <div className='cardOutter'>
                    <div className='cardTitleContainer'>
                        <h2 className='cardTitle'>台股指數</h2>
                        <h2 className='cardNum'>17847.52</h2>
                        <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                    </div>
                    <div className='cardImg'></div>
                </div>
            </div>
        </div>
    )
};

export default HomeCarousel2D;