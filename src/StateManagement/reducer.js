export const initialState = {
  cart: [],
  user: null,
  username: null,
};

//Selector
export const getCartCount = (cart) => {
  return cart?.reduce((count, item) => count + item.quantity, 0);
};

export const getCartTotal = (cart) => {
  return cart?.reduce((amount, item) => {
    return amount + item.price * item.quantity;
  }, 0);
};

const reducer = (state, action) => {
  let newCart = [...state.cart];
  switch (action.type) {
    //ADD to cart from the home page, or increase quantity if added from home page
    case "ADD_TO_CART":
      const foundIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.item.id
      );
      if (foundIndex >= 0) {
        newCart.splice(foundIndex, 1, {
          ...state.cart[foundIndex],
          quantity: state.cart[foundIndex].quantity + 1,
        });
        return { ...state, cart: newCart };
      } else {
        return { ...state, cart: [...state.cart, action.item] };
      }
    //REMOVE from cart from the checkout page using delete button
    case "REMOVE_FROM_CART":
      if (action.index >= 0) {
        newCart.splice(action.index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id} as it is not in the basket!)`
        );
      }
      return { ...state, cart: newCart };
    //Increase the quantity from the checkout page
    case "INCREASE_QUANTITY":
      const quantityIncIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      if (quantityIncIndex >= 0) {
        newCart.splice(quantityIncIndex, 1, {
          ...state.cart[quantityIncIndex],
          quantity: state.cart[quantityIncIndex].quantity + 1,
        });
      }
      return { ...state, cart: newCart };
    //Decrease the quantity from checkout page or delete if the previous quantity was 1.
    case "DECREASE_QUANTITY":
      const quantityDecIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      if (quantityDecIndex >= 0) {
        newCart.splice(quantityDecIndex, 1, {
          ...state.cart[quantityDecIndex],
          quantity: state.cart[quantityDecIndex].quantity - 1,
        });
      }
      return { ...state, cart: newCart };
    //Set User after Authentication
    case "SET_USER":
      return { ...state, user: action.user };
    //Set Username after Authentication
    case "SET_USERNAME":
      return { ...state, username: action.username };
    //Empty Cart
    case "EMPTY_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default reducer;
