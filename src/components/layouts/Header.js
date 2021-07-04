import { Menu } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';
import Search from '../common/Search';

const StyledHeader = styled.header`
    /* border: 1px solid black; */
    background-color: #272821;
    width: 100vw;
    height: 8vh;
`;

const StyledHeaderContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
`;

const StyledHeaderSection = styled.div`
    display: flex;
`;

const StyledHeaderItem = styled.div`
    padding: 8px;
    /* border: 1px solid black; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 24px;
    &:hover {
        /* background-color: #1890ff; */
        color: white;
        transition: 0.5s;
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledHeaderSection>
                    <Link to="/">
                        <StyledHeaderItem>首頁</StyledHeaderItem>
                    </Link>
                    <Link to="/mylist">
                        <StyledHeaderItem>股票清單</StyledHeaderItem>
                    </Link>
                    <Link to="/stockinfo">
                        <StyledHeaderItem>個股資訊</StyledHeaderItem>
                    </Link>
                    {/* <Link to="/homecarousel">
                        <StyledHeaderItem>Others</StyledHeaderItem>
                    </Link> */}
                </StyledHeaderSection>
                <StyledHeaderSection>
                    <Search />
                </StyledHeaderSection>
            </StyledHeaderContainer>
        </StyledHeader>
    )
};

export default Header;