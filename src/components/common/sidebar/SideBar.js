import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SideBarData } from './SideBarData';
import './sideBar.css';

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
    cursor: pointer;
    &:hover {
        color: #1890ff;
        background-color: #383838;
        // 點擊後加入background and border right
        /* border-right: 2px solid #1890ff; */
    }
`;

function SideBar() {

    const scrollToAnchor = (anchorName) => {
        if (!!anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 14)
            }
        }
    }

    const handleScroll = e => {
        let current = '';
        const stockInfoId = ['move', 'basic', 'tech', 'chip', 'news']
        stockInfoId.forEach(id => {
            const section = e.target.getElementById(id)
            console.log(section)
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.pageYOffset >= (sectionTop - sectionHeight / 2.5)) {
                current = section.getAttribute('id')
            }
            Ref.current.map(i => {
                i.classList.remove('active')
                if (i.classList.contains(current)) {
                    i.classList.add('active')
                }
            })
        })
    }

    const Ref = useRef([])
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {
            window.addEventListener('scroll', handleScroll)
        })
        // window.addEventListener('scroll', handleScroll)
    })

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
                            <SideBarButton key={index} className={data.id} ref={ele => Ref.current[index] = ele} onClick={() => scrollToAnchor(data.id)}>{data.title}</SideBarButton>
                        )
                    })
                }
            </SidebarContainer>
        </Sidebar>
    )
}

export default SideBar;
