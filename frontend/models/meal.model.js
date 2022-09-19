const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    food: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food',
        required:true
    },
    current_serving:{
        number_of_servings: Number,
        serving: Number,
        serving_unit: String
    }
})

const mealSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:3
    },
    description:{
        type: String,
        required:false,
        trim:true,
    },
    recipe:[recipeSchema],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    isMeal:{
        type: Boolean,
        default: true
    }
    
})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal