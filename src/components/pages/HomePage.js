import React from 'react';
import Container from '../common/Container';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import stock_taiwan from '../images/mocked/taiwan-stock.jpeg';

// mocked data
import cardData from '../common/mocked_data/HomePageCard';

const StyledBody = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
    transition: all .5s ease-out;
    overflow: hidden;
    &:hover {
        transform: scale(1.2);
    }
`;

const Newspaper = styled.div`
    border: 2px solid #f9f7f1;
    background-color: #f9f7f1;
    width: 48%;
    height: 88%;
    color: #E6E6E6;
`;

const NewspaperContainer = styled.div`
    width: 95%;
    height: 100%;
    margin: auto;
    /* border: 2px solid blue; */
`;

const NewspaperTitle = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-family: 'Old English Text', sans-serif;
    text-transform: uppercase;
    font-size: 4em;
    line-height: 1em;
    text-align: center;
    font-weight: 700;
    padding: 0px;
    margin: 0px;
    margin-bottom: 12px;
    display: block;
`;

const NewspaperDateCol = styled.div`
    column-span: all;
    border-top: 4px solid #333333;
    border-bottom: 4px solid #333333;
    margin-bottom: 8px;
`;

const NewspaperDate = styled.h3`
    margin: auto;
    text-transform: uppercase;
`;

const NewspaperParaContainer = styled.div`
    width: 100%;
    height: 75%;
    display: flex;
`;

const NewspaperParaCol = styled.div`
    width: 33%;
    border-right: 3px solid #333333;
    height: 100%;
    padding: 4px;
`;

const NewspaperParaTitle = styled.h3`
    font-family: 'PT Sans Narrow', sans-serif;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.5em;
    line-height: 1em;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const NewspaperPara = styled.p`
    color: black;
`;

const NewspaperButton = styled.button`
    color: black;
    margin: 4px auto;
`;

const HomePage = () => {
    return (
        <DefaultLayout noSidebar>
            <Container>
                <StyledBody>
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
                </StyledBody>
                <StyledBody>
                    <SecondCardContainer>
                        <StyledCard>水泥類股</StyledCard>
                        <StyledCard>半導體類股</StyledCard>
                        <StyledCard>光電類股</StyledCard>
                        <StyledCard>電子零組件類股</StyledCard>
                        <StyledCard>航運類股</StyledCard>
                        <StyledCard>金融類股</StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                    </SecondCardContainer>
                </StyledBody>
                <StyledBody>
                    <NewspaperButton>prev page</NewspaperButton>
                    <Newspaper>
                        <NewspaperContainer>
                            <NewspaperTitle>stock daily newspaper</NewspaperTitle>
                            <NewspaperDateCol>
                                <NewspaperDate>june 20th, 2021</NewspaperDate>
                            </NewspaperDateCol>
                            <NewspaperParaContainer>
                                <NewspaperParaCol>
                                    <NewspaperParaTitle>this is news paper para title and a lot of words fsfkjl;ajr;qr</NewspaperParaTitle>
                                    <NewspaperPara>
                                        Culpa ad cupidatat dolore labore laborum velit pariatur irure et veniam aute dolor eu.
                                        Culpa ad cupidatat dolore labore laborum velit pariatur irure et veniam aute dolor eu.
                                        Culpa ad cupidatat dolore labore laborum velit pariatur irure et veniam aute dolor eu.
                                    </NewspaperPara>
                                    <NewspaperParaTitle>"another title"</NewspaperParaTitle>
                                    <NewspaperPara>
                                        Culpa ad cupidatat dolore labore laborum velit pariatur irure et veniam aute dolor eu.
                                        Culpa ad cupidatat dolore labore laborum velit pariatur irure et veniam aute dolor eu.
                                    </NewspaperPara>
                                </NewspaperParaCol>
                                <NewspaperParaCol>

                                </NewspaperParaCol>
                            </NewspaperParaContainer>
                        </NewspaperContainer>
                    </Newspaper>
                    <NewspaperButton>next page</NewspaperButton>
                </StyledBody>
            </Container>
        </DefaultLayout>
    )
};

export default HomePage;