import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-content";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const [CartContextState, CartContextStateChange] = useState(false);
  const items = ctx.item;
  useEffect(() => {
    if (ctx.item.length === 0) {
      return;
    }
    CartContextStateChange(true);
    const timer = setTimeout(() => {
      CartContextStateChange(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const noOfCartItems = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);
  const btnClasses = `${styles.button} ${CartContextState ? styles.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.showCart}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{noOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
