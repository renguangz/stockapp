import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
});

export default rootReducer;