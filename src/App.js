import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StockInfoPage from './components/pages/StockInfoPage';
import StockListPage from './components/pages/StockListPage';
import HomePage from './components/pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeBook from './components/pages/HomeBook';
import HomeCarousel from './components/layouts/HomeCarousel';
import InfoSearch from './components/common/InfoSearch';

function App() {
  const baseUrl = process.env.PUBLIC_URL;
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/homecarousel">
              <HomeCarousel />
            </Route>
            <Route exact path="/book">
              <HomeBook />
            </Route>
            <Route exact path={baseUrl + '/'}>
              <HomePage />
            </Route>
            <Route exact path="/stockinfo">
              <StockInfoPage />
            </Route>
            <Route exact path="/mylist">
              <StockListPage />
            </Route>
            <Route exact path="/search">
              <InfoSearch />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
