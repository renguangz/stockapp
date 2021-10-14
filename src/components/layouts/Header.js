import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';
import { HomeFilled, FileDoneOutlined, SearchOutlined } from '@ant-design/icons';

const StyledHeader = styled.header`
    background-color: ${props => props.bgc || '#272821'};
    /* background-color: transparent; */
    width: 100vw;
    height: 8vh;
    @media screen and (max-width: 540px) {
        /* display: none; */
        margin: 0;
        padding: 0;
    }
`;

const StyledHeaderContainer = styled(Container)`
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 540px) {
        /* display: none; */
        border: 1px solid blue;
        margin: 0;
        width: 100%;
    }
`;

const StyledHeaderSection = styled.div`
    /* border: 1px solid yellow; */
    display: flex;
`;

const StyledHeaderItem = styled.div`
    /* border: 1px solid pink; */
    padding: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 24px;
    color: white;
    &:hover {
        /* background-color: #1890ff; */
        color: white;
        /* transition: 0.5s; */
        border-bottom: 4px solid white;
        border-radius: 50%;
        border-radius: 4px;
    }
`;

const Header = ({ headerBgc }) => {
    return (
        <StyledHeader bgc={headerBgc}>
            <StyledHeaderContainer>
                <StyledHeaderSection>
                    <Link to="/">
                        <StyledHeaderItem><HomeFilled style={{ fill: 'white', color: 'white', marginRight: '8px' }} />首頁</StyledHeaderItem>
                    </Link>
                    {/* <Link to="/mylist">
                        <StyledHeaderItem>股票清單</StyledHeaderItem>
                    </Link> */}
                    {/* <Link to="/stockinfo">
                        <StyledHeaderItem>個股資訊</StyledHeaderItem>
                    </Link> */}
                    {/* <Link to="/homecarousel">
                        <StyledHeaderItem>Others</StyledHeaderItem>
                    </Link>
                    <Link to="/try">
                        <StyledHeaderItem>Not search info</StyledHeaderItem>
                    </Link> */}
                </StyledHeaderSection>
                <StyledHeaderSection>
                    <Link to="/mylist">
                        <StyledHeaderItem><FileDoneOutlined style={{ fill: 'white', color: 'white', marginRight: '8px' }} />股票清單</StyledHeaderItem>
                    </Link>
                    {/* <Link to='/stockinfo'>
                        <StyledHeaderItem><SolutionOutlined />個股資訊</StyledHeaderItem>
                    </Link> */}
                    <Link to='/search'>
                        <StyledHeaderItem><SearchOutlined style={{ fill: 'white', color: 'white', marginRight: '8px' }} />搜尋股票</StyledHeaderItem>
                    </Link>
                </StyledHeaderSection>
            </StyledHeaderContainer>
        </StyledHeader>
    )
};

export default Header;