import React from 'react'
import { Box, Heading, Flex, Spacer, Button, Hide, ButtonGroup } from '@chakra-ui/react'
import { withDrawer } from '../components/containers/withDrawer'
import CreateMeal from '../components/features/Create_Meal/CreateMeal'
import SplitScreen from '../components/containers/SplitScreen'
import withDrag from '../components/features/DragAndDrop/withDrag'
import MealDataHandler from '../objects/Meal/MealDataHandler'
import DayPlan from '../components/features/DayPlan/DayPlan'
import Menu from '../components/features/Menu/Menu'
import { AddIcon } from '@chakra-ui/icons'
import CreateFood from '../components/features/Create_Food/CreateFood'

const MealComponent = withDrag(MealDataHandler)
const ButtonWithDrawer = withDrawer(Button)

function MealPrep() {
  return (
    <Box mt={2} p={3}>
      
      <Flex alignItems='center' >
          <Heading size='lg' >Dashboard</Heading>
          <Spacer />
          <ButtonGroup size={{base:'sm', md:'md'}}>
            <ButtonWithDrawer 
              colorScheme={'orange'}
              header='Create Food'
              body={<CreateFood />}
              drawerprops={{placement:'left', size: 'sm'}}
              leftIcon={<AddIcon/>}
            >
              Food
            </ButtonWithDrawer>
            <ButtonWithDrawer 
              colorScheme={'orange'}
              header='Create Meal'
              body={<CreateMeal />}
              drawerprops={{placement:'left', size: 'sm'}}
              leftIcon={<AddIcon/>}
            >
              Meal
            </ButtonWithDrawer>
          </ButtonGroup>
      </Flex>

      <Box mt={2}>
          <SplitScreen 
            containerProps={{justifyContent:'space-between', gap:{base:0, md:3}}}
          >
            <DayPlan />

            <Hide below="md" >
                <Menu 
                  mealComponent = {MealComponent}
                />
            </Hide>
          
          </SplitScreen>
      </Box>


    </Box>
  )
}

export default MealPrep