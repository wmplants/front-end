import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import OktaAuth from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

export default function Login({baseUrl}) {
  const [userAuth, setUserAuth] = useState(null);
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    const authenticated = authState.isAuthenticated();
    if (authenticated !== userAuth) setUserAuth(authenticated);
  }, [userAuth, authState]);

  if (authState.isPending()) return <h1>Loading...</h1>;
  if (userAuth === null) return null;
  return userAuth ? (
    <Redirect to={{ pathname: "/profile" }} />
  ) : (
    <LoginForm baseUrl={baseUrl} authService={authService} />
  );
}

function LoginForm({baseUrl, authService}) {
  const [token, setToken] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm();
  const oktaAuth = new OktaAuth({ url: baseUrl });
  
  function onSubmit({ email, password }) {
    let data = { email, password };
    console.log(data);

    oktaAuth
      .signIn({
        email: email,
        password: password,
      })
      .then((res) => setToken(res.sessionToken))
      .catch((err) => console.log(err.statusCode + "error", err));
  }

  console.log(`email: ${watch("email")}\npassword: ${watch("password")}`);

  if (token) {
    authService.redirect({ sessionToken: token });
    return null;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* could create a form element component */}
      {/* email */}
      <div className="form-element">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="abc@email.com"
          ref={register({ required: true })}
        />
        {errors.phone && <span>This field is required.</span>}
      </div>
      {/* password */}
      <div className="form-element">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required.</span>}
      </div>
      {/* submit */}
      <button type="submit">Submit</button>
    </form>
  );
}
