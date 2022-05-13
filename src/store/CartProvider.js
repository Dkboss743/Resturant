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
  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );

    if (exisitingCartItemIndex !== -1) {
      const existingItem = state.item[exisitingCartItemIndex];

      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.item.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.item];
        updatedItems[exisitingCartItemIndex] = updatedItem;
      }
      return {
        item: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
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
    console.log("remove");

    dispatchCartAction({
      type: "REMOVE",
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
