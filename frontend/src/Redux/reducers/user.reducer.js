import { 
    LOG_IN_USER,
    LOG_OUT_USER,
    LOADING_USER,
    LOADING_USER_SUCCESS,
    LOADING_USER_FAILURE 
} from "../actions/user.actions"

const initialState =() =>{
    let token = localStorage.getItem('token')
    if (!token) {
        return { 
            status: {
                isLoggedIn: false,
                isLoading: false
            }
        }
    }
    else{
        let user = getPayloadFromToken(token)
        return {
            status:{
                isLoggedIn: true,
                isLoading:false
            },
            data: {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
            }
        } 
    }
}
export const user = (state=initialState(), action) => {

    const { type, payload } = action

    switch(type){

        case LOG_IN_USER:{
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                status: {...state.status, ...payload.status}, 
                data:{...state.data, ...payload.user}
            }
        }

        case LOADING_USER:{
            return {...state, status: {...state.status, isLoading: true}}
        }

        case LOADING_USER_SUCCESS: {
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                status: {...state.status, isLoggedIn: true, isLoading: false}, 
                data:{...state.data, ...payload.user}
            }
        }

        case LOADING_USER_FAILURE:
        case LOG_OUT_USER:{
            localStorage.clear()
            return initialState()
        }

        default:
            return state
    }

}

const getPayloadFromToken = (token) => {
    const encodedPayload = token.split('.')[1]
    return JSON.parse(atob(encodedPayload))
}