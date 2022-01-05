const { apiUrl, headers } = require('../../components/common/api');

export const fetchBasicRequest = () => {
    return {
        type: 'FETCH_BASIC_REQUEST'
    }
}

export const fetchBasicSuccess = (income, balance, cashFlow) => {
    return {
        type: 'FETCH_BASIC_SUCCESS',
        payload: {
            income,
            balance,
            cashFlow,
        }
    }
}

export const fetchBasicError = error => {
    return {
        type: 'FETCH_BASIC_ERROR',
        payload: error
    }
}

export const fetchBasic = stockid => {
    return async (dispatch) => {
        // dispatch(fetchBasicRequest)
        await Promise.all(
            [
                fetch(`${apiUrl}/income`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json()),
                fetch(`${apiUrl}/balance`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json()),
                fetch(`${apiUrl}/cashFlow`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json())
            ]
        ).then(([income, balance, cashFlow]) => {
            dispatch({ type: 'FETCH_BASIC_SUCCESS', payload: { income, balance, cashFlow } })
        })
    }
}