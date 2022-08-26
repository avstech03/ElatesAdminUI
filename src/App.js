import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./Components/Login";
import HomeHOC from "./Components/Home";
import AndroidDownloader from "./Components/AndroidDownloader";

const history = createBrowserHistory();

function App() {
  return (
    <body>
      <Router history={history} baseline="/index.html">
        <Switch>
          <Route path="/home" render={() => <HomeHOC />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/android" render={() => <AndroidDownloader />} />
          <Route path="/" render={() => <Redirect to="/home" />}></Route>
        </Switch>
      </Router>
    </body>
  );
}

export default App;
