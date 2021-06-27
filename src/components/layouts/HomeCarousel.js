import React from 'react';
import styled from 'styled-components';
import Container from '../common/Container';

const BackgroundBody = styled.body`
    display: flex;
    flex-wrap: nowrap;
    background-color: black;
    width: 200vw;
    height: 100vh;
    /* overflow: hidden; */
    transform-style: preserve-3d;
`;

const Background = styled.section`
    width: 100vw;
    height: 100vh;
`;

const MidContainer = styled(Container)`
    /* border: 2px solid yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: nowrap; */
    /* overflow: hidden; */
`;

const Card = styled.div`
    width: 200px;
    height: 200px;
    border: 2px solid white;
    background: goldenrod;
    /* transform: perspective(2000px) translateX(200px) rotateY(45deg);  */
    transform: perspective(1500px) ${props => `translateX(${props.transX}px) rotateY(${props.rotY}deg) translateZ(${props.transZ}px)`};
`;

const WordContainer = styled.div`
    border: 2px solid orange;
    /* width: 100px;
    height: 100px; */
    /* margin: auto; */
    /* transform: rotateX(180deg); */
`;

const Word = styled.h2`
    color: white;
    font-family: Serif;
    text-align: start;
    margin: 0;
`;

const StyledCard = styled.div`
    border: 2px solid pink;
    width: 540px;
    height: 480px;
    /* margin: 4px auto; */
    margin: auto;
    transform: perspective(2000px) ${props => `rotateY(${props.rotY}deg) translateZ(${props.tranZ}px) translateY(${props.tranY}px)`};
`;

const SecContainer = styled.div`
    /* width: 100%; */
    /* height: 100%; */
    /* border: 2px solid yellow; */
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HomeCarousel = () => {
    return (
        <BackgroundBody>
            <Background>
                <MidContainer>
                    {/* <WordContainer>
                    <Word>StockInfo</Word>
                    <Word>List</Word>
                    <Word>News</Word>
                </WordContainer> */}
                    <Card transX={100} rotY={45} transZ={150} tranY={10}>1</Card>
                    <Card transX={0} rotY={90} transZ={144} transY={0} transX={0}>2</Card>
                    {/* <Card transX={-250} rotY={-45} transZ={-100} transY={-50}>3</Card> */}
                </MidContainer>
            </Background>
            <Background>
                    {/* <StyledCard tranY={0} rotY={60} tranZ={20}></StyledCard>
                    <StyledCard tranY={0} rotY={30} tranZ={10}></StyledCard>
                    <StyledCard tranZ={0}></StyledCard>
                    <StyledCard tranY={0} rotY={-30} tranZ={-10}></StyledCard>
                    <StyledCard tranY={0} rotY={-60} tranZ={-60}></StyledCard> */}
                    <StyledCard rotY={0} tranZ={50} tranY={100}></StyledCard>
                    {/* <StyledCard tranZ={50} tranY={-300} rotY={60}></StyledCard> */}
                    <StyledCard rotY={0} tranZ={0} tranY={0} ></StyledCard>
                    <StyledCard></StyledCard>
            </Background>
        </BackgroundBody>
    )
};

export default HomeCarousel;