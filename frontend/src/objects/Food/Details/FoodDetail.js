import React from 'react'
import { Box, Heading, Text, Stack, Select, SimpleGrid, Button, ButtonGroup, Flex, Spacer,
Menu, MenuItem, MenuButton, MenuList } from '@chakra-ui/react'
import FormField from '../../../components/FormField'
import InputNumber from '../../../components/InputNumber'
import { useFoodDetails } from './useFoodDetails'
import MacrosDisplay from '../../../components/MacrosDisplay'
import withUserInfo from '../../../Redux/containers/user/withUserInfo'
import { withAlert } from '../../../components/containers/withAlert'

const ButtonWithAlert = withAlert(Button)

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
                                        ?<ButtonWithAlert 
                                            colorScheme={'red'} 
                                            action={delete_food}
                                            header="Delete Food"
                                            body={<>Are you sure you want to delete this item?</>}
                                            cta={'Delete'}
                                        >
                                            Delete Food
                                        </ButtonWithAlert>
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
                                        onChange={(e) => modify({number_of_servings: e || 0})} 
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
                                    onChange={e => modify({serving: e|| 0})}
                                    value={serving.serving}
                                    width={"100%"}
                                />  
                                <Menu>
                                    <MenuButton as={Button} isDisabled={!edit} width="100%">
                                        {
                                            serving.serving_unit === ''
                                            ? "Select Unit"
                                            : `${serving.serving_unit}`
                                        }
                                    </MenuButton>
                                    <MenuList>
                                        {
                                            units_list.map((unit, key) => {
                                                let val = unit
                                                if (unit === 'Select Unit') val = ''
                                                return (
                                                <MenuItem 
                                                    onClick={() => modify({serving_unit:val})}
                                                    value={unit} 
                                                    key={key}
                                                >
                                                    {unit}
                                                </MenuItem>
                                            )})
                                        }
                                    </MenuList>
                                </Menu>
                                {/* <Select 
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
                                </Select> */}
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
    'Select Unit',
    'g',
    'kg',
    'oz',
    'lb',
    'cup',
    'pnt',
    'l',
    'ml'
]
