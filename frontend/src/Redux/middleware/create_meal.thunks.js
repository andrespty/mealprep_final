import { getMyFoodsList } from "../selectors/lists.selector";
import { 
    select_foods_create_meal, 
    calculate_calories_in_create_meal,
    creating_meal,
    creating_meal_failed,
    meal_created_successfully
} from "../actions/create_meal.actions";
import { getCreateMealInfo } from "../selectors/create_meal.selector";
import { getConversion, prepare_conversion } from "../../utils/conversions";
import { modify_data_create_meal } from "../actions/create_meal.actions";
import { getUserData } from "../selectors/user.selectors";
import axios from "axios";
import { fetch_url } from "../../App";
import { addToMyMealsList } from "../actions/lists.actions";

export const handle_food_selection = (payload) => (dispatch, getState) => {

    const state = getState()
    const myFoods = getMyFoodsList(state)
    const info = getCreateMealInfo(state)

    let bar;
    let recipe = [...info.recipe];
    let selected_foods = [...info.selected_foods];
    let newFood;

    if (payload.length > selected_foods.length){
        // Item has been added
        console.log('FOOD ADDED')
        bar = payload[payload.length - 1]
        newFood = myFoods.find(food => food._id === bar)

        recipe.push({
            food: {...newFood},
            current_serving: {
                ...newFood.serving_size
            }
        })
    }
    else {
        // Item has been removed
        for (let i = 0; i < selected_foods.length; i++){
            if (selected_foods[i] !== payload[i]){
                newFood = recipe.findIndex(food => food.food._id === selected_foods[i])
                recipe.splice(newFood, 1)
                break;
            }
        }
    }
    dispatch(calculate_calories_create_meal(recipe))
    dispatch(select_foods_create_meal({selected:payload, recipe: recipe}))
}

export const calculate_calories_create_meal = (list) => (dispatch, getState) => {
    
    let calories = 0;
    let macros = {
        protein: 0,
        fat: 0,
        carbs: 0
    }
    list.forEach(food => {
        calories += getConversion(prepare_conversion('calories', food))
        macros.protein += getConversion(prepare_conversion('protein', food))
        macros.fat += getConversion(prepare_conversion('total_fat', food))
        macros.carbs += getConversion(prepare_conversion('total_carbohydrates', food))
    })

    dispatch(calculate_calories_in_create_meal({calories, macros}))
}

export const save_food_edited = (id, changes) => (dispatch, getState) => {
    const state = getState()
    const info = getCreateMealInfo(state)
    let recipe = [...info.recipe];
    let foodIndex = recipe.findIndex(food => food.food._id === id)
    recipe[foodIndex] = {
        ...recipe[foodIndex],
        current_serving: {...changes}
    }

    dispatch(calculate_calories_create_meal(recipe))
    dispatch(modify_data_create_meal({recipe: recipe}))
}

export const create_meal = () => async (dispatch, getState) => {
    try {
        let state = getState()
        let user = getUserData(state)
        let meal = {...getCreateMealInfo(state)}
        let body = {
            name: meal.name,
            description: meal.description,
            isMeal: true,
            recipe: meal.recipe.map(food => ({...food, food: food.food._id})),
            creator: user._id
        }
        
        dispatch(creating_meal())
        console.log('creating')
        const response = await axios.post(`${fetch_url}/meals/`, body, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer ' + localStorage.getItem('token')
            }
        })
        const json = await response.data
        console.log(json)
        if (json.success){
            console.log(json)
            dispatch(addToMyMealsList(json.data))
            dispatch(meal_created_successfully())
        }
        else {
            dispatch(creating_meal_failed())
        }


    } catch (error) {
        dispatch(creating_meal_failed())
    }
} 