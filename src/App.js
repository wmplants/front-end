import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { SecureRoute, ImplicitCallBack } from "@okta/okta-react";

import * as Component from "./components";
import oktaConfig from "./app.config.js";

function App() {
  return (
    <div className="App">
      {Component.NavBar}
      <main>
        <Route exact path="/" component={Component.HomePage} />
        <Route
          path="/login"
          render={() => <Component.Login baseurl={oktaConfig.url} />}
        />
        <Route path="/implicit/callback" component={ImplicitCallBack} />
        <Route
          path="/register"
          render={() => <Component.RegisterForm baseurl={oktaConfig.url} />}
        />
        <SecureRoute path="/" component={Component.ProfilePage} />
      </main>
    </div>
  );
}

export default App;
