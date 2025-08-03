import React, { useState, useEffect } from 'react';
import MealCard from '../../components/MealCard';

function BestSellerMeals() {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/all-meals')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch meals');
                }
                return res.json();
            })
            .then(data => setMeals(data.slice(0, 8)))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <MealCard meals={meals} heading="Best Seller Meals" />
        </div>
    );
}

export default BestSellerMeals;
