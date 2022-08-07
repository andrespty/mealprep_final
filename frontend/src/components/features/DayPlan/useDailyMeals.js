import { useDispatch, useSelector } from "react-redux";
import { getDailyMealsData, getDailyMealsStatus, getDailyMealsTotalCalories } from "../../../Redux/selectors/dailyMeals.selectors";
import { add_meal_to_schedule_calculation, remove_meal_from_schedule_calculation } from "../../../Redux/middleware/dailyMeals.thunks";
import { clear_meal_schedule, edit_meal_schedule_status } from "../../../Redux/actions/dailyMeals.actions";
import { useCallback } from "react";

export const useDailyMeals = () => {    

    let dispatch = useDispatch()

    const dailyMeals = useSelector(getDailyMealsData)
    const status = useSelector(getDailyMealsStatus)
    const total_calories = useSelector(getDailyMealsTotalCalories)

    const enter_edit = useCallback(() => {
        dispatch(edit_meal_schedule_status({isEditing: !status.isEditing}))
    }, [status])

    const clear_schedule = useCallback(() => {
        dispatch(clear_meal_schedule())
    },[])

    const add_meal = useCallback((mealTime, meal) => {
        dispatch(add_meal_to_schedule_calculation(mealTime, meal))
    },[])

    const remove_meal = useCallback((mealTime, meal) => {
        dispatch(remove_meal_from_schedule_calculation(mealTime, meal))
        dispatch(edit_meal_schedule_status({isEditing: false}))
      },
      [],
    )
    

    return { dailyMeals, status, add_meal, total_calories, clear_schedule, enter_edit, remove_meal }
}