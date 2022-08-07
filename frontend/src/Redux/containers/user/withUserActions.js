import { useDispatch } from "react-redux"
import { logInUser, logOutUser } from "../../actions/user.actions"

const withUserActions = (Component) => {
    return props => {

        const dispatch = useDispatch()
        const logIn = (payload) => dispatch(logInUser(payload))
        const logOut = () => dispatch(logOutUser())

        return <>
            <Component {...props} logIn={logIn} logOut={logOut} />
        </>
    }
}

export default withUserActions