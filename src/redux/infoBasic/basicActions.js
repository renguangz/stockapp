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
                fetch('/income', {
                    method: 'POST',
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json()),
                fetch('/balance', {
                    method: 'POST',
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json()),
                fetch('/cashFlow', {
                    method: 'POST',
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