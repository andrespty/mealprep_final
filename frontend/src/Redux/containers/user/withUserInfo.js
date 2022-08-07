import { useSelector } from "react-redux";
import { getUserData, getUserStatus } from "../../selectors/user.selectors";

const withUserInfo = (Component) => {
    return props => {

        const user = useSelector(getUserData)
        const status = useSelector(getUserStatus)

        return <>
            <Component {...props} user={user} status={status} />
        </>
    }
}

export default withUserInfo