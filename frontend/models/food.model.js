const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    description:{
        type: String,
        required: false,
        trim: true
    },
    serving_size:{
        serving: {type: Number, required:true},
        serving_unit: {type: String, required:true},
        number_of_servings: {type: Number, default:1}
    },
    nutritional_facts:{
        calories: {
            type: Number, 
            required:true
        },
        total_fat: {
            type:Number,
            default:0
        },
        total_carbohydrates: {
            type:Number,
            default:0
        },
        protein: {
            type:Number,
            default:0
        }
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
    isMeal:{
        type: Boolean,
        default: false
    }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food