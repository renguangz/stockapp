const initialState = {
    loading: true,
    data: [],
    error: ''
}

const marginTradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MARGIN_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_MARGIN_SUCCESS':
            return {
                ...state,
                data: action.payload
            }
        case 'FETCH_MARGIN_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
};

export default marginTradeReducer;