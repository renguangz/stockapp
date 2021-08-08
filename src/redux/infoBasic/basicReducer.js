const initialState = {
    loading: true,
    income: [],
    balance: [],
    cashFlow: [],
    error: '',
}

const basicReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BASIC_REQUEST':
            return {
                ...state,
                loading: false,
            }
        case 'FETCH_BASIC_SUCCESS':
            return {
                ...state,
                loading: false,
                income: action.payload.income,
                balance: action.payload.balance,
                cashFlow: action.payload.cashFlow
            }
        case 'FETCH_BASIC_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
};

export default basicReducer;