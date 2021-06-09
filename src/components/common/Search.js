import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSearch } from '../../redux';


const Search = (props) => {
    const [search, setSearch] = useState('')
    const inputSearch = (input) => {
        setSearch(input.target.value)
    }

    // 做空白點擊時顯示歷史搜尋，輸入東西時顯示符合條件的股票

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={search}
                    onChange={inputSearch}
                    placeholder="股票代碼" />
                <input
                    type="submit"
                    value='🔍'
                    onSubmit={props.handleSearch}
                />
            </form>
        </div>
    )
};

const mappedStateToProps = state => {
    return {
        inputValue: state.stockInfo.inputValue
    }
};

const mappedDispatchToProps = dispatch => {
    return {
        handleSearch: (input) => dispatch(handleSearch(input))
    }
};

export default connect(mappedStateToProps, mappedDispatchToProps)(Search);