import { getConversion } from "../../utils/conversions"
import { prepare_conversion } from "../../utils/conversions"

export const getMealName = (meal) => {
    return meal.name
}

export const getMealIngredients = (meal) => {
    return meal.recipe.length
}

export const getMealMacros = (meal) => {
    let macros = {
        protein: 0,
        fat: 0,
        carbs: 0
    }
    meal.recipe.forEach(food => {
        macros.protein += getConversion(prepare_conversion('protein', food))
        macros.fat += getConversion(prepare_conversion('total_fat', food))
        macros.carbs += getConversion(prepare_conversion('total_carbohydrates', food))
    })
    return {...macros}
}

export const getMealCalories = (meal) => {
    let calories = 0;

    meal.recipe.forEach((food) => {
        calories += getConversion(prepare_conversion('calories', food))
    })
    return calories
}

export const getMealDescription = (meal) => {
    return meal.description
}

export const getMealRecipeNames = (meal) => {
    let recipe_names = []
    meal.recipe.forEach(food => recipe_names.push(food.food.name))
    return recipe_names
}
