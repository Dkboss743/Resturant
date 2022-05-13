import CartContext from "./cart-content";
import { useReducer } from "react";
const defalutCartState = {
  item: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.item.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defalutCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defalutCartState
  );
  const addItemToCartHandler = (items) => {
    dispatchCartAction({
      type: "ADD",
      item: items,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "ADD",
      id: id,
    });
  };
  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
