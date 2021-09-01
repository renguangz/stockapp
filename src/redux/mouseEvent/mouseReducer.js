const initialState = {
    mousex: null,
}

const mouseEventReducer = (state = initialState) => {
    return {
        ...state,
        mousex: state.mousex
    }
};

export default mouseEventReducer;