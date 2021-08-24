const initialState = {
    loading: true,
    price: [],
    error: '',
}

const priceReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_PRICE_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_PRICE_SUCCESS':
            return {
                ...state,
                loading: false,
                price: action.payload
            }
        case 'FETCH_PRICE_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
}

export default priceReducer;