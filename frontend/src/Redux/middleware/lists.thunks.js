import axios from "axios";
import { fetch_url } from "../../App";
import { loadingLists, loadingListsSuccess, loadingListsFail } from "../actions/lists.actions";
import { getUserData } from "../selectors/user.selectors";
import { getMyFoodsList } from "../selectors/lists.selector";
import { update_list_foods } from "../actions/lists.actions";

export const load_lists = () => async (dispatch, getState) => {

    try{
        dispatch(loadingLists())
        
        const { _id } = getUserData(getState())

        const response = await axios.get(`${fetch_url}/misc/${_id}`)
        const json = await response.data

        console.log(json.data)

        if (json.success){
            dispatch(loadingListsSuccess(json.data))
        }
        else{
            dispatch(loadingListsFail())
        }

    }
    catch (e){
        dispatch(loadingListsFail())
    }
}

export const edit_food_details = (foodID, modification, onClose) => async (dispatch, getState) => {
    
    let state = getState()
    let foods = [...getMyFoodsList(state)]
    try {
        const response = await axios.put(`${fetch_url}/foods/${foodID}`,{...modification})
        const json = await response.data

        if (json.success){
            let index = foods.findIndex(f => f._id === json.data._id)
            foods.splice(index, 1, json.data)
            dispatch(update_list_foods(foods))
            onClose()
        }
        else{
            dispatch()
        }
    } catch (error) {
        dispatch()
    }
}

export const delete_food_in_database = (foodID, onClose) => async (dispatch, getState) => {
    let state = getState()
    let foods = [...getMyFoodsList(state)]

    try{
        axios.delete(`${fetch_url}/foods/${foodID}`)
        .then(res => res.data)
        .then(json => {
            if (json.success){
                let index = foods.findIndex(f => f._id === foodID)
                foods.splice(index, 1)
                dispatch(update_list_foods(foods))
                onClose()
            }
        })
    }
    catch (error) {

    }
}