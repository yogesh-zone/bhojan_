const mongoose = require("mongoose");
const validator = require("validator")
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Resturent Name"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:[true,"this Email is already registered"],
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    image:{
        type:String,
        required:[true,"please enter image url"]
    },
    address:{
        type:String,
        required:[true,"Please Enter your Resturent location"]
    },
    pincode:{
        type:String,
        required:[true,"Please Enter Pincode of your area"]
    },
    discription:{
        type:String
    },
    phone:{
        type:String,
        required:[true,"please enter restaurant phone number"]
    },
    category:{
        type:String,
        default:"all"
    },
    type:{
        type:String,
        default:"all"
    },
    verified:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0
    },
    totalReviews: {
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },

            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ]
})

module.exports=mongoose.model("Resturent",restaurantSchema);


