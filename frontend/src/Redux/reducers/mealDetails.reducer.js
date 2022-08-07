import { 
    SET_MEAL_DETAILS,
    SAVE_RECIPE_EDIT,
    CLEAR_MEAL_DETAILS,
    UPDATING_MEAL_DETAILS_REQUEST,
    REMOVE_ITEM_MEAL_DETAILS,
    SELECT_FOODS_MEAL_DETAILS
} from "../actions/mealDetails.actions"

const initialState = {
    status:{
        isLoading: false,
        isEditting: false,
        removeList: []
    },
    data:{}
}

export const mealDetails = (state = initialState, action) => {

    const { type, payload } = action

    switch(type){
        case SELECT_FOODS_MEAL_DETAILS:
            return {
                ...state,
                data:{
                    ...state.data,
                    recipe: payload
                }
            }
        case REMOVE_ITEM_MEAL_DETAILS:
            return {
                ...state,
                data:{
                    ...state.data,
                    recipe: [...payload]
                },
                status: {...state.status, isEditting:false, removeList:[]}
            }

        case UPDATING_MEAL_DETAILS_REQUEST:
            return {
                ...state,
                status: {...state.status, ...payload}
            }
        case SET_MEAL_DETAILS:
            return {
                ...state,
                data:{...payload}
            }

        case SAVE_RECIPE_EDIT:
            return {
                ...state,
                data:{...payload}
            }



        case CLEAR_MEAL_DETAILS:
            return initialState

        default:
            return state

    }

}