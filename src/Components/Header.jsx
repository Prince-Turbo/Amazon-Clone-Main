import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../StateManagement/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { getCartCount } from "../StateManagement/reducer";

import "../Styles/Header.css";

const Header = () => {
  const [{ cart, user, username }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/" className="header__link">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt="Amazon Logo"
          className="header__logo"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__options">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_India.png/1280px-Flag_of_India.png"
            alt="Indian Flag"
            className="header__country"
          />
        </div>

        <div
          className="header__options header__options--auth"
          onClick={handleAuthentication}
        >
          <span className="header__option__one">
            Hello, {user ? username : "Guest"}
          </span>
          <span className="header__option__two">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </div>
        <Link to={user ? "/orders" : '/login'} className="header__link">
          <div className="header__options">
            <span className="header__option__one">Returns</span>
            <span className="header__option__two">& Orders</span>
          </div>
        </Link>
        <div className="header__options">
          <span className="header__option__one">Your</span>
          <span className="header__option__two">Prime</span>
        </div>
        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <div className="header__options header__options--basket">
              <span className="header__option__two header__basketCount">
                {getCartCount(cart)}
              </span>
              <span className="header__option__two header__option__two--cart">
                Cart
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
