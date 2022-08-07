import React from 'react'
import { Box, Heading, Text, Stack, Select, SimpleGrid, Button, ButtonGroup, Flex, Spacer } from '@chakra-ui/react'
import FormField from '../../../components/FormField'
import InputNumber from '../../../components/InputNumber'
import { useFoodDetails } from './useFoodDetails'
import MacrosDisplay from '../../../components/MacrosDisplay'
import withUserInfo from '../../../Redux/containers/user/withUserInfo'

function FoodDetail({ food, onSave, edit=true, hasEdit=false, isLocal= false, handle_edit, onClose, ...props }) {
    console.log(food)
    const { serving, modify, macros, delete_food } = useFoodDetails(food, onClose)

    const handle_save = () => {
        onSave(food._id, serving)
    }

    return (
        <Box>
            <Heading>{ food.name }</Heading>
            <Text>{ food.description }</Text>
            
            {
                food.creator === props.user._id || isLocal
                ?
                    <ButtonGroup>
                        <Button onClick={handle_save} colorScheme={'orange'}>
                            Save
                        </Button>
                        
                        {
                            hasEdit
                            ?   <>
                                    <Button onClick={handle_edit}>
                                            {
                                                edit
                                                ?'Cancel'
                                                :'Edit'
                                            }
                                    </Button>
                                    {
                                        edit
                                        ?<Button colorScheme={'red'} onClick={delete_food}>
                                            Delete Food
                                        </Button>
                                        : null
                                    }
                            </>   
                            :   null
                        }
                    </ButtonGroup>
                : null
            }
            
            <Heading as='h4' size='md' mb={2} textAlign='center' >
                {macros.calories.toFixed(0)} Calories
            </Heading>

            <MacrosDisplay {...macros} />
            
            {
                food.creator === props.user._id || isLocal
                ?
                    <FormField label='Serving size' isRequired={true}>
                            <SimpleGrid columns={2} spacing={2} alignItems='center'>
                                <Box>
                                    <InputNumber 
                                        isDisabled={!edit}
                                        placeholder='1' 
                                        onChange={(e) => modify({number_of_servings: parseFloat(e) || 0})} 
                                        value={serving.number_of_servings}    
                                    /> 
                                </Box>
                                <Box>
                                    <Text>Serving(s)</Text>
                                </Box>
                            </SimpleGrid>
                            <Stack direction='row'>
                                <InputNumber 
                                    isDisabled={!edit}
                                    placeholder='1' 
                                    onChange={e => modify({serving: parseFloat(e) || 0})}
                                    value={serving.serving}
                                />  
                                <Select 
                                    isDisabled={!edit}
                                    placeholder='Select unit'
                                    value={serving.serving_unit}    
                                    onChange={e => modify({serving_unit: e.target.value})}
                                >
                                    {
                                        units_list.map((unit, key) => (
                                            <option value={unit} key={key} >{unit}</option>
                                        ))
                                    }
                                </Select>
                            </Stack>

                        </FormField>
                :   <Box>
                    <Heading as='h4' size='md' mb={2} textAlign='left' >
                        Serving Size
                    </Heading>
                    <Flex>
                    <Text>{serving.number_of_servings} Serving</Text>
                    <Spacer />
                    <Text fontWeight={'semibold'}>{serving.serving} {serving.serving_unit} </Text>
                    </Flex>
                </Box>
            }
        </Box>
    ) 
}

export default withUserInfo(FoodDetail)

const units_list = [
    'unit(s) (Slice, apple, etc.)',
    'mg',
    'g',
    'kg',
    'oz',
    'lb',
    'cup',
    'pnt',
    'gal',
    'l',
    'ml'
]
