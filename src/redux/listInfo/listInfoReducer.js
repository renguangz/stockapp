const initialState = {
    price: []    
}

const listInfoReducer = (state = initialState, action) => {
    switch (action.case) {
        case 'FETCH_LISTINFO_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_LISTINFO_SUCCESS': 
            return {
                ...state,
                loading: false,
                price: action.payload.price,
                basic: action.payload.basic,
            }
        default: return state
    }
}

export default listInfoReducer;