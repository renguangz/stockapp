const initialState = {
    loading: true,
    inputValue: '',
    stockinfo: [],
    error: ''
};

const stockReducer = (state = initialState, action) => {
    console.log(state, action)
    switch (action.type) {
        case 'FETCH_STOCKINFO_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'HANDLE_SEARCH':
            return {
                ...state,
                loading: false,
                inputValue: action.payload
            }
        case 'FETCH_STOCKINFO_SUCCESS':
            return {
                ...state,
                loading: false,
                stockinfo: action.payload,
                error: ''
            }
        case 'FETCH_STOCKINFO_FAILURE':
            return {
                ...state,
                loading: false,
                stockinfo: [],
                error: action.payload
            }
        default: return state
    }
};

export default stockReducer;
