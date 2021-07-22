const initialState = {
    loading: true,
    stockid: [],
    error: '',
    basic: [],
    cash: '',
    own: ''
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_LIST_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_STOCK':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }

        case 'DELETE_STOCK':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }
        case 'FETCH_LIST_STOCK_SUCCESS':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }
        case 'FETCH_LIST_STOCK_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
};

export default listReducer;