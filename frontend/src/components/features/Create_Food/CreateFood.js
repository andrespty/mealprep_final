import React from 'react'
import { Box, Input, Select, Flex, Stack, Heading, Divider, Button, Spacer, Text } from '@chakra-ui/react'
import FormField from '../../FormField'
import { useCreateFood } from './useCreateFood'
import InputNumber from '../../InputNumber'
import Notification from '../../Notification'

function CreateFood() {

    const { info, modify, modify_nutrition, modify_serving, submit } = useCreateFood()

    return (
        <Box>
            <form onSubmit={submit} >
                <Flex direction='row' alignItems='center' >
                    <Heading size='md'>New Food</Heading>
                    <Spacer />
                    <Button 
                        colorScheme={'orange'} 
                        size='sm' 
                        isLoading={info.isLoading} 
                        type='submit' 
                    >
                        Create Food
                    </Button>
                </Flex>

                {/* <Notification 
                    isOpen={info.alert} 
                    message={''}
                    status={info.status}
                />   */}

                {/* Name of food  */}
                <FormField label='Food Name' isRequired={true} mb={3}>
                    <Input placeholder='ex. Chicken' value={info.name} onChange={(e) => modify({name:e.target.value})} />
                </FormField>

                {/* Description of food  */}
                <FormField label='Description' mb={3}>
                    <Input placeholder='ex. Cooked' value={info.description} onChange={(e) => modify({description:e.target.value})} />
                </FormField>

                {/* Serving size  */}
                <FormField label='Serving size' isRequired={true}>
                    <Text>1 Serving:</Text>
                    <Stack direction='row'>
                        <InputNumber placeholder='1' value={info.serving} onChange={(e) => modify_serving({serving:e || 0})} />
                        <Select placeholder='Select unit' value={info.serving_unit} onChange={(e) => modify_serving({serving_unit:e.target.value})} >
                            {
                                units_list.map((unit, key) => (
                                    <option value={unit} key={key} >{unit}</option>
                                ))
                            }
                        </Select>
                    </Stack>
                </FormField>

                <Divider my={3} />

                <Heading size='md'>Nutrition Facts</Heading>

                <InputNumber mb={3} onChange={(e) => modify_nutrition({calories:e})} value={info.calories} placeholder='Required' label='Calories' isRequired={true} />
                <InputNumber mb={3} onChange={(e) => modify_nutrition({protein:e})} value={info.protein} placeholder='Required' label='Protein (g)' isRequired={true}/>
                <InputNumber mb={3} onChange={(e) => modify_nutrition({total_fat:e})} value={info.total_fat} placeholder='Required' label='Total Fat (g)' isRequired={true}/>
                <InputNumber onChange={(e) => modify_nutrition({total_carbohydrates:e})} value={info.total_carbohydrates} placeholder='Required' label='Total Carbohydrates (g)' isRequired={true}/>
            </form>
        </Box>
    )
}

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

export default CreateFood