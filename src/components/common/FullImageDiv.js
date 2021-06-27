import React from 'react';
import styled from 'styled-components';

const FullImageDiv = styled.div`
    width: 100%;
    height: 100%;
    background-image: ${props => `url(${props.url})`};
    background-position: center;
    background-size: center;
`;

export default FullImageDiv;