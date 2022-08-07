const router = require('express').Router()
let Meal = require('../models/meal.model')
const verifyJWT = require('../middleware/verifyJWT')

// Update Meal
router.route('/:mealID').put((request, response) => {
    const { mealID } = request.params
    const updated_meal = request.body

    Meal.findByIdAndUpdate(mealID, updated_meal, {new:true}, (error, meal) => {
        if (error){
            response.status(400).json({success:false, message: error})
        }
        else {
            meal.populate('recipe.food')
            .then(m => {
                response.json({success: true, data: meal})
            })
        }
    })

})

// Get all meals 
router.route('/').get((request, response) => {
    console.log(request.baseUrl + request.route.path)

    console.log(request.params)

    Meal.find().select('-__v').populate('recipe.food')
    .then(meals => response.json({success: true, data: meals}))
    .catch(error => response.status(400).json({error: error}))
})

// Get all meals created by a user
router.route('/user/:id').get((request, response) => {
    const { id } = request.params
    
    Meal.find({creator:id}).select('-__v').populate('recipe.food')
    .then(meals => response.json({success: true, data: meals}))
    .catch(error => response.status(400).json({error:error}))
})

// Create Meal
router.route('/').post(verifyJWT, (request, response) => {
    const meal = request.body
    console.log(meal)
    const newMeal = new Meal(meal)

    newMeal.save()
    .then(meal => {
        meal.populate('recipe.food')
        .then(data => 
            response.status(200).json({success: true, data: meal})
        )
    })
    .catch(error => response.status(200).json({error: error}))
})

// Get Specific Meal
router.route('/:id').get((request, response) => {
    const { id } = request.params
    Meal.findOne({_id:id}).select('-__v').populate('recipe.food')
    .then(meal => response.json({success: true, data: meal}))
    .catch(error => response.status(400).json({error: error}))
})

router.route('/:id').delete((request, response) => {
    const { id } = request.params
    Meal.findByIdAndDelete(id, (err) => {
        if (err){
            response.json({success: false})
        }
        else {
            response.json({success: true})
        }
    })
})

module.exports = router