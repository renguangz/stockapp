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
    margin-left: 20vw;
    `;

const SectionContainer = styled.div`
    border: 1px solid olivedrab;
    height: 100vh;
    width: 96.875%;
    margin-left: 1.5vw;
`;

const DefaultLayout = ({ noSidebar, children }) => {
    return (
        <div>
            <PageHeader>
                <Header />
            </PageHeader>
            <ClearFix height="20vh" />
            {noSidebar ? (<div>{children}</div>
            ) : (
                <div>
                    <PageSidebar>
                        <SideBar />
                    </PageSidebar>
                    <StyledSection>
                        <SectionContainer>
                            {children}
                        </SectionContainer>
                    </StyledSection>
                </div>
            )}
            {/* <Footer /> */}
        </div>
    )
};

export default DefaultLayout;