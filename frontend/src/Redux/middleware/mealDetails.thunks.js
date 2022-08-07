import { 
    save_recipe_edit, 
    updating_meal_details_request, 
    updating_meal_details_request_failed,
    remove_item_meal_details
} from "../actions/mealDetails.actions"
import { getMealDetails, getMealDetailsStatus } from "../selectors/mealDetails.selectors"
import axios from "axios"
import { fetch_url } from "../../App"
import { update_list_meals } from "../actions/lists.actions"
import { getMyFoodsList, getMyMealsList } from "../selectors/lists.selector"
import { select_foods_meal_details } from "../actions/mealDetails.actions"
import { getDailyMealsData } from "../selectors/dailyMeals.selectors"
import { add_meal_to_schedule } from "../actions/dailyMeals.actions"

export const execute_recipe_edit = (foodID, edit) => (dispatch, getState) => {

    let state = getState()
    let meal = {...getMealDetails(state)}
    let recipe = [...meal.recipe]
    let foodIndex = recipe.findIndex(food => food.food._id === foodID)
    let food = {
        ...meal.recipe[foodIndex],
        current_serving: {...edit}
    }
    recipe[foodIndex] = food
    meal = {
        ...meal,
        recipe: recipe
    }
    dispatch(save_recipe_edit(meal))
}

export const save_edit_mealDetails = (save_action) => async (dispatch, getState) => {

    let state = getState()
    let meal = {...getMealDetails(state)}
    let myMeals = [...getMyMealsList(state)]

    dispatch(updating_meal_details_request())
    
    try {
        axios.put(`${fetch_url}/meals/${meal._id}/`, {recipe:meal.recipe})
        .then(res => res.data)
        .then(json => {
            if (json.success){
                let index = myMeals.findIndex(m => m._id === json.data._id)
                myMeals.splice(index, 1, json.data)

                console.log(myMeals)

                dispatch(update_list_meals(myMeals))
                save_action()
            }
            else{
                dispatch(updating_meal_details_request_failed())
            }
        })
    } catch (error) {
        dispatch(updating_meal_details_request_failed())
    }
}

export const delete_meal_in_database = (save_action) => async (dispatch, getState) => {
    let state = getState()
    let meal = {...getMealDetails(state)}
    let myMeals = [...getMyMealsList(state)]

    try {
        axios.delete(`${fetch_url}/meals/${meal._id}`)
        .then(res => res.data)
        .then(json => {
            if (json.success){
                let index = myMeals.findIndex(m => m._id === meal._id)
                myMeals.splice(index, 1)

                dispatch(update_list_meals(myMeals))
                save_action()
            }
        })
    }
    catch (error) {
        
    }
}

export const remove_items_from_recipe = () => (dispatch, getState) => {
    let state = getState()
    let meal = {...getMealDetails(state)}
    let status = {...getMealDetailsStatus(state)}
    console.log(meal)
    console.log(status)
    let new_recipe = meal.recipe.filter(food => !status.removeList.includes(food._id))

    dispatch(remove_item_meal_details(new_recipe))
}

export const handle_food_addition = (payload) => (dispatch, getState) => {
    let state = getState()
    let myFoods = getMyFoodsList(state)
    let meal = {...getMealDetails(state)}

    let recipe = [...meal.recipe]
    let selected_foods = recipe.map(food => food.food._id)
    let bar;
    let newFood;

    if (payload.length > selected_foods.length){
        console.log('Food Added')
        bar = payload[payload.length-1]
        newFood = myFoods.find(food => food._id === bar)

        recipe.push({
            food: {...newFood},
            current_serving:{
                ...newFood.serving_size
            }
        })
    }
    else{
        // Item has been removed
        for (let i = 0; i < selected_foods.length; i++){
            if (selected_foods[i] !== payload[i]){
                newFood = recipe.findIndex(food => food.food._id === selected_foods[i])
                recipe.splice(newFood, 1)
                break;
            }
        }
    }
    console.log(recipe)
    dispatch(select_foods_meal_details(recipe))
}