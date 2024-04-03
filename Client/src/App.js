import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat, NotFound, Register, Login } from "./views";
import { useEffect } from "react";
import Auth from "./Auth";
import AppRoute from "./AppRoute";

export default class App extends Component {
  constructor(props) {
    super(props);
    Auth.init();
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <AppRoute
              path='/'
              exact
              component={Chat}
              can={Auth.auth}
              redirect='/login'
            />
            <AppRoute
              path='/register'
              component={Register}
              can={Auth.guest}
              redirect='/'
            />
            <AppRoute
              path='/Login'
              component={Login}
              can={Auth.guest}
              redirect='/'
            />
            <AppRoute path='*' component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}
