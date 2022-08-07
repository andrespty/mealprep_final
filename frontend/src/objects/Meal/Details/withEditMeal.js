import { useDispatch } from "react-redux"
import { execute_recipe_edit } from "../../../Redux/middleware/mealDetails.thunks"
import { Box, Heading, Divider, Flex, Spacer } from "@chakra-ui/react"
export const withEditMeal = (Component) => {
    return props => {
        const { onClose, food } = props
        const dispatch = useDispatch()
        console.log(food)
        const nutritional_facts = {...food.food.nutritional_facts}
        
        const onSave = (foodID, edit) => {
            dispatch(execute_recipe_edit(foodID, edit))
            try{
                onClose()
            }
            catch {
                console.log('No Props to close')
            }
        }

        return <>
            <Component {...props} onSave={onSave} />
           
            <Divider my={3} />

            <Heading size='md'>Nutritional Facts (per serving)</Heading>
            <Box mx={2}>
                <Flex>Calories: <Spacer/> {nutritional_facts.calories} cal</Flex>
                <Divider my={1} />
                <Flex>Fat:      <Spacer/> {nutritional_facts.total_fat} g</Flex>
                <Divider my={1} />
                <Flex>Protein:  <Spacer/> {nutritional_facts.protein} g</Flex>
                <Divider my={1} />
                <Flex>Carbs:    <Spacer/> {nutritional_facts.total_carbohydrates} g</Flex>
            </Box>
        </>
    }
}