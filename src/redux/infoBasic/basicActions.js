export const fetchBasicRequest = () => {
    return {
        type: 'FETCH_BASIC_REQUEST'
    }
}

export const fetchBasicSuccess = (info) => {
    return {
        type: 'FETCH_BASIC_SUCCESS',
        payload: {
            income: info,
        },
    }
}

export const fetchBasicError = error => {
    return {
        type: 'FETCH_BASIC_ERROR',
        payload: error
    }
}

export const fetchBasic = stockid => dispatch => {
    dispatch(fetchBasicRequest)
    fetch('/income', {
        method: 'POST',
        body: JSON.stringify({
            'table_name': stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(fetchBasicSuccess(data))
    }).catch(err => dispatch(fetchBasicError(err)))
}