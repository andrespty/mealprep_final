import { 
    MODIFY_SERVING_CREATE_FOOD,
    MODIFY_DATA_CREATE_FOOD,
    MODIFY_NUTRITION_CREATE_FOOD,
    FOOD_CREATED_SUCCESSFULLY,
    CREATING_FOOD, 
    CREATING_FOOD_FAILED
} from "../actions/create_food.actions"


const initial_state = {
    data: {
        name: '',
        description: '',
        serving_size: {
            serving: 1,
            serving_unit: '',
            number_of_servings: 1
        },
        nutritional_facts: {
            calories: 0,
            total_fat: 0,
            total_carbohydrates: 0,
            protein: 0
        },
        isMeal: false,
    },
    status:{
        isSuccess: false,
        alert: false,
        status: '',
        isLoading: false
    }
}

export const create_food = (state= initial_state, action) => {
    
    const { type, payload } = action

    switch (type) {

        case CREATING_FOOD_FAILED:
        case CREATING_FOOD: 
            return {...state, status: {...state.status, isLoading: payload}}

        case MODIFY_DATA_CREATE_FOOD:
            return {...state, data:{...state.data, ...payload}}
        case MODIFY_NUTRITION_CREATE_FOOD:
            return {
                ...state, 
                data:{
                    ...state.data, 
                    nutritional_facts:{
                        ...state.data.nutritional_facts,
                        ...payload
                    } 
                }
            }
        case MODIFY_SERVING_CREATE_FOOD:
            return {
                ...state, 
                data:{
                    ...state.data, 
                    serving_size:{
                        ...state.data.serving_size,
                        ...payload
                    } 
                }
            }
        case FOOD_CREATED_SUCCESSFULLY: 
            console.log('FOOD CREATED SUCCESSFULLY')
            return initial_state
            
        default:
            return state
    }
}