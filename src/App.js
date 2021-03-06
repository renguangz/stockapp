import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import StockInfoPage from './components/pages/StockInfoPage';
import StockListPage from './components/pages/StockListPage';
import HomePage from './components/pages/HomePage';
import store from './redux/store';
import HomeBook from './components/pages/HomeBook';
import HomeCarousel from './components/layouts/HomeCarousel';
import InfoSearch from './components/common/InfoSearch';
import { Provider } from 'react-redux';
import HomeCarousel2D from './components/layouts/HomeCarousel2D';
import HomePageLayout from './components/layouts/homePageLayout';

function App() {
  const baseUrl = process.env.PUBLIC_URL;
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Route exact path="/index">
                <HomeCarousel />
              </Route>
              <Route exact path="/book">
                <HomeCarousel2D />
              </Route>
              <Route exact path='/'>
                <HomePageLayout />
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
            </BrowserRouter>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
