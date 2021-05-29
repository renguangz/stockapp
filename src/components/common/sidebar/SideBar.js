import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Sidebar = styled.div`
    /* background-color: #272821; */
    border: 1px solid grey;
    height: 100vh;
    width: 10vw;
`;

function SideBar() {
    return (
        <Sidebar>
            this is side bar
        </Sidebar>
    )
}

export default SideBar;
