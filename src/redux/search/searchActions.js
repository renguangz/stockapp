export const fetchIdNameRequest = () => {
    return {
        type: 'FETCH_ID_NAME_REQUEST',
    }
}

export const fetchIdNameSuccess = stock => {
    return {
        type: 'FETCH_ID_NAME_SUCCESS',
        payload: stock
    }
}

export const fetchIdNameError = error => {
    return {
        type: 'FETCH_ID_NAME_ERROR',
        payload: error
    }
}

export const fetchIdName = () => dispatch => {
    dispatch(fetchIdNameRequest)
    fetch('/search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            dispatch(fetchIdNameSuccess(data))
        }).catch(err => {
            dispatch(fetchIdNameError(err))
        })
}