import { 
    LOADING_LISTS, 
    LOADING_LISTS_SUCCESS, 
    LOADING_LISTS_FAIL, 
    ADD_TO_LIST,
    UPDATE_LIST
} from '../actions/lists.actions'


const initialState = () => {
    return {
        status: {
            isLoading: false
        },
        data: {
            myFoods: [],
            myMeals: [],
            meals: [],
            foods:[]
        }
    }
}

export const lists = (state=initialState(), action) => {
    
    const { type, payload } = action

    switch(type){

        case UPDATE_LIST:{
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.list]: payload.data
                }
            }
        }

        case LOADING_LISTS:{
            return {...state, status: {...state.status, isLoading:true}}
        }

        case LOADING_LISTS_SUCCESS: {
            return {
                ...state,
                data: {...payload}
            }
        }

        case LOADING_LISTS_FAIL: {
            return initialState()
        }

        case ADD_TO_LIST:{
            let newList = [...state.data[payload.list]]
            newList.unshift(payload.data)
            return {
                ...state,
                data:{
                    ...state.data,
                    [payload.list]: newList
                }
            }
        }

        default:
            return state
    }

}