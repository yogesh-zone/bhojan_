const jwt = require("jsonwebtoken");
const User = require("../DBmodels/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchasyncError = require("./catchasyncError");

exports.isAuthenticatedUser = catchasyncError(async (req,res,next)=>{
    const {jwtToken} = req.cookies;

    if(!jwtToken){
        return next( new ErrorHandler("please login to access this resourse",404));
    }

    const decodedData = jwt.verify(jwtToken,process.env.SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    console.log("here is the user", req.user);
    next();
})

exports.authorizeRoles = (...roles) => {
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
};