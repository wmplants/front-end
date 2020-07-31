import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom";
import { Security } from "@okta/okta-react";
import {issuer, client_id, redirect_uri} from './app.config'

const onAuthRequired = ({ history }) => history.push("/login");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Security
        issuer={issuer}
        client_id={client_id}
        redirect_uri={redirect_uri}
        onAuthRequired={onAuthRequired}
      >
        <App />
      </Security>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
