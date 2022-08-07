import React from 'react'
import MealDisplay from './MealDisplay'
import { getMealName, getMealIngredients, getMealRecipeNames, getMealCalories } from './MealSelector'

function MealDataHandler({ meal }) {
    // name, calories, protein, fat, carbs, ingredients
    const data = {
        name: getMealName(meal),
        ingredients: getMealIngredients(meal),
        calories: getMealCalories(meal),
        recipe: getMealRecipeNames(meal)
    }

    return (<MealDisplay meal={data}/>)
}

export default MealDataHandler