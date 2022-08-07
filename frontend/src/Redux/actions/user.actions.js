export const LOG_IN_USER = 'LOG_IN_USER'
export const logInUser = credentials => ({
    type: LOG_IN_USER,
    payload: { ...credentials }
})

export const LOG_OUT_USER = 'LOG_OUT_USER'
export const logOutUser = () => ({
    type: LOG_OUT_USER
})

export const LOADING_USER = 'LOADING_USER'
export const loadingUser = () => ({
    type: LOADING_USER
})

export const LOADING_USER_SUCCESS = 'LOADING_USER_SUCCESS'
export const loadingUserSuccess = (user) => ({
    type: LOADING_USER_SUCCESS,
    payload: { ...user },
})

export const LOADING_USER_FAILURE = 'LOADING_USER_FAILURE'
export const loadingUserFailure = () => ({
    type: LOADING_USER_FAILURE
})