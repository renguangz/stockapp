import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import DefaultLayoutAntd from '../layouts/DefaultLayoutAntd';

const StyledInfoContainer = styled.div`
    width: 100%;
    height: 500px;
    border: 1px solid blue;
`;

const StockInfoPage = () => {
    return (
        <DefaultLayoutAntd fixedSidebar >
            <StyledInfoContainer>
                基本面
            </StyledInfoContainer>
            <StyledInfoContainer>技術面</StyledInfoContainer>
            <StyledInfoContainer>籌碼面</StyledInfoContainer>
            <StyledInfoContainer>消息面</StyledInfoContainer>
            this is stock info page
        </DefaultLayoutAntd>
    )
};

export default StockInfoPage;