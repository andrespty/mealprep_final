import React, { useEffect, Suspense, lazy } from 'react'
import { Box, Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react'
import RequiresUser from '../../containers/RequiresUser'
import withLists from '../../../Redux/containers/lists/withListsData'
import MealDataHandler from '../../../objects/Meal/MealDataHandler'
import FoodDataHandler from '../../../objects/Food/FoodDataHandler'
import { withContainer } from '../../containers/withContainer'
import DrawerList from '../../containers/DrawerList'
import MealDetails from '../../../objects/Meal/Details/MealDetails'
import FoodDetail from '../../../objects/Food/Details/FoodDetail'
import withFoodDetails from '../../../Redux/containers/foodDetails/withFoodDetails'
import { withSaveAll } from '../../../objects/Meal/Details/withSaveAll'
import { withSearch } from './withSearch'

const EmptyList = lazy(() => import('../../containers/Errors/EmptyList'))
const DrawerListWithSearch = withSearch(DrawerList)

function Menu({mealComponent: MealComponent = MealDataHandler ,...props}) {
    const { myFoods, myMeals, meals, foods, load_lists } = props
    
    useEffect(() => {
        load_lists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box h='100%'>
            <Suspense>
            <Tabs colorScheme={'orange'}>

                <TabList>
                    <Tab>My Meals</Tab>
                    <Tab>My Foods</Tab>
                    <Tab>Meals</Tab>
                    {/* <Tab>Foods</Tab> */}
                    
                </TabList>

                <TabPanels overflow={'auto'} overflowX='hidden' maxH='700px'>
                    <TabPanel>
                        <RequiresUser>
                            <DrawerListWithSearch 
                                list={myMeals}
                                resourceName='meal'
                                itemComponent={withContainer(MealComponent)} // Component for the list display
                                emptyComponent={EmptyList}
                                body={withSaveAll(MealDetails)} // Component that will be rendered in the drawer
                                emptyComponentProps={{isMeal: true}}
                                drawerProps={{placement: 'left', size:'sm'}}
                            />
                        </RequiresUser>
                    </TabPanel>

                    <TabPanel>
                        <RequiresUser>
                            <DrawerListWithSearch
                                list={myFoods}
                                resourceName='food'
                                itemComponent={withContainer(FoodDataHandler)} // Component for the list display
                                emptyComponent={EmptyList}
                                body={withFoodDetails(FoodDetail)} // Component that will be rendered in the drawer
                                emptyComponentProps={{isMeal: false}}
                                drawerProps={{placement: 'left', size:'sm'}}
                            />
                        </RequiresUser>
                    </TabPanel>
                
                    <TabPanel>
                        <RequiresUser>
                            <DrawerListWithSearch
                                list={meals}
                                resourceName='meal'
                                emptyComponent={EmptyList}
                                itemComponent={withContainer(MealComponent)} // Component for the list display
                                body={withSaveAll(MealDetails)} // Component that will be rendered in the drawer
                                emptyComponentProps={{isMeal: true}}
                                drawerProps={{placement: 'left', size:'sm'}}
                            />
                        </RequiresUser>
                    </TabPanel>

                    {/* <TabPanel>
                        <RequiresUser>
                            <DrawerListWithSearch
                                list={foods}
                                resourceName='food'
                                emptyComponent={EmptyList}
                                itemComponent={withContainer(FoodDataHandler)} // Component for the list display
                                body={withFoodDetails(FoodDetail)} // Component that will be rendered in the drawer
                                emptyComponentProps={{isMeal: false}}
                                drawerProps={{placement: 'left', size:'sm'}}
                            />
                        </RequiresUser>
                    </TabPanel> */}

                </TabPanels>

            
            </Tabs>
            </Suspense>
        </Box>
    )
}

export default withLists(Menu)