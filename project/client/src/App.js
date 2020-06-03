import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter, Redirect, Switch } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import Home from './components/Home/Home';
import StudentLogin from './views/StudentLogin/StudentLogin'
import TeacherLogin from './views/TeacherLogin/TeacherLogin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ Home }></Route>
            <Route exact path="/student" component={ StudentLogin }></Route>
            <Route exact path="/teacher" component={ TeacherLogin }></Route>
            {indexRoutes.map((prop, key) => {
              return <Route to={prop.path} component={prop.component} key={key} />;
            })}
          </Switch>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;
