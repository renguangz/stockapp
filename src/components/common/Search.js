import React, { useState } from 'react';

const Search = () => {
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
                    placeholder="search stock name" />
            </form>
        </div>
    )
};

export default Search;