// create token and save into cookie
const sendToken = (user,statuscode,res)=>{
    const token =  user.getJwtToken();
    
    // option for cookies
    const options = {
        expires : new Date(Date.now() + process.env.JWTEXPIRE ),
        httpOnly: true,
    };
    console.log("token",token);
    // save into cookie
    res.status(statuscode).cookie("jwtToken",token,options).json({
        success: true,
        user,
        massege:"user registerd/logged in successfully",
    });
};
module.exports = sendToken;