import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
    background-color: #272821;
    height: 100vh;
    width: 100vw;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledBookContainer = styled.div`
    border: 3px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 760px;
`;

const StyledBook = styled.div`
    /* border: 4px solid goldenrod; */
    background-color: goldenrod;
    width: 30vw;
    height: 60vh;
    box-shadow: -35px 35px 50px rgba(0,0,0,1);
    transform: perspective(2000px) rotateY(-45deg);
    z-index: 6;
    &:before {
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-left: 4px solid rgba(0, 0, 0, 0.3);
    }
    &:after {
        content: '';
        transform-origin: left center;
        transform: rotateY(30deg);
    }
`;

const Page = styled.div`
    background-color: white;
    width: calc(100% - 20px);
    height: ${props => `calc(100% - ${props.minusHeight}px)`};
    border-radius: 0px 3px 3px 0px;
    position: absolute;
    z-index: ${props => props.zIndex};
    right: ${props => props.right}px;
    top: 4px;
    box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.2),
        inset -1px 0px 1px rgba(150, 150, 150, 0.1);
`;

const CoverPage = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-left: 4px solid rgba(0, 0, 0, 0.3);
    background-color: goldenrod;
    z-index: 6;
`;

const FinalPage = styled(CoverPage)`
    height: calc(100% - 20px);
    z-index: -1;
    right: -33px;
    transform: rotateY(-19deg) translateY(-2px) scale(0.984) translateX(4px);
`;

const HomeBook = () => {
    return (
        <StyledBackground>
            <StyledBookContainer>
                <StyledBook>
                    <CoverPage />
                    <Page minusHeight={8} zIndex={5} right={-3} />
                    <Page minusHeight={12} zIndex={4} right={-6} />
                    <Page minusHeight={16} zIndex={3} right={-9} />
                    <Page minusHeight={20} zIndex={2} right={-12} />
                    <Page minusHeight={24} zIndex={1} right={-15} />
                    <FinalPage />
                </StyledBook>
            </StyledBookContainer>
        </StyledBackground>
    )
};

export default HomeBook;