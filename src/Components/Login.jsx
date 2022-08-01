import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import "../Styles/Login.css";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    //Sign In with Email and Password
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__contentContainer">
        <Link to="/" className="login__link">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
            alt="Amazon Logo"
            className="login__logo"
          />
        </Link>
        <div className="login__container">
          <h1 className="login__title">Sign-In</h1>

          <form className="login__form">
            <h5 className="login__form__h5">Email</h5>
            <input
              type="text"
              className="login__form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5 className="login__form__h5">Password</h5>
            <input
              type="password"
              className="login__form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__signInButton" onClick={signIn}>
              Sign-In
            </button>
          </form>
          <p>
            By signing-in you agree to <strong>AMAZON FAKE CLONE's</strong>{" "}
            Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
            Notice and our Interest-Based Ads.
          </p>
        </div>
        <div className="login__newText">
          <span className="login__span login__span--left"></span>
          <p>New to Amazon?</p>
          <span className="login__span login__span--right"></span>
        </div>
        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
