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

export const fetchBasicIncome = stockid => dispatch => {
    dispatch(fetchBasicRequest)
}

export const fetchBasic = stockid => {
    return async (dispatch) => {
        dispatch(fetchBasicRequest)
        const fetchBalance = await fetch('/balance', {
            method: 'POST',
            body: JSON.stringify({
                'table_name': stockid
            })
        }).then(res => res.json()).then(data => {
            return data
        }).catch(err => dispatch(fetchBasicError(err)))

        const fetchIncome = await fetch('/income', {
            method: 'POST',
            body: JSON.stringify({
                'table_name': stockid
            })
        }).then(res => res.json()).then(data => {
            return data
        }).catch(err => dispatch(fetchBasicError(err)))

        const fetchCashFlow = await fetch('/cashFlow',{
            method: 'POST',
            body: JSON.stringify({
                'table_name': stockid
            })
        }).then(res => res.json()).then(data => {
            return data
        }).catch(err => dispatch(fetchBasicError(err)))
         await dispatch({ type: 'FETCH_BASIC_SUCCESS', payload: { income: fetchIncome, balance: fetchBalance, cashFlow: fetchCashFlow } })
    }
}