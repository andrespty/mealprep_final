import { getDailyMealsData } from "../selectors/dailyMeals.selectors"
import { add_meal_to_schedule } from "../actions/dailyMeals.actions"
import { getConversion, prepare_conversion } from "../../utils/conversions"
import { getMealDetails } from "../selectors/mealDetails.selectors"

export const add_meal_to_schedule_calculation = (mealTime, meal) => (dispatch, getState) => {
    let state = getState()
    let dailyMeals = {...getDailyMealsData(state)}
    let list = [...dailyMeals[mealTime].list, meal]
    let calories = 0

    list.forEach(meal => {
        meal.recipe.forEach(food => {
            calories += getConversion(prepare_conversion('calories', food))
        })
    })
    let update = {
        calories: calories,
        list:list
    }
    dispatch(add_meal_to_schedule(mealTime, update))
}

export const remove_meal_from_schedule_calculation = (mealTime, meal) => (dispatch, getState) => {
    let state = getState()
    let dailyMeals = {...getDailyMealsData(state)}
    let list = [...dailyMeals[mealTime].list].filter(m => m._id !== meal._id)
    let calories = 0

    list.forEach(meal => {
        meal.recipe.forEach(food => {
            calories += getConversion(prepare_conversion('calories', food))
        })
    })
    console.log(calories)
    let update = {
        calories: calories,
        list:list
    }
    dispatch(add_meal_to_schedule(mealTime, update))
}

export const save_edit_mealDetails_in_schedule = (mealTime, save_action) => (dispatch, getState) => {
    let state = getState()
    let meal = {...getMealDetails(state)}
    let list = [...{...getDailyMealsData(state)}[mealTime].list]
    let index = list.findIndex(m => m._i1d === meal._id)
    let calories = 0
    list.splice(index, 1, meal)

    list.forEach(meal => {
        meal.recipe.forEach(food => {
            calories += getConversion(prepare_conversion('calories', food))
        })
    })
    let update = {
        list: list,
        calories: calories
    }

    dispatch(add_meal_to_schedule(mealTime, update))
    save_action()
}
