import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchIdNameSuccess, handleSearch, clickSearch } from '../../redux';
import { fetchIdName } from '../../redux';
import styled from 'styled-components';
import * as Storage from '../helper/StorageHelper';

const SearchUl = styled.ul`
    border: 1px solid white;
    position: absolute;
    width: 100%;
    padding: 0;
`;

const SearchLi = styled.li`
    border: 1px solid pink;
    background-color: white;
    list-style: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
`;

const SearchSpan = styled.span`
    color: black;
`;


const Search = ({ searchRedux, fetchIdName, clickSearch }) => {
    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }

    useEffect(() => {
        fetchIdName()
    }, [])

    const searchList = searchRedux.id_and_name.map(item => Object.values(item)[0])
    const filtered = (searchList, searchInput) => {
        return searchList.filter(value => {
            const regex = new RegExp(searchInput, 'g')
            return value.match(regex)
        })
    }
    const handleClick = (m) => {
        clickSearch(m)
        setSearch('')
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
                                <SearchSpan>{m}</SearchSpan>
                            </SearchLi>
                        )
                    })
                }
            </>
        )
    }
    const [sidebarDisplay, setSidebarDisplay] = useState(searchList[1])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search === '') {
            return null
        } else {
            setSidebarDisplay(filtered(searchList, search)[0])
        }
        setSearch('');
        clickSearch(sidebarDisplay)
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={search}
                    onChange={inputSearch}
                    placeholder="股票代碼"
                />
                <button onClick={handleSubmit}>🔍</button>
            </form>
            <SearchUl>
                <DisplayMatches />
            </SearchUl>
        </div>
    )
};

const mappedStateToProps = state => {
    return {
        inputValue: state.stockInfo.inputValue,
        searchRedux: state.search,
    }
};

const mappedDispatchToProps = dispatch => {
    return {
        handleSearch: (input) => dispatch(handleSearch(input)),
        fetchIdName: () => dispatch(fetchIdName()),
        clickSearch: (s) => dispatch(clickSearch(s))
    }
};

export default connect(mappedStateToProps, mappedDispatchToProps)(Search);