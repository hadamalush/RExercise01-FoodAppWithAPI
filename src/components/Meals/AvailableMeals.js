import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const { isLoading, error, sendRequest: getMealsRequest } = useHttp();
	const [dummyMeals, setDummyMeals] = useState([]);

	const initMeals = () => {
		const generateMeals = dataMeals => {
			const loadedMeals = [];
			for (const meal in dataMeals) {
				loadedMeals.push({
					id: meal,
					name: dataMeals[meal].name,
					description: dataMeals[meal].description,
					price: dataMeals[meal].price,
				});
			}
			setDummyMeals(loadedMeals);
		};

		getMealsRequest(
			{
				url: "https://react-food-app-cffd3-default-rtdb.firebaseio.com/meals.json",
			},
			generateMeals
		);
	};

	useEffect(() => {
		initMeals();
	}, []);

	const mealsList = dummyMeals.map(meal => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
