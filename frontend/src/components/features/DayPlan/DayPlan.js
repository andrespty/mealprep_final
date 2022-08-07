import React, { lazy, Suspense } from 'react'
import { Box, Heading, Divider, Flex, Text, Spacer, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { useDailyMeals } from './useDailyMeals'
import MoreIcon from '../../../assets/MoreIcon'
import { withModal } from '../../containers/withModal'
import MealTimeDetails from './MealTimeDetails'
import { ChevronRightIcon } from '@chakra-ui/icons'

const MealTimeBoxes = lazy(() => import('./MealTimeBoxes'))
const FlexWithModal = withModal(Flex)

function DayPlan() {

  const { total_calories, clear_schedule, enter_edit, status } = useDailyMeals()

  return (
    <Box>


      <Box
          borderRadius={5}
          borderWidth='1px'
          px={3}
          pt={2}
          pb={2}
      >
        <Flex alignItems={'center'} mb={1} >
          <Heading size='lg'>Daily Planner {status.isEditing ? '(Editing)' : ''} </Heading>
          <Spacer />
          <Menu>

            <MenuButton 
              variant='ghost'
              as={IconButton}
              icon={<MoreIcon/>}
            />

            <MenuList>
              <MenuItem onClick={enter_edit}> 
                {
                  status.isEditing
                  ?   'Stop editing'
                  :   'Edit'
                }
              </MenuItem>
              <MenuItem onClick={clear_schedule}>
                Clear All
              </MenuItem>
            </MenuList>
          </Menu>  
        </Flex>

        <FlexWithModal 
          alignItems={'center'}
          cursor='pointer'
          body={<MealTimeDetails mealTime='Total' isIndividual={false} />}
        >
            <Heading size='lg'>Total<ChevronRightIcon /></Heading>
            <Spacer />
            <Text fontWeight={'bold'} fontSize='lg'>
              {total_calories.toFixed(0)} Cals
            </Text>
        </FlexWithModal>
        
        <Divider my={2}/> 

        <Suspense fallback=''>
          <MealTimeBoxes label={'Breakfast'} />
          
          <Divider my={2} />

          <MealTimeBoxes label={'Lunch'} />

          <Divider my={2} />

          <MealTimeBoxes label={'Dinner'} />
          
          <Divider my={2} />

          <MealTimeBoxes label={'Snacks'} />
        </Suspense>
      </Box>
    </Box>
  )
}

export default DayPlan