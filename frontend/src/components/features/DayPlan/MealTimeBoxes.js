import React, { useCallback } from 'react'
import { Box, Button, Show } from '@chakra-ui/react'
import MealTimeHeader from './MealTimeHeader'
import withDrop from '../DragAndDrop/withDrop'
import MealDataHandler from '../../../objects/Meal/MealDataHandler'
import { withContainer } from '../../containers/withContainer'
import { useDailyMeals } from './useDailyMeals'
import RemoveList from '../../containers/RemoveList'
import { withModal } from '../../containers/withModal'
import MealDetails from '../../../objects/Meal/Details/MealDetails'
import DrawerList from '../../containers/DrawerList'
import MobileMenu from '../Menu/MobileMenu'
import { withSaveDay } from '../../../objects/Meal/Details/withSaveDay'
import MealTimeDetails from './MealTimeDetails'

const BoxWithDrop = withDrop(Box)
const MealDataHandlerWithContainer = withContainer(MealDataHandler)
const ButtonWithModal = withModal(Button)
const HeaderWithModal = withModal(MealTimeHeader)

function MealTimeBoxes({ label }) {

  const { dailyMeals, remove_meal, add_meal, status } = useDailyMeals()

  const handle_add = (item) => {
    add_meal(label, item)
  }

  const handle_drop = useCallback((item) => {
      if (item.success){
        add_meal(label,item.data)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
  )
  const handle_remove = useCallback((item) => {
      remove_meal(label, item)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
  )
  return (
    <Box>
        <HeaderWithModal 
          label={label} 
          cals={dailyMeals[label].calories} 
          cursor='pointer'
          body={<MealTimeDetails mealTime={label}/>}
        />
        <BoxWithDrop minH={100} onDrop={handle_drop}>

          {
            status.isEditing
            ? 
              <RemoveList 
                list={dailyMeals[label].list}
                resourceName='meal'
                itemComponent={MealDataHandlerWithContainer}
                onRemove={handle_remove}
              />
            :
              <DrawerList 
                list={dailyMeals[label].list}
                resourceName='meal'
                itemComponent={MealDataHandlerWithContainer}
                body={withSaveDay(MealDetails, label)}
                drawerProps={{placement:'left', size:'sm'}}
              />
          }
        </BoxWithDrop>

        <Show below='md'>
          <ButtonWithModal 
            w='100%' 
            size='sm'
            header=''
            body={<MobileMenu onAdd={handle_add} />}
          >
              Add
          </ButtonWithModal>
        </Show>
    </Box>
  )
}

export default MealTimeBoxes