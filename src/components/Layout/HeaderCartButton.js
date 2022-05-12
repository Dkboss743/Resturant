import React from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
const HeaderCartButton = (props) => {
  return (
    <button onClick={props.showCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};
export default HeaderCartButton;
