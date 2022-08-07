import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { user } from './reducers/user.reducer';
import { lists } from './reducers/lists.reducer';
import { create_food } from './reducers/create_food.reducer';
import { create_meal } from './reducers/create_meal.reducer';
import { mealDetails } from './reducers/mealDetails.reducer';
import { dailyMeals } from './reducers/dailyMeals.reducer';

const reducers = {
    user,
    lists,
    create_food,
    create_meal,
    mealDetails,
    dailyMeals
}

const reducer = combineReducers(reducers);

export const store = () => configureStore({
    reducer: reducer,
    devTools: true
})

