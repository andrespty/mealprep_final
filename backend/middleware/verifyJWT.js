const jwt = require('jsonwebtoken')

const verifyJWT = (request, response, next) => {
    const token = request.headers['x-access-token']?.split(' ')[1]
    console.log('Verifying token...')
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return response.json({
                success:false,
                isLoggedIn: false,
                message: 'Failed to authenticate'
            })
            delete decoded.iat
            delete decoded.exp
            request.user = decoded
            next()
        })
    }
    else {
        response.json({
            success: false,
            message: 'Incorrect token given',
            isLoggedIn: false
        })
    }
}

module.exports = verifyJWT