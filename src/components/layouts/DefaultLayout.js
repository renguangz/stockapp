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
    width: 96.875%;
    margin-left: 1.5vw;
`;

const StyledBody = styled.div`
    background: black;
`;

const StyledFixedHeader = styled.div`
    /* z-index: 10; */
`;

const DefaultLayout = ({ headerNotFixed, noSidebar, children }) => {
    return (
        <div>
            {
                headerNotFixed ? (
                    <Header />
                ) : (
                    <StyledFixedHeader>
                        <PageHeader>
                            <Header />
                        </PageHeader>
                        <ClearFix height="8vh" />
                    </StyledFixedHeader>
                )
            }
            {
                noSidebar ? (
                    <StyledBody>{children}</StyledBody>
                ) : (
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
                )
            }
            {/* <Footer /> */}
        </div>
    )
};

export default DefaultLayout;