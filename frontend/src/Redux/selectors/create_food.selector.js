export const getCreateFoodFields = (state) => ({
    name: state.create_food.data.name,
    description: state.create_food.data.description,
    serving: state.create_food.data.serving_size.serving,
    serving_unit: state.create_food.data.serving_size.serving_unit,
    calories: state.create_food.data.nutritional_facts.calories,
    protein: state.create_food.data.nutritional_facts.protein,
    total_carbohydrates: state.create_food.data.nutritional_facts.total_carbohydrates,
    total_fat: state.create_food.data.nutritional_facts.total_fat,
    isSuccess: state.create_food.status.isSuccess,
    alert: state.create_food.status.alert,
    status: state.create_food.status.status,
    isLoading: state.create_food.status.isLoading
})

export const getCreateFoodInfo = (state) => {
    return state.create_food.data
}