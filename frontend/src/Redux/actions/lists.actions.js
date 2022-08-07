export const LOADING_LISTS = 'LOADING_LISTS'
export const loadingLists = () => ({
    type:LOADING_LISTS
})

export const LOADING_LISTS_SUCCESS = 'LOADING_LISTS_SUCCESS'
export const loadingListsSuccess = (payload) => ({
    type: LOADING_LISTS_SUCCESS,
    payload: { ...payload }
})

export const LOADING_LISTS_FAIL = 'LOADING_LISTS_FAIL'
export const loadingListsFail = (payload) => ({
    type: LOADING_LISTS_FAIL
})

export const ADD_TO_LIST = 'ADD_TO_LIST'
export const addToMyFoodsList = (payload) => ({
    type: ADD_TO_LIST,
    payload:{
        list:'myFoods',
        data: {...payload}
    }
})

export const addToMyMealsList = (payload) => ({
    type: ADD_TO_LIST,
    payload:{
        list:'myMeals',
        data: {...payload}
    }
})

export const UPDATE_LIST = 'UPDATE_LIST'
export const update_list_meals = (payload) => ({
    type: UPDATE_LIST,
    payload:{
        list: 'myMeals',
        data: [...payload]
    }
})
export const update_list_foods = (payload) => ({
    type: UPDATE_LIST,
    payload:{
        list: 'myFoods',
        data: [...payload]
    }
})