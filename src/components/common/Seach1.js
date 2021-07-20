import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
    /* border: 1px solid white; */
    width: 60vw;
    height: 8vh;
    display: flex;
    margin: 0 auto;
    position: relative;
    top: 80px;
`;
const SearchForm = styled.form`
    /* border: 1px solid yellow; */
    width: 100%;
    height: 100%;
`;
const SearchOuter = styled.div`
    padding: 8px;
    border-radius: 15px;
    box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
    background-color: #f6f5f0;
    border: 1px solid #fff;
`;
const SearchInner = styled.div`
    display: flex;
    border-radius: 10px;
    box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
    padding: 1.5rem 2rem;
`;

const SearchInput = styled.input`
    /* border: 1px solid green; */
    width: 100%;
    height: 100%;
    /* text-align: center; */
    font-size: 40px;
    outline: none;
    border: none;
    background-color: transparent;
    letter-spacing: 0.75px;
`;
const SearchUl = styled.ul`
    border: 1px solid red;
`

const Search1 = () => {
    return (
        <SearchBarContainer>
            <SearchForm>
                <SearchOuter>
                    <SearchInner>
                        <SearchInput
                            placeholder='搜尋股票名稱或代碼'
                        />
                    </SearchInner>
                </SearchOuter>

                {/* <SearchUl></SearchUl> */}
            </SearchForm>
        </SearchBarContainer>
    )
};

export default Search1;