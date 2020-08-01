import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOktaAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
import axios from "axios";

export default function RegisterForm({ baseurl }) {
  const [token, setToken] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm();
  const { authService } = useOktaAuth();

  const oktaAuth = new OktaAuth({ url: baseurl });

  useEffect(() => {
    const sessionToken = authService.getIdToken();
    if (sessionToken) setToken(sessionToken);
  }, [authService]);

  function onSubmit(data) {
    console.log(data);

    axios
      .post("/api/users/reg-route-here", data)
      .then(() => login(data))
      .catch((err) => console.log("posting error: ", err));
  }

  function login({ email, password }) {
    oktaAuth
      .signIn({
        email: email,
        password: password,
      })
      .then((res) => setToken({ sessionToken: res.sessionToken }))
      .catch((err) => console.log("login error: ", err));
  }

  console.log(
    `phone: ${watch("phone")}\nemail: ${watch("email")}\npassword: ${watch(
      "password"
    )}`
  );

  if (token) authService.redirect({ sessionToken: token });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* phone */}
      <label htmlFor="phone">Mobile:</label>
      <input
        type="phone"
        name="phone"
        placeholder="800-867-5309"
        ref={register({ required: true })}
      />
      {errors.phone && <span>This field is required.</span>}
      {/* email */}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="abc@email.com"
        ref={register({ required: true })}
      />
      {errors.phone && <span>This field is required.</span>}
      {/* password */}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>This field is required.</span>}
      {/* submit */}
      <button type="submit">Submit</button>
    </form>
  );
}
