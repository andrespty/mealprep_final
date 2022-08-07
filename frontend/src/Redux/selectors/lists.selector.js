export const getMyFoodsList = (state) => {
    return state.lists.data.myFoods
}

export const getMyMealsList = (state) => {
    return state.lists.data.myMeals
}

export const getListsStatus = (state) => {
    return state.lists.status
}

export const getOtherMealsList = (state) => {
    return state.lists.data.meals
}

export const getFoodsList = (state) => {
    return state.lists.data.foods
}