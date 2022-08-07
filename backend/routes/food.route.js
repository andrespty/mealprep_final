const router = require('express').Router()
let Food = require('../models/food.model')

// Update Food
router.route('/:foodID').put((request, response) => {
    const { foodID } = request.params
    const updated_food = request.body

    Food.findByIdAndUpdate(foodID, updated_food, {new:true}, (error, food) => {
        if (error){
            response.status(400).json({success: false, message: errror})
        }
        else {
            response.json({success: true, data: food})
        }
    })
})

// Get all foods
router.route('/').get((request, response) => {
    console.log(request.baseUrl + request.route.path)

    Food.find().select('-__v')
    .then(foods => response.json({success:true, data:foods}))
    .catch(error => response.json({success:false, message:'There was an error'}))
})

// Create food
router.route('/').post((request, response) => {
    console.log(request.baseUrl + request.route.path)

    const food = request.body

    const new_food = new Food(food)

    new_food.save()
    .then(food => response.status(200).json({success: true, data: food}))
    .catch(error => response.json({success:false, message:'There was an error creating the item'}))
})

// Get specific food
router.route('/:foodID').get((request, response) => {
    console.log(request.baseUrl + request.route.path)

    const { foodID } = request.params

    Food.find({_id:foodID}).populate('creator', '-createdAt -updatedAt -__v -password').select('-__v')
    .then(data => response.json({success:true, data:data}))
    .catch(error => response.json({success:false, message:`No object found with ID: ${foodID}`}))
})

// Get all foods created by a specific user
router.route('/users/:creatorID').get((request, response) => {
    console.log(request.baseUrl + request.route.path)

    const {creatorID} = request.params

    Food.find({creator: creatorID}).select('-creator -__v')
    .then(data => response.json({success:true, data: data}))
    .catch(error => response.status(400).json({error:error})) 
})

router.route('/:foodID').delete((request, response) => {
    const { foodID } = request.params

    Food.findByIdAndDelete(foodID, (err) => {
        if (err){
            response.json({success: false})
        }
        else {
            response.json({success: true})
        }
    })
})

module.exports = router