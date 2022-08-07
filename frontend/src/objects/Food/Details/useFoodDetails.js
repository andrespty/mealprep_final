import { useState, useEffect } from "react"
import { getConversion } from "../../../utils/conversions"
import { useDispatch } from "react-redux"
import { delete_food_in_database } from "../../../Redux/middleware/lists.thunks"

export const useFoodDetails = (food, onClose) => {
    const [serving, setServing ] = useState({
        serving: food.serving_size.serving,
        number_of_servings: food.serving_size.number_of_servings, 
        serving_unit: food.serving_size.serving_unit
    })
    const [ macros, setMacros ] = useState(init(food, serving))
    let dispatch = useDispatch()

    useEffect(() => {
      setMacros(init(food, serving))
    }, [serving, food])
    
    const modify = (payload) => setServing(prev => ({...prev, ...payload}))

    const delete_food = () => {
        dispatch(delete_food_in_database(food._id, onClose))
    }

    return { serving, modify, macros, delete_food }
}

const init = (food, serving) => {
    return {
        fat: getConversion({
            attr: food.nutritional_facts.total_fat,
            og_serv_unit: food.serving_size.serving_unit,
            new_serv_unit: serving.serving_unit,
            og_n_serv: food.serving_size.number_of_servings, 
            new_n_serv: serving.number_of_servings, 
            og_serv: food.serving_size.serving, 
            new_serv: serving.serving
        }),
        protein: getConversion({
            attr: food.nutritional_facts.protein,
            og_serv_unit: food.serving_size.serving_unit,
            new_serv_unit: serving.serving_unit,
            og_n_serv: food.serving_size.number_of_servings, 
            new_n_serv: serving.number_of_servings, 
            og_serv: food.serving_size.serving, 
            new_serv: serving.serving
        }),
        carbs: getConversion({
            attr: food.nutritional_facts.total_carbohydrates,
            og_serv_unit: food.serving_size.serving_unit,
            new_serv_unit: serving.serving_unit,
            og_n_serv: food.serving_size.number_of_servings, 
            new_n_serv: serving.number_of_servings, 
            og_serv: food.serving_size.serving, 
            new_serv: serving.serving
        }),
        calories: getConversion({
            attr: food.nutritional_facts.calories,
            og_serv_unit: food.serving_size.serving_unit,
            new_serv_unit: serving.serving_unit,
            og_n_serv: food.serving_size.number_of_servings, 
            new_n_serv: serving.number_of_servings, 
            og_serv: food.serving_size.serving, 
            new_serv: serving.serving
        })
    }
}