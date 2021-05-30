import React from 'react';
import styled from 'styled-components';
import {SideBarData} from './SideBarData';

const Sidebar = styled.div`
    /* background-color: #272821; */
    border: 1px solid grey;
    height: 100vh;
    width: 20vw;
`;

const SidebarContainer = styled.div`
    border: 1px solid goldenrod;
    height: 100vh;
    width: 75%;
    margin-left: 12.5%;
`;

const SideBarButtonContainer = styled.div`

`;

const SideBarButton = styled.button`
    display: block;
`;

function SideBar() {
    return (
        <Sidebar>
            <SidebarContainer>
                this is side bar
                <SideBarButtonContainer>
                    {
                        SideBarData.map((data, index) => {
                            return (
                                <SideBarButton key={index}>{data.title}</SideBarButton>
                            )
                        })
                    }
                </SideBarButtonContainer>
            </SidebarContainer>
        </Sidebar>
    )
}

export default SideBar;
