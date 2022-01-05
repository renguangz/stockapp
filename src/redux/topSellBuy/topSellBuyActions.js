const { apiUrl, headers } = require('../../components/common/api');

export const fetchSellBuyRequest = () => {
    return {
        type: 'FETCH_SELLBUY_REQUEST'
    }
}

export const fetchSellBuySuccess = (topBuy, topSell) => {
    return {
        type: 'FETCH_SELLBUY_SUCCESS',
        payload: {
            topBuy,
            topSell
        }
    }
}

export const fetchSellBuyError = error => {
    return {
        type: 'FETCH_SELLBUY_ERROR',
        payload: error
    }
}

export const fetchSellBuy = stockid => {
    return async (dispatch) => {
        Promise.all(
            [
                fetch(`${apiUrl}/topBuy`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json()),
                fetch(`${apiUrl}/topSell`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'table_name': stockid
                    })
                }).then(res => res.json())
            ]
        ).then(([topBuy, topSell]) => {
            dispatch({ type: 'FETCH_SELLBUY_SUCCESS', payload: { topBuy, topSell } })
        })
        // const fetchTopBuy = await fetch('/topBuy', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'table_name': stockid
        //     })
        // }).then(res => res.json()).then(data => {
        //     return data
        // }).catch(err => dispatch(fetchSellBuyError(err)))

        // const fetchTopSell = await fetch('/topSell', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'table_name': stockid
        //     })
        // }).then(res => res.json()).then(data => {
        //     return data
        // }).catch(err => dispatch(fetchSellBuyError(err)))

        // dispatch({ type: 'FETCH_SELLBUY_SUCCESS', payload: { topBuy: fetchTopBuy, topSell: fetchTopSell } })
    }
}