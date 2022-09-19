const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type:String,
        required: true,
        unique: false,
        trim:true,
    },
    last_name: {
        type:String,
        required: true,
        unique: false,
        trim:true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
        trim:true,
        minLength:6
    },
    password:{
        type: String,
        required: true,
        unique:false,
        minLength: 6
    }

}, {
    timestamps: true
})

const User = mongoose.model('Users', userSchema)

module.exports = User