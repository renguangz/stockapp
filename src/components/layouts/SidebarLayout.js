import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import SideBar from '../common/sidebar/SideBar';
import ClearFix from '../common/ClearFix';

const PageHeader = styled.div`
    position: fixed;
    z-index: 100;
`;

const PageSidebar = styled.div`
    position: fixed;
`;

const StyledSection = styled.section`
    margin-left: 20vw;
`;

const SectionContainer = styled.div`
    /* border: 1px solid olivedrab; */
    width: 96.875%;
    margin-left: 1.5vw;
`;

const StyledSectionContainer = styled.div`
    background-color: black;
`;

const StyledBody = styled.div`
    background: black;
    /* z-index: 1; */
`;

const StyledFixedHeader = styled.div`
    z-index: 10;
`;

const SidebarLayout = ({ children }) => {
    return (
        <div>
            <StyledFixedHeader>
                <PageHeader>
                    <Header />
                </PageHeader>
                <ClearFix height="8vh" />
            </StyledFixedHeader>
            <StyledBody>
                <PageSidebar>
                    <SideBar />
                </PageSidebar>
                <StyledSection>
                    <SectionContainer>
                        {children}
                    </SectionContainer>
                </StyledSection>
            </StyledBody>
        </div>
    )
};

export default SidebarLayout;