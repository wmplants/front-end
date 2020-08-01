import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export default function NavBar(props) {
  const [userAuth, setUserAuth] = useState(null);
  const { authState } = useOktaAuth();

  useEffect(() => {
    const authenticated = authState.isAuthenticated();
    if (authenticated !== userAuth) setUserAuth(authenticated);
  }, [userAuth, authState]);

  if (userAuth === null) return null;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {userAuth ? (
          <LoggedInNav props={props} />
        ) : (
          <LoggedOutNav props={props} />
        )}
      </ul>
    </nav>
  );
}

function LoggedInNav(props) {
  return (
    <ul className="auth-nav">
      <li>
        <a href="javascript:void(0)" onClick={() => props.auth.logout()}>
          Logout
        </a>
      </li>
      <li>
        <Link to="/landingpage">Landing Page</Link>
      </li>
    </ul>
  );
}

function LoggedOutNav(props) {
  return (
    <ul className="auth-nav">
      <li>
        <a href="javascript:void(0)" onClick={() => props.auth.login()}>
          Login
        </a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
}
