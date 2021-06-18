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

const fetchListStock = stockid => {
    return {
        type: 'FETCH_LIST_STOCK',
        payload: stockid
    }
}

export const listStock = () => dispatch => {
    dispatch(fetchListRequest)
    fetch('/add_pocket_stock', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(data => dispatch(fetchListStock(data)))
        .catch(err => console.log(err))
}

export const addListStock = stockid => dispatch => {
    fetch('/add_pocket_stock', {
        method: 'POST',
        body: JSON.stringify({
            stockid
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        dispatch(addStock(data))
    })
}