import React from 'react'
import withUserInfo from '../../Redux/containers/user/withUserInfo'
import PleaseLogin from './Errors/PleaseLogin'

function RequiresUser({ errorComponent ,children, ...props }) {

    const { user, status } = props

    return (
        <>
            {
                status.isLoggedIn
                ?   <React.Fragment>
                        {
                            React.Children.map(children, child => {
                                if (React.isValidElement(child)){
                                    return React.cloneElement(child, { user: user, status: status })
                                }
                                return child
                            })
                        }
                    </React.Fragment>
                :   <React.Fragment>
                        <PleaseLogin />
                    </React.Fragment>

            }
        </>
    )
}

export default withUserInfo(RequiresUser)