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

const StyledHeaderSection = styled.div`
    display: flex;
`;

const StyledHeaderItem = styled.div`
    border: 1px solid palevioletred;
    width: 33.33%;
    height: 120px;
`;

const StyledHeaderButton = styled.button`
    
`;

const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <span style={{textAlign: 'center'}}>Header</span>
                <StyledHeaderSection>
                    <StyledHeaderItem>
                        <Search />
                    </StyledHeaderItem>
                    <StyledHeaderItem>
                        <span>stock (ex. 2317 鴻海)</span>
                    </StyledHeaderItem>
                    <StyledHeaderItem>
                        <StyledHeaderButton>加入清單</StyledHeaderButton>
                        <StyledHeaderButton>我的清單</StyledHeaderButton>
                    </StyledHeaderItem>
                </StyledHeaderSection>
            </Container>
        </StyledHeader>
    )
};

export default Header;