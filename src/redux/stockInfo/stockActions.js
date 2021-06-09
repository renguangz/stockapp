import {
    FETCH_STOCKINFO_REQUEST,
    FETCH_STOCKINFO_SUCCESS,
    FETCH_STOCKINFO_FAILURE,
    HANDLE_SEARCH,
} from './stockTypes';

export const fetchStockRequest = () => {
    return {
        type: FETCH_STOCKINFO_REQUEST
    }
}
const fetchStockSuccess = stock => {
    return {
        type: FETCH_STOCKINFO_SUCCESS,
        payload: stock
    }
}
const fetchStockFailure = error => {
    return {
        type: FETCH_STOCKINFO_FAILURE,
        payload: error
    }
}

export const handleSearch = inputValue => {
    return {
        type: HANDLE_SEARCH,
        payload: inputValue
    }
}

export const fetchStockinfo = () => {
    return function (dispatch) {
        dispatch(fetchStockRequest())
        dispatch(handleSearch())
        fetch('/', {
            method: 'POST',
            body: JSON.stringify({

            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            dispatch(fetchStockSuccess(data))
        })
            .catch(error => {
                console.log(error, error.message)
                dispatch(fetchStockFailure(error.message))
            })
    }
}