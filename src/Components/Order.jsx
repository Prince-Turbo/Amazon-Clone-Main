import React from "react";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import "../Styles/Order.css";

const Order = ({ order }) => {
  return (
    <div className="order">
      <div className="order__header">
        <div className="order__headerDetail">
          <h5 className="order__text">ORDER PLACED</h5>
          <h5 className="order__text order__text--detail">
            {moment(order.data.createdAt * 1000).format("DD MMM YYYY")}
          </h5>
        </div>
        <div className="order__headerDetail">
          <h5 className="order__text">TOTAL</h5>
          <CurrencyFormat
            renderText={(value) => (
              <h5 className="order__text order__text--detail">{value}</h5>
            )}
            decimalScale={2}
            thousandSeparator={true}
            thousandSpacing={"2s"}
            prefix={"₹"}
            displayType={"text"}
            value={order.data.amount / 100}
            fixedDecimalScale={true}
          />
        </div>
        <div className="order__headerDetail order__headerDetail--id">
          <h5 className="order__text">ORDER</h5>
          <h5 className="order__text order__text--detail">{`#${order.id}`}</h5>
        </div>
      </div>
      <div className="order__main">
        <div className="order__main__status">
          <h3>Successful</h3>
        </div>
        <div className="order__main__items">
          {order.data.cart.map((item) => {
            return (
              <div className="order__item" key={item.id}>
                <img src={item.image} alt="" className="order__item__image" />
                <h5 className="order__text">{item.title}</h5>
                <div className="order__item__pq">
                  <div className="order__item__q">
                    <h5 className="order__text">Quantity:</h5>
                    <h5 className="order__text order__text--detail">
                      {item.quantity}
                    </h5>
                  </div>
                  <div className="order__item__p">
                    <h5 className="order__text">Price:</h5>
                    <CurrencyFormat
                      renderText={(value) => (
                        <h5 className="order__text order__text--detail">
                          {value}
                        </h5>
                      )}
                      decimalScale={2}
                      thousandSeparator={true}
                      thousandSpacing={"2s"}
                      prefix={"₹"}
                      displayType={"text"}
                      value={item.price * item.quantity}
                      fixedDecimalScale={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
