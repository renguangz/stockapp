const { apiUrl, headers } = require('../../components/common/api');

export const fetchChipRequest = () => {
    return {
        type: 'FETCH_CHIP_REQUEST'
    }
}

export const fetchChipSuccess = (data) => {
    return {
        type: 'FETCH_CHIP_SUCCESS',
        payload: data
    }
}

export const fetchChipError = error => {
    return {
        type: 'FETCH_CHIP_ERROR',
        payload: error
    }
}

export const fetchChip = stockid => dispatch => {
    dispatch(fetchChipRequest)
    fetch(`${apiUrl}/legalPerson`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            'table_name': stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(fetchChipSuccess(data))
    }).catch(err => {
        dispatch(fetchChipError(err))
    })
}