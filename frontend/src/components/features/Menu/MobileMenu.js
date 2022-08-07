import React, { useState } from 'react'
import { Box, Tabs, Tab, TabPanels, TabPanel, TabList, Button, ButtonGroup } from '@chakra-ui/react'
import RequiresUser from '../../containers/RequiresUser'
import RadioList from '../../containers/RadioList'
import MealDataHandler from '../../../objects/Meal/MealDataHandler'
import withLists from '../../../Redux/containers/lists/withListsData'
import EmptyList from '../../containers/Errors/EmptyList'
import { withSearch } from './withSearch'

const RadioListWithSearch = withSearch(RadioList)

function MobileMenu({ onAdd, onClose, ...props }) {
    const { myMeals, meals } = props
    const [ selection, setSelection ] = useState('')

    const handle_cancel = () => onClose()

    const handle_add = () => {
        const index = myMeals.findIndex(meal => meal._id === selection)
        onAdd(myMeals[index])
        onClose()
    }
    
    return (
        <Box>

            <Tabs colorScheme={'orange'}>

                <TabList>
                    <Tab>My Meals</Tab>
                    <Tab>Meals</Tab>
                </TabList>

                <TabPanels overflow={'auto'} overflowX='hidden' maxH='65vh'>
                    
                    <TabPanel>
                        <RequiresUser>
                            <RadioListWithSearch
                                list={myMeals}
                                resourceName='meal'
                                itemComponent={MealDataHandler}
                                emptyListComponent={EmptyList}
                                emptyListProps={{isMeal:true}}
                                onClickItem={setSelection}
                                value={selection}
                            />
                        </RequiresUser>
                    </TabPanel>
                    
                    <TabPanel>
                        <RequiresUser>
                            <RadioListWithSearch
                                list={meals}
                                resourceName='meal'
                                emptyListComponent={EmptyList}
                                emptyListProps={{isMeal:true}}
                                itemComponent={MealDataHandler}
                                onClickItem={setSelection}
                                value={selection}
                            />
                        </RequiresUser>
                    </TabPanel>
                
                </TabPanels>

            </Tabs>

            <Box float={'right'}>
                <ButtonGroup  w='100%'>
                    <Button onClick={handle_cancel}>
                        Cancel
                    </Button>
                    <Button 
                        colorScheme={'orange'}
                        isDisabled={selection === ''}
                        onClick={handle_add}
                    >
                        Add
                    </Button>
                </ButtonGroup>
            </Box>

        </Box>
    )
}

export default withLists(MobileMenu)