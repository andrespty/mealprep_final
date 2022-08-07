import React from 'react'
import FoodDisplay from './FoodDisplay'
import { getFoodName, getFoodDescription, getFoodCalories, getFoodServing, getFoodServingUnit, getNServings } from './FoodSelector'

function FoodDataHandler({ food }) {

  const data = {
    name: getFoodName(food),
    description: getFoodDescription(food),
    calories: getFoodCalories(food),
    serving: getFoodServing(food),
    serving_unit: getFoodServingUnit(food),
    number_of_servings: getNServings(food)
  }

  return (<FoodDisplay food={data} />)
}

export default FoodDataHandler