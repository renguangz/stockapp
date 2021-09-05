export const fetchMarginRequest = () => {
    return {
        type: 'FETCH_MARGIN_REQUEST'
    }
}

export const fetchMarginSuccess = data => {
    return {
        type: 'FETCH_MARGIN_SUCCESS',
        payload: data
    }
}

export const fetchMarginError = error => {
    return {
        type: 'FETCH_MARGIN_ERROR',
        payload: error
    }
}

export const fetchMarginTrade = stockid => dispatch => {
    dispatch(fetchMarginRequest)
    fetch('/marginTrade', {
        method: 'POST',
        body: JSON.stringify({
            'table_name': stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(fetchMarginSuccess(data))
    }).catch(err => {
        dispatch(fetchMarginError(err))
    })
}