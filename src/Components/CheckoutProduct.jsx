import React from "react";
import CurrencyFormat from "react-currency-format";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../StateManagement/StateProvider";

import "../Styles/CheckoutProduct.css";

const CheckoutProduct = ({
  id,
  index,
  image,
  price,
  title,
  rating,
  quantity,
}) => {
  const [{ cart }, dispatch] = useStateValue();
  const incrementQuantity = () => {
    //Increase Quantity
    dispatch({
      type: "INCREASE_QUANTITY",
      id,
    });
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      //Decrease Quantity
      dispatch({
        type: "DECREASE_QUANTITY",
        id,
      });
    } else if (quantity === 1) {
      //Remove item
      dispatch({
        type: "REMOVE_FROM_CART",
        id,
        index,
      });
    }
  };
  const removeProduct = () => {
    //Remove item from basket
    dispatch({
      type: "REMOVE_FROM_CART",
      id,
      index,
    });
  };

  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <div className="checkoutProduct__basicInfo">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__stock">In Stock</p>
          <img
            src="https://www.nicepng.com/png/full/115-1159983_amazon-prime-logo-prime-amazon.png"
            alt=""
            className="checkoutProduct__prime"
          />

          <div className="checkoutProduct__rating">
            {Array(5)
              .fill()
              .map((star, i) => {
                const starValue = i + 1;
                return (
                  <StarIcon
                    className={
                      starValue <= rating
                        ? "checkoutProduct__filledStar"
                        : "checkoutProduct__emptyStar"
                    }
                    key={starValue}
                  />
                );
              })}
          </div>
        </div>
        <div className="checkoutProduct__buttons">
          <div className="checkoutProduct__quantity">
            <h5 className="checkoutProduct__quantityTitle">Qty:</h5>
            <button
              className="checkoutProduct__quantityButton"
              onClick={decrementQuantity}
            >
              -
            </button>
            <p className="checkoutProduct__quantityText">{quantity}</p>
            <button
              className="checkoutProduct__quantityButton"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <button className="checkoutProduct__button" onClick={removeProduct}>
            Delete
          </button>
        </div>
      </div>
      <p className="checkoutProduct__price">
        <strong>
          <CurrencyFormat
            decimalScale={2}
            thousandSeparator={true}
            thousandSpacing={"2s"}
            prefix={"₹"}
            displayType={"text"}
            value={price}
            fixedDecimalScale={true}
          />
        </strong>
      </p>
    </div>
  );
};

export default CheckoutProduct;
