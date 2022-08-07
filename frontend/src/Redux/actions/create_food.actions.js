export const MODIFY_SERVING_CREATE_FOOD = 'MODIFY_SERVING_CREATE_FOOD'
export const modify_serving_create_food = (payload) => ({
    type: MODIFY_SERVING_CREATE_FOOD,
    payload: payload
})

export const MODIFY_NUTRITION_CREATE_FOOD = 'MODIFY_NUTRITION_CREATE_FOOD'
export const modify_nutrition_create_food = (payload) => ({
    type: MODIFY_NUTRITION_CREATE_FOOD,
    payload: payload
})

export const MODIFY_DATA_CREATE_FOOD = 'MODIFY_DATA_CREATE_FOOD'
export const modify_data_create_food = (payload) => ({
    type: MODIFY_DATA_CREATE_FOOD,
    payload: payload
})

export const FOOD_CREATED_SUCCESSFULLY = 'FOOD_CREATED_SUCCESSFULLY'
export const food_created_successfully = () => ({
    type: FOOD_CREATED_SUCCESSFULLY
})

export const CREATING_FOOD = 'CREATING_FOOD'
export const creating_food = () => ({
    type: CREATING_FOOD,
    payload: true
})

export const CREATING_FOOD_FAILED = 'CREATING_FOOD_FAILED'
export const creating_food_failed = () => ({
    type: CREATING_FOOD_FAILED,
    payload: false
})