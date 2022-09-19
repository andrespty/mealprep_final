import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import withLists from '../../../Redux/containers/lists/withListsData'
import RequiresUser from '../../containers/RequiresUser'
import AddMyFoods from './AddMyFoods'
import CreateFood from '../Create_Food/CreateFood'

function FoodTabs({ myFoods, foods, selectedFoods, setSelectedFoods }) {
  return (
    <Box>

      <Tabs colorScheme={'orange'}>
      
        <TabList>
          <Tab>My Foods</Tab>
          {/* <Tab>Foods</Tab> */}
          <Tab>Create Food</Tab>
        </TabList>
      
        <TabPanels>

          <TabPanel>
            <RequiresUser >
              
              <AddMyFoods 
                myFoods={myFoods}
                selectedFoods={selectedFoods}
                setSelectedFoods={setSelectedFoods}
              />

            </RequiresUser>
          </TabPanel>
          
          {/* <TabPanel>
            <RequiresUser >
              
              <AddMyFoods 
                myFoods={foods}
                selectedFoods={selectedFoods}
                setSelectedFoods={setSelectedFoods}
              />

            </RequiresUser>
          </TabPanel>
           */}
          <TabPanel>
            <RequiresUser >

              <CreateFood />
            
            </RequiresUser>
          </TabPanel>

        </TabPanels>
      
      </Tabs>
    
    </Box>
  )
}

export default withLists(FoodTabs)