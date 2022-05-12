import React from "react";
import image from "../../Assests/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCart={props.showCart}></HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="food" />
      </div>
      {props.children}
    </React.Fragment>
  );
};
export default Header;
