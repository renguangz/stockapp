import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';
import searchReducer from './search/searchReducer';
import basicReducer from './infoBasic/basicReducer';
import candlestickReducer from './candlestick/candlestickReducer';
import mouseEventReducer from './mouseEvent/mouseReducer';
import chipReducer from './stockChip/chipReducer';
import marginTradeReducer from './marginTrade/marginTradeReducer';
import listInfoReducer from './listInfo/listInfoReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stockList: listReducer,
    search: searchReducer,
    basic: basicReducer, 
    price: candlestickReducer,
    mouseEvent: mouseEventReducer,
    chip: chipReducer,
    marginTrade: marginTradeReducer,
    listInfo: listInfoReducer,
});

export default rootReducer;