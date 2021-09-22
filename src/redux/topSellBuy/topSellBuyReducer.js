const initialState = {
    loading: true,
    topBuy: [],
    topSell: [],
    error: '',
}

const topSellBuyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SELLBUY_REQUEST':
            return {
                ...state,
                loading: false,
            }
        case 'FETCH_SELLBUY_SUCCESS':
            return {
                ...state,
                loading: false,
                topBuy: action.payload.topBuy,
                topSell: action.payload.topSell
            }
        case 'FETCH_SELLBUY_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
};

export default topSellBuyReducer;