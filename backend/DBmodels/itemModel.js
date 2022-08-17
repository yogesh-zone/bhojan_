const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name Of the item"],
        trim:true
    },
    prize:{
        type:String,
        required:[true,"Please Enter Prize of item"],
    },
    image:String,
    discription:{
        type:String
    },
    category:{
        type:String,
        default:"all"
    },
    category02:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    totalReviews: {
        type:Number,
        default:0
    },
    restaurant:{
            type:String,
            required:[true,"Please enter resturant id"],
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

module.exports = mongoose.model("item",itemSchema);