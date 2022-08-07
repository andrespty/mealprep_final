const router = require('express').Router()
let User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verifyJWT = require('../middleware/verifyJWT')

const JWT_time = 86400
// const JWT_time = 10

// Get all users
router.route('/').get((req, res) => {
    console.log(req.baseUrl + req.route.path)
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Log user in
router.route('/login').post(async (request, response) => {
    console.log(request.baseUrl + request.route.path)
    const user = request.body

    User.findOne({ email: user.email }).select('-__v -updatedAt -createdAt')
    .then( dbUser => {
        if (!dbUser){
            return response.json({message:'No credentials found', success:false, field:'email'})
        }
        bcrypt.compare(user.password, dbUser.password)
        .then( isValid => {
            if (isValid){
                let payload = dbUser._doc
                delete payload.password
                jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: JWT_time}, (error, token) => {
                    if (error) return response.json({message: error, success:false})
                    
                    return response.json({
                        success: true,
                        token: token,
                        user:{...payload}
                    })
                })
            }
            else {
                return response.json({message: "No credentials found", success:false, field:'email'})
            }
        })
    })

})

// Create User
router.route('/signup').post(async (request, response) => {
    console.log(request.baseUrl + request.route.path)
    const user = request.body

    user.password = await bcrypt.hash(request.body.password, 10)

    const newUser = new User({
        username: user.username.toLowerCase(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email.toLowerCase(),
        password: user.password
    })

    newUser.save()
    .then(user => {
        const payload = {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        
        console.log(payload)
        
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: JWT_time}, (error, token) => {
            if (error) return response.status(400).json({message: error})
            return response.status(200).json({
                message:'User created successfully',
                success: true,
                token: token,
                user: payload
            })
        })
        
    })
    .catch(error => {
        console.log(error.message)
        response.json({error: 'Error occured: ' + error.message,
            message:'User already exists',
            success:false,
        })
    })
})

// Refresh and validate token
router.route('/validation').post(verifyJWT, (request, response) => {
    console.log(request.baseUrl + request.route.path)
    jwt.sign(request.user, process.env.JWT_SECRET, {expiresIn: JWT_time}, (error, token) => {
        if (error) return response.json({message: error, success:false})
        return response.json({
            success: true,
            token: token,
            user:{...request.user}
        })
    })
})

module.exports = router
