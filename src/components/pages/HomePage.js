import React from 'react';
import Container from '../common/Container';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import stock_taiwan from '../images/mocked/taiwan-stock.jpeg';

// mocked data
import cardData from '../common/mocked_data/HomePageCard';

const FirstPart = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SecondPart = styled.div`
    height: 100vh;
`;

const WordContainer = styled.div`
    /* width: 300px; */
    /* height: 40px; */
    /* border: 2px solid yellow; */
    position: absolute;
    top: 80px;
`;

const StyledWord = styled.h2`
    color: white;
    font-size: 36px;
    line-height: -0.4285;
`;

const ImgContainer = styled.div`
    /* width: 700px; */
    /* border: 1px solid pink; */
    height: 56%;
    position: absolute;
    top: 130px;
    margin-top: 8px;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ButtonContainer = styled.div`
    /* width: 72px;
    height: 400px; */
    /* border: 2px solid yellow; */
    display: flex;
    position: absolute;
    right: auto;
    top: 80px;
    margin-left: 540px;
`;

const StyledButton = styled.div`
    /* border: 2px solid white; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    padding: auto;
    background-image: ${props => props.backgroundImage}; // https://webgradients.com/ 漸層顏色
    background-color: goldenrod;
`;

const ButtonWord = styled.h3`
    display: flex;
    text-align: center;
    font-size: 1.5rem;
    margin: auto;
    /* color: white; */
`;

const CardContainer = styled.div`
    /* border: 2px solid white; */
    height: 20%;
    display: flex;
    justify-content: center;
    padding: 0 15%;
    position: absolute;
    bottom: 0;
    width: 90%;
`;

const MockCard = styled.div`
    background-color: ${props => props.background};
    border-radius: 12px;
    margin-top: ${props => props.marginTop}vh;
    display: flex;
    flex: 1;
`;

const SecondCardContainer = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
`;

const StyledCard = styled.div`
    border: 2px solid pink;
    border-radius: 12px;
    width: 240px;
    height: 300px;
    margin: 0 16px;
    color: white;
`;

const HomePage = () => {
    return (
        <DefaultLayout noSidebar headerNotFixed>
            <Container>
                <FirstPart>
                    <ButtonContainer>
                        <StyledButton>
                            <ButtonWord>日</ButtonWord>
                        </StyledButton>
                        <StyledButton>
                            <ButtonWord>月</ButtonWord>
                        </StyledButton>
                        <StyledButton>
                            <ButtonWord>年</ButtonWord>
                        </StyledButton>
                    </ButtonContainer>
                    <WordContainer>
                        <StyledWord>台股指數</StyledWord>
                    </WordContainer>
                    <ImgContainer>
                        <StyledImage src={stock_taiwan} alt='taiwan stock' />
                    </ImgContainer>
                    <CardContainer>
                        {/* {
                            cardData.map(data => {
                                return (
                                    <StyledCard marginTop={data.imgPaddingTop}>
                                        <CardImg url={data.image}></CardImg>
                                    </StyledCard>
                                )
                            })
                        } */}
                        <MockCard background={'orange'} marginTop={10}>韓國指數</MockCard>
                        <MockCard background={'yellow'} marginTop={5}>道瓊</MockCard>
                        <MockCard background={'white'} marginTop={0} >台股指數</MockCard>
                        <MockCard background={'yellow'} marginTop={5}>那斯達克</MockCard>
                        <MockCard background={'orange'} marginTop={10}>日本指數</MockCard>
                    </CardContainer>
                </FirstPart>
                <SecondPart>
                    <SecondCardContainer>
                        <StyledCard>水泥</StyledCard>
                        <StyledCard>半導體</StyledCard>
                        <StyledCard>光電</StyledCard>
                        <StyledCard>電子零組件</StyledCard>
                        <StyledCard>航運</StyledCard>
                        <StyledCard>金融</StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                    </SecondCardContainer>
                </SecondPart>
            </Container>
        </DefaultLayout>
    )
};

export default HomePage;