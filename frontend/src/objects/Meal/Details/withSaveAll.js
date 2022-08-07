import { save_edit_mealDetails } from "../../../Redux/middleware/mealDetails.thunks"
import { useDispatch } from "react-redux"

export const withSaveAll = (Component) => {
    return props => {

        const { onClose } = props
        const dispatch = useDispatch()
        
        const save = () => {
            dispatch(save_edit_mealDetails(onClose))
        }

        return <>
            <Component 
                {...props}  
                save={save}
            />
        </>
    }
}