
import { useDailyMeals } from "./useDailyMeals"
import { getConversion, prepare_conversion } from "../../../utils/conversions"
export const useMealTimeDetails = (isIndividual, mealTime) => {

    const { dailyMeals } = useDailyMeals()
    let calories = 0
    let macros = {
        fat:0,
        protein:0,
        carbs: 0
    }
    const list = isIndividual 
        ? [...dailyMeals[mealTime].list] 
        : [...dailyMeals.Breakfast.list, ...dailyMeals.Lunch.list, ...dailyMeals.Dinner.list, ...dailyMeals.Snacks.list]
        
    list.forEach(meal => {
        meal.recipe.forEach(food => {
            calories += getConversion(prepare_conversion('calories', food))
            macros.protein += getConversion(prepare_conversion('protein', food))
            macros.fat += getConversion(prepare_conversion('total_fat', food))
            macros.carbs += getConversion(prepare_conversion('total_carbohydrates', food))
        })
    })

    return { calories, macros }
}