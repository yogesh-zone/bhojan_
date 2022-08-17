const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have more then 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:[true,"this Email is already registered"],
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password sholud Greater Then 8 Characters"],
        select:false,
    },
    role:{
        type:String,
        default:"user",
    },
    house:{
        type:String,
        default:""
    },
    local:{
        type:String,
        default:""
    },
    sublocal:{
        type:String,
        default:"",
    },
    pincode:{
        type:Number,
    },
    phone:{
        type:Number,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.JWTEXPIRE,
    });
};


// restpassword token
userSchema.methods.getResetPasswordToken = function(){
    // generating Token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
    
    this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;
    return resetToken;
}


module.exports = mongoose.model("User",userSchema);