import { useDispatch } from "react-redux"
import { useState } from "react"
import InputNumber from "../../../components/InputNumber"
import { Box, Divider, Heading, Flex, Spacer } from "@chakra-ui/react"
import { edit_food_details } from "../../middleware/lists.thunks"
import Alert from "../../../components/Alert"

const withFoodDetails = (Component) => {
    return props => {
        const { onClose, food, user } = props
        let dispatch = useDispatch()
        const [ info, setInfo ] = useState({
            ...props.food.nutritional_facts
        })
        const [ alert, setAlert ] = useState(false)
        const [ edit, setEdit ] = useState(false)
        const [ form, setForm ] = useState({foodID:'', data:{}})
        
        const handle_save = (foodID, newServing) => {
            setAlert(true)
            setForm({
                foodID:foodID,
                data:{
                    nutritional_facts:{...info},
                    serving_size: {...newServing}
                }
            })
        }

        const submit = () => {
            dispatch(edit_food_details(form.foodID, form.data, onClose))
        }

        const modify_nutrition = (m) => {
            setInfo(prev => ({...prev, ...m}))
        }
        
        return  <>
                    <Component 
                        {...props} 
                        food={{...food, nutritional_facts: {...info}}}
                        hasEdit={true}
                        edit={edit}
                        handle_edit={() => setEdit(!edit)}
                        onSave={handle_save}
                    />
                    
                    <Divider my={3} />

                    {
                        food.creator === user._id
                        ?   <Box>
                                <Heading size='md'>Nutritional Facts</Heading>

                                <InputNumber isDisabled={!edit} mb={3} onChange={(e) => modify_nutrition({calories:e})} value={info.calories} label='Calories' />
                                <InputNumber isDisabled={!edit} mb={3} onChange={(e) => modify_nutrition({protein:e})} value={info.protein} label='Protein (g)'/>
                                <InputNumber isDisabled={!edit} mb={3} onChange={(e) => modify_nutrition({total_fat:e})} value={info.total_fat} label='Total Fat (g)'/>
                                <InputNumber isDisabled={!edit} onChange={(e) => modify_nutrition({total_carbohydrates:e})} value={info.total_carbohydrates} label='Total Carbohydrates (g)'/>
                            </Box>
                        :   <Box mx={2}>
                                <Heading size='md'>Nutritional Facts (per serving)</Heading>
                                <Flex>Calories: <Spacer/> {info.calories} cal</Flex>
                                <Divider my={1} />
                                <Flex>Fat:      <Spacer/> {info.total_fat} g</Flex>
                                <Divider my={1} />
                                <Flex>Protein:  <Spacer/> {info.protein} g</Flex>
                                <Divider my={1} />
                                <Flex>Carbs:    <Spacer/> {info.total_carbohydrates} g</Flex>
                            </Box>

                    }

                    

                   <Alert 
                        header={'Edit food'}
                        body={<>
                                <p>Are you sure you want to edit the serving sizes and nutritional values of this food?</p>
                                <p>Please make sure that:</p>
                                <li>The serving size are consistent with the calories</li>
                                <li>The macros are consistent with the calories</li>
                            </>}
                        isOpen={alert}
                        onClose={() => setAlert(false)}
                        action={submit}
                   />
                </>
    }
}

export default withFoodDetails