import React from 'react';
import styled from 'styled-components';
import { SideBarData } from './SideBarData';

const Sidebar = styled.div`
    background-color: #272821;
    /* border: 1px solid grey; */
    height: 100vh;
    width: 20vw;
    display: flex;
    justify-content: center;
`;

const StyledStockName = styled.div`
    border: 2px solid green;
    width: 80%;
    height: 120px;
    margin-bottom: 16%;
    margin-left: 10%;
`;

const StockName = styled.h2`
    font-size: 2rem;
    color: white;
`;

const SidebarContainer = styled.div`
    /* border: 1px solid goldenrod; */
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 8%;
    text-align: left;
`;

const SideBarButton = styled.div`
    /* border: 2px solid pink; */
    height: 50px;
    padding-left: 10%;
    margin-bottom: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 24px;
    &:hover {
        color: black;
        /* background-image: linear-gradient(to right, #243949 0%, #517fa4 100%); */
        background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
    }
`;

function SideBar() {
    return (
        <Sidebar>
            <SidebarContainer>
            <StyledStockName>
                    <StockName>股票代碼＋名稱</StockName>
                    <StockName>⬆️漲幅(幅度%)</StockName>
            </StyledStockName>
                {
                    SideBarData.map((data, index) => {
                        return (
                            <SideBarButton key={index}>{data.title}</SideBarButton>
                        )
                    })
                }
            </SidebarContainer>
        </Sidebar>
    )
}

export default SideBar;
