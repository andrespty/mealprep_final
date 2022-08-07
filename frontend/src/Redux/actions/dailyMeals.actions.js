export const MEALTIME_UPDATE_MEAL_SCHEDULE = 'MEALTIME_UPDATE_MEAL_SCHEDULE'
export const add_meal_to_schedule = (mealTime, update) => ({
    type: MEALTIME_UPDATE_MEAL_SCHEDULE,
    payload: { mealTime, update }
})

export const CLEAR_MEAL_SCHEDULE = 'CLEAR_MEAL_SCHEDULE'
export const clear_meal_schedule = () => ({
    type: CLEAR_MEAL_SCHEDULE
})

export const EDIT_MEAL_SCHEDULE_STATUS = 'EDIT_MEAL_SCHEDULE_STATUS'
export const edit_meal_schedule_status = (payload) => ({
    type: EDIT_MEAL_SCHEDULE_STATUS,
    payload: {...payload}
})