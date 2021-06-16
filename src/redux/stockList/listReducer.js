const initialState = {
    data: []
}

const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_STOCK': 
            return {
                ...state,
            }

        case 'DELETE_STOCK':
            return {
                ...state,
            }

        default: return state
    }
};

export default listReducer;