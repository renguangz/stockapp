import React, { useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

export const TechMainContainer = styled.div`
    /* border: 2px solid pink; */
    width: 100%;
    height: ${props => props.height || '24'}%;
    display: flex;
    flex-wrap: wrap;
`;
export const TechMainLeft = styled.div`
    /* border: 2px solid pink; */
    width: 10%;
    padding-right: 4px;
`;
export const NavButton = styled.div`
    border: 1px solid #A9A9A9;
    border-radius: 4px;
    background-color: #676767;
    height: 28px;
    cursor: pointer;

`;
export const TechMainTitleContainer = styled(NavButton)`
    height: 32px;
`;
export const TechMainTitle = styled.h2`
    color: white;
    font-weight: bolder;
    font-size: ${props => props.fontSize || 1.2}rem;
    margin: ${props => props.margin};
`;
export const TechMainH4 = styled.h4`
    /* border: 1px solid yellow; */
    color: ${props => props.color || 'white'};
    text-align: ${props => props.textAlign || 'left'};
    font-size: ${props => props.fontSize || '1.2rem'};
`;
export const TechMainSvg = styled.div`
    /* border: 1px solid red; */
    width: 90%;
    height: 100%;
`;
export const Svg = styled.svg`
    /* border: 1px solid red; */
    /* width: 990px; */
    /* height: 275px; */
    width: 100%;
    height: 100%;
    margin: 0;
`;
export const SecondSvg = styled.svg`
    /* border: 1px solid yellow; */
    height: 100%;
    width: 100%;
    margin: 0;
`;

export let mouseX = 0;