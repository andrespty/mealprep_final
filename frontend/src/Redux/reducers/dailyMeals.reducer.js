import { 
    MEALTIME_UPDATE_MEAL_SCHEDULE,
    CLEAR_MEAL_SCHEDULE,
    EDIT_MEAL_SCHEDULE_STATUS
} from "../actions/dailyMeals.actions"

const initialState = () => {
    
    if (localStorage.getItem('dailyMeals')){
        return JSON.parse(localStorage.getItem('dailyMeals'))
    }
    else{
        return baseStructure
    }
}

export const dailyMeals = (state = initialState(), action) => {
    const { type, payload } = action

    switch (type) {

        case EDIT_MEAL_SCHEDULE_STATUS:
            return {
                ...state,
                status:{
                    ...state.status,
                    ...payload
                }
            }

        case MEALTIME_UPDATE_MEAL_SCHEDULE: 
            let { mealTime, update } = payload
            let data = {
                ...state,
                data: {
                    ...state.data,
                    [mealTime]: {
                        ...state.data[mealTime],
                        ...update
                    }
                }
            }
            localStorage.setItem('dailyMeals', JSON.stringify(data))
            return data
        
        case CLEAR_MEAL_SCHEDULE:
            localStorage.setItem('dailyMeals', JSON.stringify(baseStructure))
            return initialState()

        default:
            return state
    }
}

const baseStructure = {
    status: {
        isLoading: false,
        isEditing: false
    },  
    data: {
        Breakfast:{
            list:[],
            calories: 0
        },
        Lunch: {
            list:[],
            calories: 0
        },
        Dinner: {
            list:[],
            calories: 0
        },
        Snacks: {
            list:[],
            calories: 0
        }
    }
}