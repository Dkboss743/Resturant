import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [showForm, setShowForm] = useState(false);
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
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
            onAdd={cartItemAddHandler.bind(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );
  const buttonClickHandler = () => {
    setShowForm(true);
  };

  return (
    <Modal onClose={props.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && <Checkout onCancel={props.hideCart}></Checkout>}
      <div className={classes.actions}>
        {!showForm && (
          <button className={classes["button--alt"]} onClick={props.hideCart}>
            Close
          </button>
        )}
        {hasItems && !showForm && (
          <button onClick={buttonClickHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
