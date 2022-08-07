const convert = require('convert-units')

export const getConversion = ({ attr, og_serv_unit, new_serv_unit, og_n_serv, new_n_serv, og_serv, new_serv }) => {
    let n_serv_ratio = new_n_serv / og_n_serv
    let serv_ratio = new_serv / og_serv
    let conversion = convert(1).from(new_serv_unit).to(og_serv_unit)

    return (attr * n_serv_ratio * serv_ratio * conversion)
}

export const prepare_conversion = (attr, food) => {
    return {
        attr:           food.food.nutritional_facts[attr],
        og_n_serv:      food.food.serving_size.number_of_servings,    
        og_serv:        food.food.serving_size.serving, 
        new_n_serv:     food.current_serving.number_of_servings,
        new_serv:       food.current_serving.serving,
        new_serv_unit:  food.current_serving.serving_unit,
        og_serv_unit:   food.food.serving_size.serving_unit
    }
}
