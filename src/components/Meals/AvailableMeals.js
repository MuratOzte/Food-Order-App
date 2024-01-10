import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

import meals from '../../assets/react-httpreq-d7796-default-rtdb-export.json';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                'https://react-httpreq-d7796-default-rtdb.europe-west1.firebasedatabase.app/Meals.json'
            )
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch((err) => {
            setIsLoading(false);
            setHttpError(err.message);
        });
    }, []);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    if (isLoading) {
        return (
            <section className={classes.mealsIsLoading}>
                <p>Loading...</p>
            </section>
        );
    }
    if (httpError) {
        return (
            <section className={classes.mealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
