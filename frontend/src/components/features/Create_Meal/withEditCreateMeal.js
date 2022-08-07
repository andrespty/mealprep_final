import { useDispatch } from "react-redux"
import { save_food_edited } from "../../../Redux/middleware/create_meal.thunks"

export const withEditCreateMeal = (Component) => {
    return props => {
        const { onClose } = props
        const dispatch = useDispatch()

        const onSave = (foodID, edit) => {
            dispatch(save_food_edited(foodID, edit))
            try{
                onClose()
            }
            catch {
                console.log('No Props to close')
            }
        }

        return <>
            <Component {...props} onSave={onSave} />
        </>
    }
}