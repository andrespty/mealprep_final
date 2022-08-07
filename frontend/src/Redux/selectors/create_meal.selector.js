export const getCreateMealInfo = (state) => {
    return state.create_meal.data
}

export const getSelectedFoods = (state) => {
    return state.create_meal.data.selected_foods
}