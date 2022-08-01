import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import Payment from "./Payment";
import Orders from "./Orders";
import { useStateValue } from "../StateManagement/StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
//Stripe JS Imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../Styles/App.css";

//Take The Promise from Stripe using Publish Key
const stripePromise = loadStripe(
  "pk_test_51LQsvjSGCLaIWEEFCllqDYKQSynLZSQG1ExeTxgmqb1qUkuvPFiHrIdPSL7T0bv5OZx2sZiGqhjiOcmzJcJKVcwJ00aY69L966"
);

const App = () => {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //Subscribe to Auth State Change from Firebase
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //If user is Logged In
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        dispatch({
          type: "SET_USERNAME",
          username: authUser.displayName,
        });
      } else {
        //If user is Logged Out
        dispatch({
          type: "SET_USER",
          user: null,
        });

        dispatch({
          type: "SET_USERNAME",
          username: null,
        });
      }
    });

    //Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
