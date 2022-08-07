import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { set_meal_details, clear_meal_details } from "../../actions/mealDetails.actions"
import { getMealDetails } from "../../selectors/mealDetails.selectors"

const withMealDetails = (Component) => {
    return props => {

        let dispatch = useDispatch()
        const { meal } = props

        useEffect(() => {
        
            dispatch(set_meal_details(meal))
        
          return () => {
            dispatch(clear_meal_details())
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        
        const new_meal = useSelector(getMealDetails)

        if (!new_meal.name) return null
        
        return  <>
                  <Component {...props} meal={new_meal} />
                </>
    }
}

export default withMealDetails