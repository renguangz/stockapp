import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';
import Search from '../common/Search';

const StyledHeader = styled.header`
    border: 1px solid black;
    /* background-color: #272821; */
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
    border: 1px solid black;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 24px;
    &:hover {
        background-color: yellow;
        transition: 0.5s;
    }
`;

const Header = () => {
    return (
        <div>
            <StyledHeader>
                <StyledHeaderContainer>
                    <StyledHeaderSection>
                        <Link to="/">
                            <StyledHeaderItem>Home</StyledHeaderItem>
                        </Link>
                        <Link to="/mylist">
                            <StyledHeaderItem>MyList</StyledHeaderItem>
                        </Link>
                        <Link to="/stockinfo">
                            <StyledHeaderItem>StockInfo</StyledHeaderItem>
                        </Link>
                        <Link to="/antd">
                            <StyledHeaderItem>antd</StyledHeaderItem>
                        </Link>
                    </StyledHeaderSection>
                    <StyledHeaderSection>
                        <Search />
                    </StyledHeaderSection>
                </StyledHeaderContainer>
            </StyledHeader>
        </div>
    )
};

export default Header;