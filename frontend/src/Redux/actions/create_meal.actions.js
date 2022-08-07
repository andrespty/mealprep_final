export const MODIFY_DATA_CREATE_MEAL = 'MODIFY_DATA_CREATE_MEAL'
export const modify_data_create_meal = (payload) => ({
    type: MODIFY_DATA_CREATE_MEAL,
    payload: payload
})

export const SELECT_FOODS_CREATE_MEAL = 'SELECT_FOODS_CREATE_MEAL'
export const select_foods_create_meal = (payload) => ({
    type: SELECT_FOODS_CREATE_MEAL,
    payload: payload // list
})

export const CALCULATE_CALORIES_CREATE_MEAL = 'CALCULATE_CALORIES_CREATE_MEAL'
export const calculate_calories_in_create_meal = (payload) => ({
    type: CALCULATE_CALORIES_CREATE_MEAL,
    payload: payload
})

export const CREATING_MEAL = 'CREATING_MEAL'
export const creating_meal = () => ({
    type: CREATING_MEAL,
    payload: true
})

export const CREATING_MEAL_FAILED = 'CREATING_MEAL_FAILED'
export const creating_meal_failed = () => ({
    type: CREATING_MEAL_FAILED,
    payload: false
})

export const MEAL_CREATED_SUCCESSFULLY = 'MEAL_CREATED_SUCCESSFULLY'
export const meal_created_successfully = () => ({
    type: MEAL_CREATED_SUCCESSFULLY
})