import { useDispatch, useSelector } from "react-redux"
import { getCreateMealInfo, getSelectedFoods } from "../../../Redux/selectors/create_meal.selector"
import { modify_data_create_meal } from "../../../Redux/actions/create_meal.actions"
import { handle_food_selection } from "../../../Redux/middleware/create_meal.thunks"
import { create_meal } from "../../../Redux/middleware/create_meal.thunks"

export const useCreateMeal = () => {

    const info = useSelector(getCreateMealInfo)
    const selected_foods = useSelector(getSelectedFoods)
    const dispatch = useDispatch()

    const modify = (payload) => dispatch(modify_data_create_meal(payload))
    const setSelectedFoods = (payload) => dispatch(handle_food_selection(payload))

    const submit = () => dispatch(create_meal())

    return { info, selected_foods, modify, setSelectedFoods, submit }
}