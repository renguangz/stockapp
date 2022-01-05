
const { apiUrl, headers } = require('../../components/common/api');

const fetchListinfoRequest = () => {
    return {
        type: 'FETCH_LISTINFO_REQUEST'
    }
}

const fetchListinfoSuccess = (price, basic) => {
    return {
        type: 'FETCH_LISTINFO_SUCCESS',
        payload: {
            price,
            basic,
        }
    }
}

const fetchListinfoFail = (error) => {
    return {
        type: 'FETCH_LISTINFO_FAIL',
        payload: error
    }
}

export const fetchListInfo = stockid => {
    return async dispatch => {
        const fetchPrice = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                'table_name': stockid
            })
        }).then(res => res.json()).then(data => {
            return data
        }).catch(err => dispatch(fetchListinfoFail(err)))

        const fetchBasic = await fetch(`${apiUrl}/balance`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'table_name': stockid
            })
        }).then(res => res.json()).then(data => {
            return data
        }).catch(err => dispatch(fetchListinfoFail(err)))

        dispatch({ type: 'FETCH_LISTINFO_SUCCESS', payload: { price: fetchPrice, basic: fetchBasic } })
    }
}