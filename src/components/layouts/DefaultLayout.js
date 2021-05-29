import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SideBar from '../common/sidebar/SideBar';
import ClearFix from '../common/ClearFix';

const PageHeader = styled.div`
    position: fixed;
`;

const PageSidebar = styled.div`
    position: fixed;
`;

const StyledSection = styled.section`
    margin-left: 10vw;
`;

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <PageHeader>
                <Header />
            </PageHeader>
            <PageSidebar>
                <ClearFix height="20vh" />
                <SideBar />
            </PageSidebar>
            <StyledSection>
                {children}
            </StyledSection>
            {/* <Footer /> */}
        </div>
    )
};

export default DefaultLayout;