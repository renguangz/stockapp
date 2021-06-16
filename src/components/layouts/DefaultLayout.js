import React from 'react';
import styled, { css } from 'styled-components';
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
    margin-left: 20vw;
`;

const SectionContainer = styled.div`
    /* border: 1px solid olivedrab; */
    width: 96.875%;
    margin-left: 1.5vw;
`;

const StyledBody = styled.div`
    background: black;
`;

const DefaultLayout = ({ headerNotFixed, noSidebar, children }) => {
    return (
        <div>
            {
                headerNotFixed ? (
                    <Header />
                ) : (
                    <div>
                        <PageHeader>
                            <Header />
                        </PageHeader>
                        <ClearFix height="8vh" />
                    </div>
                )
            }
            {
                noSidebar ? (<StyledBody>{children}</StyledBody>
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