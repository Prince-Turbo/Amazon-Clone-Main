import React from "react";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateManagement/StateProvider";
import { Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import "../Styles/Checkout.css";

const Checkout = () => {
  const [{ cart }, dispatch] = useStateValue();
  const transitions = useTransition(cart, {
    from: { transform: "translate3d(-50%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(50%,0,0)", opacity: 0 },
  });
  return (
    <div className="checkout">
      <div className="checkout__ads">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Pay/CBCC/Refresh/swm-eng._CB657327711_.jpg"
          alt=""
          className="checkout__ad"
        />
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/malar/FlightsMMT/Prime_PC_-Offers-page-stripe.jpg"
          alt=""
          className="checkout__ad"
        />
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/digital/music/merch/India/2022/Mar/Alia_Bhatt_MMT_SWM_2_400x39._CB626232396_.jpg"
          alt=""
          className="checkout__ad"
        />
      </div>
      <div className="checkout__cart">
        <div className="checkout__cart__section checkout__cart__section--left">
          {cart.length === 0 ? (
            <>
              <div className="checkout__cart__empty">
                <h2 className="checkout__title checkout__title--empty">
                  Your Amazon Cart is empty.
                </h2>
                <p className="checkout__empty__text">
                  Looks like you haven't added anything to your cart yet.
                  <Link to="/" className="checkout__empty__link">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="checkout__cart__header">
                <h2 className="checkout__title">Shopping Cart</h2>
                <p className="checkout__price">Price</p>
              </div>

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

              <Subtotal right={false} />
            </>
          )}
        </div>
        <div className="checkout__cart__section checkout__cart__section--right">
          <Subtotal right={true} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
