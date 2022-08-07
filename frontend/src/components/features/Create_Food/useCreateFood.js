import { useDispatch, useSelector } from "react-redux";
import { create_food } from "../../../Redux/middleware/create_food.thunks";
import { getCreateFoodFields } from "../../../Redux/selectors/create_food.selector";
import { 
    modify_data_create_food, 
    modify_nutrition_create_food, 
    modify_serving_create_food 
} from "../../../Redux/actions/create_food.actions";

export const useCreateFood = () => {

    const dispatch = useDispatch()
    const info = useSelector(getCreateFoodFields)    

    const modify = (new_data) => dispatch(modify_data_create_food(new_data))
    const modify_serving = (new_data) => dispatch(modify_serving_create_food(new_data))
    const modify_nutrition = (new_data) => dispatch(modify_nutrition_create_food(new_data))

    const submit = (e) => {
        e.preventDefault()
        dispatch(create_food())
    }

    return { info, modify, modify_nutrition, modify_serving, submit }
}
