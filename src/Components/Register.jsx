import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useStateValue } from "../StateManagement/StateProvider";

import "../Styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();

  const register = (e) => {
    e.preventDefault();
    //Create User with Email and Password
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        //Set Username
        updateProfile(cred.user, {
          displayName: username,
        });

        dispatch({
          type: "SET_USERNAME",
          username,
        });

        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="register">
      <div className="register__contentContainer">
        <Link to="/" className="register__link">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
            alt="Amazon Logo"
            className="register__logo"
          />
        </Link>
        <div className="register__container">
          <h1 className="register__title">Create Account</h1>
          <form className="register__form">
            <h5 className="register__form__h5">Your Name</h5>
            <input
              type="text"
              className="register__form__input"
              placeholder="First and Last Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h5 className="register__form__h5">Email</h5>
            <input
              type="text"
              className="register__form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5 className="register__form__h5">Password</h5>
            <input
              type="password"
              className="register__form__input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register__continueButton" onClick={register}>
              Continue
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="register__signInLink">
              Sign in ➤
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
