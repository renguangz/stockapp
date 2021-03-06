const { apiUrl, headers } = require('../../components/common/api');

export const fetchPriceRequest = () => {
    return {
        type: 'FETCH_PRICE_REQUEST'
    }
}

export const fetchPriceSuccess = stockid => {
    return {
        type: 'FETCH_PRICE_SUCCESS',
        payload: stockid
    }
}

export const fetchPriceError = error => {
    return {
        type: 'FETCH_PRICE_ERROR',
        payload: error
    }
}

export const fetchPrice = stockid => dispatch => {
    dispatch(fetchPriceRequest)
    fetch(`${apiUrl}/stockprice`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            'table_name': stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(fetchPriceSuccess(data))
    }).catch(err => dispatch(fetchPriceError(err)))
}