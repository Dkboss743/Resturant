import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  async function getMealsList() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://logical-honor-328116-default-rtdb.firebaseio.com/Meals.json"
      );
      const tempdata = await response.json();
      let DUMMY_MEALS = [];
      for (const key in tempdata) {
        DUMMY_MEALS.push({
          id: `${key}`,
          name: tempdata[key].name,
          description: tempdata[key].description,
          price: +tempdata[key].price,
        });
      }
      setDUMMY_MEALS(DUMMY_MEALS);
      setIsLoading(false);
    } catch (err) {
      setHasError(true);
    }
  }
  useEffect(() => {
    getMealsList();
  }, []);

  const mealsList =
    !hasError &&
    DUMMY_MEALS.map((meal) => (
      <MealItem
        key={meal.id}
        name={meal.name}
        id={meal.id}
        description={meal.description}
        price={meal.price}
      >
        {meal.name}
      </MealItem>
    ));
  const showMeals =
    !isLoading && !hasError ? (
      <ul>{mealsList}</ul>
    ) : isLoading && !hasError ? (
      <p>Loading Meals...</p>
    ) : (
      <p>Error Fetching Meals</p>
    );
  return (
    <section className={styles.meals}>
      <Card>{showMeals}</Card>
    </section>
  );
};
export default AvailableMeals;
