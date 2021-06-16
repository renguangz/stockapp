export const fetchStockRequest = () => {
    return {
        type: 'FETCH_STOCKINFO_REQUEST'
    }
}
const fetchStockSuccess = stock => {
    return {
        type: 'FETCH_STOCKINFO_SUCCESS',
        payload: stock
    }
}
const fetchStockFailure = error => {
    return {
        type: 'FETCH_STOCKINFO_FAILURE',
        payload: error
    }
}

export const handleSearch = inputValue => {
    return {
        type: 'HANDLE_SEARCH',
        payload: inputValue
    }
}

export const fetchStock = () => dispatch => {
    dispatch(fetchStockRequest)
    fetch('/api/allStock', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            dispatch(fetchStockSuccess(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchStockFailure(err))
        })
}