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

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/antd">
            <DefaultLayoutAntd />
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
  );
}

export default App;
