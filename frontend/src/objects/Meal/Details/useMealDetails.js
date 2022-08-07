import { getMealName, getMealMacros, getMealDescription, getMealCalories } from "../MealSelector";
import { useDispatch, useSelector } from "react-redux";
import { remove_items_from_recipe, delete_meal_in_database } from "../../../Redux/middleware/mealDetails.thunks";
import { getMealDetailsStatus } from "../../../Redux/selectors/mealDetails.selectors";
import { updating_meal_details_status } from "../../../Redux/actions/mealDetails.actions";
import { handle_food_addition } from "../../../Redux/middleware/mealDetails.thunks";

export const useMealDetails = (meal, onClose) => {

    const dispatch = useDispatch()

    const info = {
        _id: meal._id,
        creator: meal.creator,
        macros: getMealMacros(meal),
        name: getMealName(meal),
        description: getMealDescription(meal),
        calories: getMealCalories(meal),
        recipe: meal.recipe,
        status: useSelector(getMealDetailsStatus),
        selectedFoods: meal.recipe.map(food => food.food._id)
    }

    const edit = () => {
        if (!info.status.isEditting){
            dispatch(updating_meal_details_status({isEditting: !info.status.isEditting, removeList: []}))
        }
        else{
            dispatch(updating_meal_details_status({isEditting: !info.status.isEditting}))
        }
    }

    const addEdit = (list) => {
        dispatch(updating_meal_details_status({removeList: list}))
    }

    const remove = () => {
        dispatch(remove_items_from_recipe())
    }
    
    const setSelectedFoods = (payload) => {
        dispatch(handle_food_addition(payload))
    }

    const delete_meal = () => {
        dispatch(delete_meal_in_database(onClose))
    }

    return { info, edit, addEdit, remove, setSelectedFoods, delete_meal }
}