import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemAddHandler = (item) => {};
  const cartItemRemoveHandler = (id) => {};
  const hasItems = cartCtx.item.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
