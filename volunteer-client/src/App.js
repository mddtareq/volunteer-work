import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import Login from './container/Login/Login';
import Registration from './Registration/Registration';
import PrivateRoute from './container/PrivateRoute/PrivateRoute';
import RegisterdWork from './container/RegisterdWork/RegisterdWork';
import Admin from './Admin/Admin';
export const UserContext = createContext();
function App() {
  const [logged, setLogged] = useState({});
  return (
    <UserContext.Provider value={[logged, setLogged]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/volunteer-work/:name">
          <Registration></Registration>
          </PrivateRoute>
          <PrivateRoute path="/registered">
          <RegisterdWork></RegisterdWork>
          </PrivateRoute>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
