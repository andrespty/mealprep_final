import React from 'react'
import { Box, Button, Input, Heading, Text, Flex, Spacer, Divider } from '@chakra-ui/react'
import FormField from '../../FormField'
import { withDrawer } from '../../containers/withDrawer'
import FoodTabs from '../Food_Tabs/FoodTabs'
import { useCreateMeal } from './useCreateMeal'
import DrawerList from '../../containers/DrawerList'
import FoodDataHandler from '../../../objects/Food/FoodDataHandler'
import FoodDetail from '../../../objects/Food/Details/FoodDetail'
import { withEditCreateMeal } from './withEditCreateMeal'
import { fromMeal } from '../../../objects/Food/fromMeal'
import { withContainer } from '../../containers/withContainer'
import MacrosDisplay from '../../MacrosDisplay'

const ButtonWithDrawer = withDrawer(Button)

function CreateMeal() {

    const { info, modify, submit, selected_foods, setSelectedFoods } = useCreateMeal()
    console.log(info)

  return (
    <Box>
    
        <Button
            size='sm' 
            colorScheme={'orange'}
            onClick={submit}
        >
            Create
        </Button>

        <FormField isRequired={true} label='Meal Name' mb={3}>
            <Input placeholder='i.e. Overnight Oats' onChange={(e) => modify({name: e.target.value})} value={info.name} />
        </FormField>

        <FormField isRequired={false} label='Description' mb={3}>
            <Input placeholder='Oats, honey...' onChange={(e) => modify({description: e.target.value})} value={info.description} />
        </FormField>

        <Heading as='h4' size='md' mb={2} textAlign='center' >
            {info.calories.toFixed(0)} Calories
        </Heading>

        <MacrosDisplay {...info.macros}/>

        <Flex direction='row' alignItems='center' my={2} >
            <Text>Items List</Text>
            <Spacer />
            <Button size='sm' mx={2}>
                Edit
            </Button>
            <ButtonWithDrawer 
                size='sm'
                header='Food'
                body={
                    <FoodTabs 
                        selectedFoods={selected_foods}
                        setSelectedFoods={setSelectedFoods}
                    />
                }
                drawerprops={{placement:'left', size: 'sm'}}
            >
                Add food
            </ButtonWithDrawer>
        </Flex>

        <Divider />

        <DrawerList
            list={info.recipe}
            resourceName={'food'}
            itemComponent={fromMeal(withContainer(FoodDataHandler))}
            body={withEditCreateMeal(fromMeal(FoodDetail))}
            header='Food'
            drawerProps={{placement: 'left', size: 'sm'}}
        />

    </Box>
  )
}

export default CreateMeal