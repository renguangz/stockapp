const { apiUrl, headers } = require('../../components/common/api');

export const fetchListRequest = () => {
    return {
        type: 'FETCH_LIST_REQUEST'
    }
}

const addStock = (stockid) => {
    return {
        type: 'ADD_STOCK',
        payload: stockid
    }

}

const removeStock = (stockid) => {
    return {
        type: 'REMOVE_STOCK',
        payload: stockid
    }
}

const fetchListStockSuccess = stockid => {
    return {
        type: 'FETCH_LIST_STOCK_SUCCESS',
        payload: stockid
    }
}

const fetchListStockFail = error => {
    return {
        type: 'FETCH_LIST_STOCK_FAIL',
        payload: error
    }
}

export const listStock = () => dispatch => {
    dispatch(fetchListRequest)
    fetch(`${apiUrl}/add_pocket_stock`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(data => dispatch(fetchListStockSuccess(data)))
        .catch(err => dispatch(fetchListStockFail(err)))
}

export const addListStock = stockid => dispatch => {
    fetch(`${apiUrl}/add_pocket_stock`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(addStock(data))
    }).catch(err => {
        dispatch(fetchListStockFail(err))
    })
}

export const removeListStock = stockid => dispatch => {
    fetch('/remove_pocket_stock', {
        method: 'POST',
        body: JSON.stringify({
            stockid
        })
    }).then(res => res.json()).then(data => {
        dispatch(removeStock(data))
    }).catch(err => dispatch(fetchListStockFail(err)))
}

// export const fetchListInfo = async stockid => dispatch => {
//     await fetch()
// }