import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stickList: listReducer,
});

export default rootReducer;