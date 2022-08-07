const router = require('express').Router()
let Food = require('../models/food.model')
let Meal = require('../models/meal.model')

router.route('/:creatorID').get((request, response) => {
    console.log(request.baseUrl + request.route.path)

    const { creatorID } = request.params

    Promise.all([
        Food.find({creator: creatorID}).select('-__v'),
        Meal.find({creator: creatorID}).select('-__v').populate('recipe.food'),
        Meal.find({creator: {"$ne": creatorID}}).select('-__v').populate('recipe.food'),
        Food.find({creator: {"$ne": creatorID}}).select('-__v'),
    ])
    .then(([myFoods, myMeals, meals, foods]) => response.status(200).json({
        success:true, 
        data:{
            myFoods: myFoods,
            myMeals: myMeals,
            meals: meals,
            foods: foods
        }
    }))
    .catch(error => response.status(400).json({success: false}))
})

module.exports = router