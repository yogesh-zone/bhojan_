const User = require("../DBmodels/userModel");
const catchasyncError = require("../middleWare/catchasyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmails");
const crypto = require("crypto");


// Register a user
exports.newU = catchasyncError(
    async (req,res,next)=>{
    
        const {name,email,password} = req.body;
        // console.log("cpassword",cpassword);
        // if(password!==cpassword){
        //     return next(new ErrorHandler("password does not matched",400));
        // }
        const u = await User.findOne({email});
        if(u){
            return next(new ErrorHandler("you already have a account here",400));
        }
        const user = await User.create({
            name,
            email,
            password
        });
        if(!user)
            return next(new ErrorHandler("something went wrong",400));
        console.log("hello");
        sendToken(user,201,res);
    }
)

// login user
exports.Login = catchasyncError(
    async (req,res,next)=>{
        const {email,password} = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("please enter your email and password",404));
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            console.log("helo world");
            return next(new ErrorHandler("Invalidd email or password",404));
        }
        const isPasswordMatched = await user.comparePassword(password);
    
        if(!isPasswordMatched)
            return res.status(404).json({
                success : "false",
                message : "Invalid email or password "
            })
        
         sendToken(user,201,res);
    }
)

// Get User Detail / load user
exports.getUserDetails = catchasyncError(async (req, res, next) => {
    console.log("here we go into load user backend");
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  });

// log out user
exports.Logout = catchasyncError( async (req,res,next)=>{
    console.log(req.user);
    res.clearCookie("jwtToken");
    res.status(200).json({
        success:"true",
        message:"logout successfully"
    })
})

// forgot password
exports.ForgotPassword= catchasyncError( async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/users/password/reset/${resetToken}`;

    const message  = `Your password reset token is :- ${resetPasswordUrl} \n\n If youhave not requested this email then,please ignore it.`;

    console.log(message);
    try{
        const mail = {
            email:user.email,
            subject:"Bhjon app Password Recovery",
            message,
        }
        await sendEmail(mail);

        res.status(200).json({
            success:true,
            message:"mail send successfully",
        })
    }catch(e){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(e.message,500));
    }
});

// reset password
exports.ResetPassword = catchasyncError( async (req,res,next) => {
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if(!user){
      return  next(new ErrorHandler("Reset Token is invalid or has been expired",400));
    }
    if(req.body.password !== req.body.comfirmPassword){
        return next(new ErrorHander("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// update user password
exports.UpdatePassword = catchasyncError( async (req,res,next)=>{
    const {oldPassword,password,confirmPassword} = req.body;
    const user = await User.findById(req.user.id).select("+password");
    console.log(oldPassword);
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect ",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }
    user.password = password;
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
    });
    // sendToken(user,200,res);
})

// update user profile
exports.UpdateProfile = catchasyncError( async (req,res,next)=>{
    const newUserData = req.body;
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    console.log(req.body);

    res.status(200).json({
        success:true,
        user
    }) 
});

// ADMIN get all users
exports.GetAllUsers = catchasyncError( async (req,res,next)=>{
    const allUsers = await User.find();
    res.status(200).json({
        success:true,
        message: "Users Get Successfully",
    });
})

//ADMIN get single user
exports.GetUser = catchasyncError( async (req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
        return next(new ErrorHandler("invalid Id",400));
    }
    res.status(200).json({
        success:true,
        message: "User Get Successfully",
    });
});

//ADMIN delete user
exports.DeleteUser = catchasyncError( async (req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
        return next(new ErrorHandler("invalid Id",400));
    }
    user.remove();
    res.status(200).json({
        success:true,
        message: "User Deleted Successfully"
    });
});

// change role of a user ---ADMIN
exports.ChangeRole = catchasyncError( async (req,res,next)=>{
    const newUserData = {
        role:req.body.role
    }
    const id = req.params.id;
    console.log()
    const user = await User.findByIdAndUpdate(id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if(!user){
        return next(new ErrorHandler("invalid Id",400));
    }
    res.status(200).json({
        success:true,
        user
    });
});