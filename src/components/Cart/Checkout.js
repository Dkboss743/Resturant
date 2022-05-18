import classes from "./Checkout.module.css";
import { useContext } from "react";
import { useRef, useState } from "react";
import CartContext from "../../store/cart-content";
const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 6;
const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const sendData = async (userData) => {
    const sendingData = await fetch(
      "https://logical-honor-328116-default-rtdb.firebaseio.com/Meals/Order.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.item,
        }),
      }
    );
  };
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      return;
    }
    if (formIsValid) {
      const userData = {
        name: enteredName,
        city: enteredCity,
        Street: enteredStreet,
        postalCode: enteredPostalCode,
      };
      sendData(userData);
    }
  };
  const style = (property) => {
    const classN = property
      ? classes.control
      : classes.control + " " + classes.invalid;
    return classN;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={style(formInputValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={style(formInputValidity.street)}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={style(formInputValidity.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div className={style(formInputValidity.city)}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
