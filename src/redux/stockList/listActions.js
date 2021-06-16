export const addStock = (stockid) => {
    return {
        type: 'ADD_STOCK',
    }

}

const removeStock = (stockid) => {
    return {
        type: 'REMOVE_STOCK',
        stockid
    }
}
