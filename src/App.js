import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './Components/Login';
import HomeHOC from './Components/Home';

const history = createBrowserHistory();

function App() {
  return (
    <body>
      <Router history={history}>
        <Switch>
          <Route path='/home' render={() => <HomeHOC />} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/' render={() => <Redirect to='/home'/>}></Route>
        </Switch>
      </Router>
    </body>
  )
}

export default App;
