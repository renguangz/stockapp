import React from 'react';
import Container from '../common/Container';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import stock_taiwan from '../images/mocked/taiwan-stock.jpeg';

// mocked data
import cardData from '../common/mocked_data/HomePageCard';

const FirstPart = styled.div`
    height: 100vh;
`;

const SecondPart = styled.div`
    height: 100vh;
`;

const ImgContainer = styled.div`
    /* border: 1px solid pink; */
    height: 70%;
`;

const CardContainer = styled.div`
    /* border: 2px solid white; */
    height: 30%;
    display: flex;
    justify-content: center;
    padding: 0 15%;
`;

const MockCard = styled.div`
    background-color: ${props => props.background};
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
    width: 240px;
    height: 300px;
    margin: 0 16px;
`;

const HomePage = () => {
    return (
        <DefaultLayout noSidebar headerNotFixed>
            <Container>
                <FirstPart>
                    <ImgContainer>
                        <img src={stock_taiwan} alt='taiwan stock' />
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
                        <MockCard background={'orange'} marginTop={10} />
                        <MockCard background={'yellow'} marginTop={5} />
                        <MockCard background={'white'} marginTop={0} />
                        <MockCard background={'yellow'} marginTop={5} />
                        <MockCard background={'orange'} marginTop={10} />
                    </CardContainer>
                </FirstPart>
                <SecondPart>
                    <SecondCardContainer>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
                        <StyledCard></StyledCard>
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