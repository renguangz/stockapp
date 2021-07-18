import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchIdNameSuccess, handleSearch } from '../../redux';
import { fetchIdName } from '../../redux';
import styled from 'styled-components';

const SearchUl = styled.ul`
    border: 1px solid white;
    position: absolute;
    width: 100%;
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


const Search = ({ searchRedux, fetchIdName }) => {
    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }

    // 做空白點擊時顯示歷史搜尋，輸入東西時顯示符合條件的股票
    useEffect(() => {
        fetchIdName()
    }, [])

    const searchList = searchRedux.id_and_name.map(item => Object.values(item)[0])

    // 成功找到
    const filtered = (searchList, searchInput) => {
        return searchList.filter(value => {
            const regex = new RegExp(searchInput, 'g')
            return value.match(regex)
        })
    }
    // 接下來做display以及傳遞到sidebar
    const handleClick = () => {

        return null
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
                            <SearchLi key={index} onClick={handleClick}>
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
            console.log(filtered(searchList, search)[0])
            setSidebarDisplay(filtered(searchList, search)[0])
        }
        setSearch('');
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
        fetchIdName: () => dispatch(fetchIdName())
    }
};

export default connect(mappedStateToProps, mappedDispatchToProps)(Search);