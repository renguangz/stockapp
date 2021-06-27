import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StockInfoPage from './components/pages/StockInfoPage';
import StockListPage from './components/pages/StockListPage';
import HomePage from './components/pages/HomePage';
import DefaultLayoutAntd from './components/layouts/DefaultLayoutAntd';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeBook from './components/pages/HomeBook';
import HomeCarousel from './components/layouts/HomeCarousel';

function App() {
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
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path="/stockinfo">
              <StockInfoPage />
            </Route>
            <Route exact path="/mylist">
              <StockListPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
