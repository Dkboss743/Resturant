import React, { useContext } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-content";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const noOfCartItems = ctx.item.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);
  return (
    <button onClick={props.showCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{noOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
