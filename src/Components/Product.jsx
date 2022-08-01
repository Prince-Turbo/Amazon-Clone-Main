import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../StateManagement/StateProvider";
import CurrencyFormat from "react-currency-format";

import "../Styles/Product.css";

const Product = ({ id, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id,
        title,
        image,
        price,
        rating,
        quantity: 1,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
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
        <div className="product__rating">
          {Array(5)
            .fill()
            .map((star, i) => {
              const starValue = i + 1;
              return (
                <StarIcon
                  className={
                    starValue <= rating
                      ? "product__filledStar"
                      : "product__emptyStar"
                  }
                  key={starValue}
                />
              );
            })}
        </div>
      </div>
      <img className="product__image" src={image} alt="" />
      <button className="product__button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
