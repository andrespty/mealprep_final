export const getDailyMealsStatus = (state) => {
    return state.dailyMeals.status
}

export const getDailyMealsData = (state) => {
    return state.dailyMeals.data
}

export const getDailyMealsTotalCalories = (state) => {
    const dailyMeals = getDailyMealsData(state)
    let calories = 0
    let keys = Object.keys(dailyMeals)

    keys.forEach(key => {
        calories += dailyMeals[key].calories
    })
    

    return calories
}