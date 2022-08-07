import { useDispatch, useSelector } from "react-redux";
import { load_lists as load } from "../../middleware/lists.thunks";
import { getMyFoodsList, getMyMealsList, getListsStatus, getOtherMealsList, getFoodsList } from "../../selectors/lists.selector";

const withLists = (Component) => {
    return props => {

        const dispatch = useDispatch()
        const load_lists = () => dispatch(load())
        const myFoods = useSelector(getMyFoodsList)
        const myMeals = useSelector(getMyMealsList)
        const meals = useSelector(getOtherMealsList)
        const foods = useSelector(getFoodsList)
        const { isLoading } = useSelector(getListsStatus)

        return  <>
                    <Component 
                        {...props}
                        load_lists={load_lists}
                        myFoods={myFoods}
                        myMeals={myMeals}
                        meals={meals}
                        foods={foods}
                        isLoading={isLoading}
                    />
                </>
    }
}

export default withLists