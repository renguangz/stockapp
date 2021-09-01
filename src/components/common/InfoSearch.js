import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { clickSearch, fetchIdName } from '../../redux';
import * as Storage from '../helper/StorageHelper';
import { Link } from 'react-router-dom';

const SearchForm = styled.form`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;  
`;

const SearchTitleContainer = styled.div`
    /* border: 1px solid orange; */
    position: absolute;
    top: 20%;
    left: 10%;
`;

const SearchTitle = styled.h2`
    border-bottom: 8px solid #54AA5E;
    /* border-bottom: 8px solid #1890ff; */
    color: white;
    font-size: 52px;
    padding-bottom: 8px;
`;

const SearchContainer = styled.div`
    border-bottom: 1px solid #2E5E30;
    width: 52%;
    height: 10%;
    margin: 0 auto;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 10%;
    top: 36%;
`;

const SearchInput = styled.input`
    /* border-bottom: 1px solid #2E5E30; */
    outline: none;
    border: none;
    width: 82.4%;
    height: 100%;
    font-size: 40px;
    background: transparent;
    color: white;
    padding: 12px;
`;

const SearchButton = styled.button`
    /* border: 1px solid yellow; */
    border: none;
    height: 52%;
    width: 32%;
    border-left: 2px solid #57955B;
    cursor: pointer;
    color: #1890ff;
    color: #fff;
    background-color: transparent;
    font-size: 24px;
    font-weight: 700;
    padding: 12px;
    transition: opacity .2s ease-in-out, color .2s ease-in-out, transform .2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        /* color: #25587C; */
        /* font-size: 40px; */
        /* 波浪形狀、顏色跑馬 */
    }
`;

const SearchIcon = styled.div`
    /* border-bottom: 1px solid #2E5E30; */
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0;
`;

const SearchUl = styled.ul`
    /* border: 1px solid white; */
    padding: 0;
    width: 80%;
    margin: 0 auto;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    left: 10%;
    top: 48%;
`;

const SearchLi = styled.li`
    background-color: #4A4A4A;
    list-style: none;
    height: 48px;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    margin-right: 12px;
    margin-top: 12px;
    border-radius: 4px;
`;

const SearchSpan = styled.span`
    color: white;
    font-size: 20px;
`;

const InfoSearch = ({ searchRedux, fetchIdName }) => {
    useEffect(() => {
        fetchIdName()
    }, [])
    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
        setClickSearchButton(false)
    }
    const searchList = searchRedux.id_and_name.map(item => Object.values(item)[0])
    const filtered = (searchList, searchInput) => {
        return searchList.filter(value => {
            const regex = new RegExp(searchInput, 'g')
            return value.match(regex)
        })
    }

    const handleClick = (m) => {
        setSearch('')
        Storage.setData('stock_id_and_name', m)
        Storage.setData('notSearch', false)
        clickSearch(m)
    }
    const DisplayMatches = () => {
        const matchArray = filtered(searchList, search)
        if (search === '') {
            return null
        } else return (
            <>
                {
                    matchArray.map((m, index) => {
                        return (
                            <SearchLi key={index} onClick={() => handleClick(m)}>
                                <Link to='/stockinfo'>
                                    {/* <StyledHeaderItem>個股資訊</StyledHeaderItem> */}
                                    <SearchSpan>{m}</SearchSpan>
                                </Link>
                            </SearchLi>
                        )
                    })
                }
            </>
        )
    }

    const [clickSearchButton, setClickSearchButton] = useState(false)
    const handleSearchClick = (e) => {
        e.preventDefault()
        // console.log('click search button')
        setClickSearchButton(true)
    }

    return (
        <DefaultLayout noSidebar>
            <SearchForm>
                <SearchTitleContainer>
                    <SearchTitle>搜尋股票</SearchTitle>
                </SearchTitleContainer>
                <SearchContainer>
                    <SearchIcon>
                        <SearchOutlined
                            style={{ fontSize: '40px', fill: 'white' }}
                        />
                    </SearchIcon>
                    <SearchInput
                        type='text'
                        placeholder='請輸入股票名稱或代碼'
                        value={search}
                        onChange={inputSearch}
                    />
                    <SearchButton onClick={handleSearchClick}>SEARCH</SearchButton>
                </SearchContainer>
                <SearchUl>
                    {
                        clickSearchButton ? (
                            <DisplayMatches />
                        ) : (
                            <></>
                        )
                    }
                </SearchUl>
            </SearchForm>
        </DefaultLayout>
    )
};

const mapStateToProps = state => {
    return {
        searchRedux: state.search,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clickSearch: (s) => dispatch(clickSearch(s)),
        fetchIdName: () => dispatch(fetchIdName()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoSearch);