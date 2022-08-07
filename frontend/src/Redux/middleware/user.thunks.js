import { loadingUser, loadingUserSuccess, loadingUserFailure } from "../actions/user.actions"
import axios from "axios"
import { fetch_url } from "../../App"

export const refresh_user_validation = () => async (dispatch) => {

    console.log('Refreshing...')
    try{
        dispatch(loadingUser())
        const response = await axios.post(`${fetch_url}/users/validation/`, {}, {
            headers: {
                'x-access-token': 'Bearer ' + localStorage.getItem('token')
            }
        })
        const res = await response.data
        if (res.success){
            dispatch(loadingUserSuccess(res))
        }
        else{
            dispatch(loadingUserFailure())
        }
    }
    catch (e){
        dispatch(loadingUserFailure())
    }
}
