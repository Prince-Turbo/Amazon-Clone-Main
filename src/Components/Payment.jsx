import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import { useStateValue } from "../StateManagement/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getCartCount, getCartTotal } from "../StateManagement/reducer";
import axiosInstance from "../axios.js";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

//Stripe Import
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "../Styles/Payment.css";

const Payment = () => {
  const [{ cart, username, user }, dispatch] = useStateValue();
  const transitions = useTransition(cart, {
    from: { transform: "translate3d(-50%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(50%,0,0)", opacity: 0 },
  });

  const navigate = useNavigate();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    //Generate a client secret to make sure the client is charged
    const getClientSecret = async () => {
      const response = await axiosInstance.post(`/payments/create`, {
        amount: getCartTotal(cart) * 100,
      });
      setClientSecret(response.data?.clientSecret);
    };

    getClientSecret();
  }, [cart]);
  //Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ordersRef = doc(
          db,
          "users",
          user?.uid,
          "orders",
          paymentIntent.id
        );
        setDoc(ordersRef, {
          cart,
          amount: paymentIntent.amount,
          createdAt: paymentIntent.created,
        });
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        dispatch({
          type: "EMPTY_CART",
        });
        navigate("/orders", { replace: true });
      })
      .catch((error) => {
        setError(`Payment failed ${error.message}`);
        setProcessing(false);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ({" "}
          <Link to="/checkout" className="payment__checkoutLink">
            {" "}
            {getCartCount(cart)} items
          </Link>{" "}
          )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{username}</p>
            <p>{user?.email}</p>
            <p>123, React Lane, Context-API Street</p>
            <p>Bengaluru, Karnataka, India</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {transitions((props, item, key, i) => (
              <animated.div style={props} key={key}>
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  index={i}
                  quantity={item.quantity}
                  key={`${item.id}${i}`}
                />
              </animated.div>
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe JS Magic Payment Method addition */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  thousandSeparator={true}
                  thousandSpacing={"2s"}
                  prefix={"₹"}
                  displayType={"text"}
                  value={getCartTotal(cart)}
                  fixedDecimalScale={true}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  className="payment__button"
                >
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
            </form>
            {error && <div className="payment__error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
