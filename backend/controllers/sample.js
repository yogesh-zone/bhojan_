exports.sample = (req,res,next)=>{
    res.status(200).json({
        message:"route is working fine"
    })
}