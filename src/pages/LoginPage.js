import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_QUERY } from "../graphql/queries";

const LoginPage = () => {
  const [email, setEmail] = useState("islam@test.com");
  const [password, setPassword] = useState("test@123");
  const { login } = useAuth();
let role;
  // console.log("login from loginPage", login);
  // const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [loginQuery, { loading, error }] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: (data) => {
      login(data.login);
    },
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginQuery({ variables: { email, password } });
      // login(data.login);
      // console.log("data from login page", data.login.user.token);
      if (data.login.status.code != 200) {
        throw new Error(data.login.status.message);
      }
      // localStorage.setItem('token', data.login.user.token);
      // localStorage.setItem('role', "user");
      login(data.login.user.token, data.login.user.role);
      console.log("data.login.user.token, data.login.user.role", data.login.user);
    if(data.login.user.role == "user") navigate("/homePage");
    if(data.login.user.role == "admin") navigate("/admin-homePage");
      // console.log("Hello Brother");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            //  disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
