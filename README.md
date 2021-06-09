* fixed 不由components的東西管理，由layout決定（在做header & sidebar 不需要做fixed）
* components 做小東西樣式，layouts決定佈局，pages決定最終頁面呈現的內容
* 在 fixed 的時候會要把下面的物件往下推，用 <ClearFix />
* 從 search 拿到 input value, 再把 value 傳到後端做 POST method
    - initialState: loading, data, error
    - action types: 'FETCH_STOCKID_REQUEST', 'FETCH_STOCKID_SUCCESS', 'FETCH_STOCKID_FAILURE'
    - actions: 
    - reducer: 
    - store: 
    - components: mappedStateToProps 從<Search />拿到 input value, 做 mappedDispatchtoProps 做 POST, 到 StockInfoPage做渲染