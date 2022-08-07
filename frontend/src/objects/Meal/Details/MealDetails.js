import React from 'react'
import { Heading, Box, Text, Flex, Spacer, Button, Divider, ButtonGroup } from '@chakra-ui/react'
import { useMealDetails } from './useMealDetails'
import DrawerList from '../../../components/containers/DrawerList'
import { withDrawer } from '../../../components/containers/withDrawer'
import FoodTabs from '../../../components/features/Food_Tabs/FoodTabs'
import { fromMeal } from '../../Food/fromMeal'
import { withContainer } from '../../../components/containers/withContainer'
import FoodDataHandler from '../../Food/FoodDataHandler'
import FoodDetail from '../../Food/Details/FoodDetail'
import MacrosDisplay from '../../../components/MacrosDisplay'
import { withEditMeal } from './withEditMeal'
import withMealDetails from '../../../Redux/containers/mealDetails/withMealDetails'
import MultiSelectList from '../../../components/containers/MultiSelectList'
import withUserInfo from '../../../Redux/containers/user/withUserInfo'

const ButtonWithDrawer = withDrawer(Button)

function MealDetails({ meal, onClose, save, isLocal=false, ...props }) {

    const { info, edit, addEdit, remove, setSelectedFoods, delete_meal } = useMealDetails(meal, onClose)
    const { name, description, recipe, macros, calories, status, selectedFoods } = info

    console.log(info)

    return (
        <Box>
            <Heading>{ name }</Heading>
            <Text>{ description }</Text>

            <Heading as='h4' size='md' mb={2} textAlign='center' >
                {calories.toFixed(0)} Calories
            </Heading>

            <MacrosDisplay {...macros} />

            <Flex direction='row' alignItems='center' my={2} >
                
                <Text>Items List</Text>
                
                <Spacer />
                
                {
                    info.creator === props.user._id || isLocal
                    ?
                        <ButtonGroup size='sm'>
                            {
                                status.isEditting
                                ?   <>
                                        <Button onClick={delete_meal} colorScheme='red'>
                                            Delete
                                        </Button>
                                        <Button onClick={remove}>
                                            Remove Items
                                        </Button>
                                        <Button onClick={edit}>
                                            Cancel
                                        </Button>
                                    </>
                                :
                                    <>
                                        <ButtonWithDrawer 
                                            header='Food'
                                            body={
                                                <FoodTabs 
                                                    selectedFoods={selectedFoods}
                                                    setSelectedFoods={setSelectedFoods}
                                                />
                                            }
                                            drawerprops={{placement:'left', size: 'sm'}}
                                        >
                                            Add food
                                        </ButtonWithDrawer>
                                        <Button onClick={edit}>
                                            Edit
                                        </Button>
                                        <Button colorScheme={'orange'} onClick={save} isLoading={status.isLoading}>
                                            Save
                                        </Button>
                                    </>
                            }
                            
                        </ButtonGroup>
                    : null
                }
            </Flex>

            <Divider />

            {
                status.isEditting
                ?
                        <MultiSelectList
                        items={recipe}
                        resourceName={'food'}
                        itemComponent={fromMeal(FoodDataHandler)}
                        onChange={addEdit}
                        selectedValues={status.removeList}
                    />
                :
                    <DrawerList
                        list={recipe}
                        resourceName={'food'}
                        itemComponent={fromMeal(withContainer(FoodDataHandler))}
                        body={withEditMeal(fromMeal(FoodDetail, isLocal))}
                        header='Food'
                        drawerProps={{placement: 'left', size: 'sm'}}
                    />
                
            }
            
            
        </Box>
    )
}

export default withMealDetails(withUserInfo(MealDetails))