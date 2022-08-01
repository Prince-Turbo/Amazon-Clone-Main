import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { getCartCount, getCartTotal } from "../StateManagement/reducer";
import { useStateValue } from "../StateManagement/StateProvider";

import "../Styles/Subtotal.css";

const Subtotal = ({ right }) => {
  const [{ cart, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className={`subtotal ${right === false && `subtotal--left`}`}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p
              className={`subtotal__main ${
                right === false && `subtotal__main--left`
              }`}
            >
              Subtotal ({getCartCount(cart)} items): <strong>{value}</strong>
            </p>
            {right && (
              <small className="subtotal__gift">
                <input type="checkbox" />
                This order contains a gift
              </small>
            )}
          </>
        )}
        decimalScale={2}
        thousandSeparator={true}
        thousandSpacing={"2s"}
        prefix={"₹"}
        displayType={"text"}
        value={getCartTotal(cart)}
        fixedDecimalScale={true}
      />
      {right && (
        <button
          className="subtotal__button"
          onClick={(e) => (user ? navigate("/payment") : navigate("/login"))}
        >
          Proceed to Buy
        </button>
      )}
    </div>
  );
};

export default Subtotal;
