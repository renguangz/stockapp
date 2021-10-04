import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SideBar from '../common/sidebar/SideBar';
import ClearFix from '../common/ClearFix';
import useResponsive from '../common/useResponsive';

const PageHeader = styled.div`
    position: fixed;
    z-index: 100;
`;

const PageSidebar = styled.div`
    position: fixed;
`;

const StyledSection = styled.section`
    margin-left: ${props => props.marginLeft}vw;
`;

const SectionContainer = styled.div`
    /* border: 1px solid olivedrab; */
    width: ${props => props.width}%;
    margin-left: ${props => props.marginLeft}vw;
`;

const StyledBody = styled.div`
    background: black;
`;

const StyledFixedHeader = styled.div`
    z-index: 10;
`;

const SidebarLayout = ({ children }) => {
    const { screenType } = useResponsive();

    const [sidebarDisplay, setSidebarDisplay] = useState(true);
    const [marginLeft, setMarginLeft] = useState(20);
    const [sectionContainerWidth, setSectionContainerWidth] = useState();
    const [sectionContainerMarginLeft, setSectionContainerMarginLeft] = useState();
    useEffect(() => {
        if (screenType === 'DESKTOP') {
            setSidebarDisplay(true)
            setMarginLeft(20)
            setSectionContainerWidth(96.875)
            setSectionContainerMarginLeft(1.5)
        } else if (screenType === 'TABLET') {
            setSidebarDisplay(false)
            setMarginLeft(0)
            setSectionContainerWidth(100)
            setSectionContainerMarginLeft(0)
        } else {
            setSidebarDisplay(false)
            setMarginLeft(0)
            setSectionContainerWidth(100)
            setSectionContainerMarginLeft(0)
        }
    }, [screenType])

    return (
        <div>
            <StyledFixedHeader>
                <PageHeader>
                    <Header />
                </PageHeader>
                <ClearFix height="8vh" />
            </StyledFixedHeader>
            <StyledBody>
                {
                    sidebarDisplay ? (
                        <PageSidebar>
                            <SideBar />
                        </PageSidebar>
                    ) : (
                        ''
                    )
                }
                <StyledSection marginLeft={marginLeft}>
                    <SectionContainer width={sectionContainerWidth} marginLeft={sectionContainerMarginLeft}>
                        {children}
                    </SectionContainer>
                </StyledSection>
            </StyledBody>
        </div>
    )
};

export default SidebarLayout;