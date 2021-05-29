import React from 'react';
import styled from 'styled-components';
import Container from '../common/Container';
import Search from '../common/Search';

const StyledHeader = styled.header`
    border: 1px solid black;
    /* background-color: #272821; */
    width: 100vw;
    height: 20vh;
`;

const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <span>Header</span>
            </Container>
        </StyledHeader>
    )
};

export default Header;