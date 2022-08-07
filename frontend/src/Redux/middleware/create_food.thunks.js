import axios from "axios";
import { fetch_url } from "../../App";
import { addToMyFoodsList } from "../actions/lists.actions";
import { getCreateFoodInfo } from "../selectors/create_food.selector";
import { food_created_successfully, creating_food, creating_food_failed } from "../actions/create_food.actions";
import { getUserData } from "../selectors/user.selectors";

export const create_food = () => async (dispatch, getState) => {

    try {

        dispatch(creating_food())
        let state = getState()
        let user = getUserData(state)
        let body = {...getCreateFoodInfo(getState())}

        body.creator = user._id        

        const response = await axios.post(`${fetch_url}/foods/`, body)
        const json = await response.data

        console.log(json)
        if (json.success){
            console.log(json.data)
            dispatch(addToMyFoodsList(json.data))
            dispatch(food_created_successfully())
        }
        else {
            dispatch(creating_food_failed())
        }

    }
    catch (e) {
        dispatch(creating_food_failed())
    }
}