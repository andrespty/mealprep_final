
export const SET_MEAL_DETAILS = 'SET_MEAL_DETAILS'
export const set_meal_details = (meal) => ({
    type:SET_MEAL_DETAILS,
    payload: {...meal}
})

export const SAVE_RECIPE_EDIT = 'SAVE_RECIPE_EDIT'
export const save_recipe_edit = (payload) => ({
    type: SAVE_RECIPE_EDIT,
    payload: {...payload}
})

export const CLEAR_MEAL_DETAILS = 'CLEAR_MEAL_DETAILS'
export const clear_meal_details = () => ({
    type: CLEAR_MEAL_DETAILS
})

export const UPDATING_MEAL_DETAILS_REQUEST = 'UPDATING_MEAL_DETAILS_REQUEST'
export const updating_meal_details_request = () => ({
    type: UPDATING_MEAL_DETAILS_REQUEST,
    payload: {isLoading: true}
})
export const updating_meal_details_request_failed = () => ({
    type: UPDATING_MEAL_DETAILS_REQUEST,
    payload: {isLoading: false}
})
export const updating_meal_details_status = (payload) => ({
    type: UPDATING_MEAL_DETAILS_REQUEST,
    payload: {...payload}
})

export const REMOVE_ITEM_MEAL_DETAILS = 'REMOVE_ITEM_MEAL_DETAILS'
export const remove_item_meal_details = (list) => ({
    type: REMOVE_ITEM_MEAL_DETAILS,
    payload: list
})

export const SELECT_FOODS_MEAL_DETAILS = 'SELECT_FOODS_MEAL_DETAILS'
export const select_foods_meal_details = (recipe) => ({
    type: SELECT_FOODS_MEAL_DETAILS,
    payload: recipe
})