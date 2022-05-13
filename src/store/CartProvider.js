import CartContext from "./cart-content";
import { useReducer } from "react";
const defalutCartState = {
  item: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItems;
    if (existingCartItemIndex !== -1) {
      const existingCartItem = state.item[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }
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
