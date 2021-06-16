import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import LoggerScreen from './Screens/LoggerScreen'

import './Utils.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/logger">
          <LoggerScreen />
        </Route>
        <PrivateRoute component={HomeScreen} exact path="/" />
      </Switch>
    </Router>
  );
}

export default App;
