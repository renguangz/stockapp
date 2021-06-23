import React from 'react';
import styled from 'styled-components';

const NewspaperBorder = styled.div`
    /* border: 2px solid yellow; */
    background: linear-gradient(
    135deg,
    rgba(239, 239, 239, 1) 0%,
    rgba(255, 255, 255, 1) 17%,
    rgba(255, 255, 255, 1) 49%,
    rgba(211, 211, 211, 1) 73%,
    rgba(237, 237, 237, 1) 89%,
    rgba(188, 188, 188, 1) 100%);
    width: 60%;
    height: 60%;
    transform: rotate(8deg);
    box-shadow: 4px 4px 0 darken(white, 20), 8px 8px 0 darken(white, 40),
    12px 12px 0 darken(white, 60), 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Newspapertitle = styled.h1`
    font-family: "Pirata One", cursive;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0;
    border-bottom: 4px solid black;
`;

const NewspaperContainer = styled.div`
    /* border: 2px solid orange; */
    width: 98%;
    height: 100%;
    margin: auto;
`;

const NewspaperHeadlinecontainer = styled.div`
    column-span: all;
    margin-bottom: 8px;
`;

const NewspaperHeadline = styled.h2`
    font-family: "Merriweather", serif;
    font-size: 1.5rem;
    text-transform: capitalize;
    font-weight: bold;
`;



const HomeNewspaper = () => {
    return (
        <NewspaperBorder>
            <NewspaperContainer>
                <Newspapertitle>the daily stock</Newspapertitle>
                <NewspaperHeadlinecontainer>
                    <NewspaperHeadline>this is newspaper headline</NewspaperHeadline>
                </NewspaperHeadlinecontainer>
            </NewspaperContainer>
        </NewspaperBorder>
    )
};

export default HomeNewspaper;