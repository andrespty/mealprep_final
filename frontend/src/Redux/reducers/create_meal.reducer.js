import { 
    MODIFY_DATA_CREATE_MEAL, 
    SELECT_FOODS_CREATE_MEAL, 
    CALCULATE_CALORIES_CREATE_MEAL,
    CREATING_MEAL,
    CREATING_MEAL_FAILED,
    MEAL_CREATED_SUCCESSFULLY
} from "../actions/create_meal.actions"

const initial_state = {
    data:{
        name:'',
        description: '',
        recipe: [],
        selected_foods:[], //ids
        creator: '',
        calories: 0,
        macros:{
            fat:0,
            protein: 0,
            carbs:0
        },
        isMeal: true
    },
    status: {
        isLoading: false
    }
}

export const create_meal = (state=initial_state, action) => {

    const { type, payload } = action

    switch (type) {

        case CREATING_MEAL:
        case CREATING_MEAL_FAILED:
            return {...state, status: {...state.status, isLoading: payload}}

        case MEAL_CREATED_SUCCESSFULLY:
            return initial_state

        case CALCULATE_CALORIES_CREATE_MEAL:
            return {
                ...state,
                data:{
                    ...state.data,
                    ...payload
                }
            }

        case SELECT_FOODS_CREATE_MEAL:
            return {
                ...state,
                data: {
                    ...state.data,
                    selected_foods: payload.selected,
                    recipe: payload.recipe
                }
            }

        case MODIFY_DATA_CREATE_MEAL: 
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload
                }
            }

        

        default:
            return state
    }

}