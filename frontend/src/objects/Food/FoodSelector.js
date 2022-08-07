
export const getFoodName = (food) => {
    return food.name
}
export const getFoodDescription = (food) => {
    return food.description
}
export const getFoodCalories = (food) => {
    return food.nutritional_facts.calories
}
export const getFoodServing = (food) => {
    return food.serving_size.serving
}
export const getFoodServingUnit = (food) => {
    return food.serving_size.serving_unit
}
export const getNServings = (food) => {
    return food.serving_size.number_of_servings
}