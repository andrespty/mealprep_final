import React from "react";
import { getConversion, prepare_conversion } from "../../utils/conversions";

export const fromMeal = (Component, isLocal=false) => {
    return props => {
        const { food } = props
        
        const data_handled = {
            ...food.food,
            serving_size: food.current_serving,
            nutritional_facts:{
                calories: getConversion(prepare_conversion('calories', food)),
                protein: getConversion(prepare_conversion('protein', food)),
                total_fat: getConversion(prepare_conversion('total_fat', food)),
                total_carbohydrates: getConversion(prepare_conversion('total_carbohydrates', food))
            }
        }

        return <>
            <Component {...props} food={data_handled} isLocal={isLocal}/>
        </>
    }
}