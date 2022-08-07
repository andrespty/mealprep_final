import { useDispatch } from "react-redux"
import { save_edit_mealDetails_in_schedule } from "../../../Redux/middleware/dailyMeals.thunks"

export const withSaveDay = (Component, mealTime) => {
    return props => {

        const dispatch = useDispatch()
        const { onClose } = props

        const save = () => {
            dispatch(save_edit_mealDetails_in_schedule(mealTime, onClose))
        }

        return <>
            <Component 
                {...props} 
                save={save}  
                isLocal={true}
            />
        </>
    }
}