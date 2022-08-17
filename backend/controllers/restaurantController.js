const Resturent = require("../DBmodels/restaurantModel");
const Item = require("../DBmodels/itemModel");
const catchasyncError = require("../middleWare/catchasyncError");
const ApiFeature = require("../utils/apiFeatch");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../DBmodels/userModel");

// register restarunt
exports.register = catchasyncError(async (req,res,next)=>{
    const user = req.user;
    const {name,email,discription,image,phone,address,pincode,category,type} = req.body;
    const isEmailExits = await Resturent.findOne({email});
    if(isEmailExits){
        return next(new ErrorHandler("email already exist restaurant",400));
    }
    const restaurant = await Resturent.create(
        {name,email,discription,image,phone,address,pincode,category,type}
    );
    user.role="restaurantAdmin";
    user.save();
    res.status(200).json({
        success:true,
        restaurant
    });

}) 

// Get A restarunt
exports.getARestaurant = catchasyncError(async (req,res,next)=>{
    let restarunt = await Resturent.findById(req.params.id)
    if(!restarunt || restarunt.verified===false)
        return next(new ErrorHandler("can not find item or your restarunt is not verified yet",404));
    
    res.status(200).json({
        success:true,
        restarunt
    });
})

// Get All restarunt
exports.getAllRestaurant = catchasyncError(async (req,res,next)=>{
    let restarunt = await Resturent.find({verified:true});
    if(!restarunt)
        return next(new ErrorHandler("can not find restarunt",404));
    
    res.status(200).json({
        success:true,
        restarunt
    });
})

// get all items of a rsaturant
exports.getAllItems = catchasyncError(async(req,res,next)=>{
    const rid = req.params.id;
    const restaurant = await Resturent.findById(rid).select("name");
    if(!restaurant){
        return next(new ErrorHandler("restaurant not found",400));
    }
    const items = await Item.find({restaurant:rid});
    res.status(200).json({
        success:true,
        items
    });
    });




// userSchema.find({}, function(err, users) {
//     if (err) throw err;
//     users.forEach(function(u,i){
//     })
//     res.send(JSON.stringify({status:"success",message:"successfully done",data:{jobs:j,users:u}}));
// })









// update restarunt --restaruntAdmin
exports.updateR = catchasyncError(
    async (req,res,next) =>{
        let restarunt = await Resturent.findById(req.params.id);
        if(!restarunt)
        return next(new ErrorHandler("restaurant not found",404));
        restarunt =  await Resturent.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});
        return res.send(restarunt);
    }
)

// delete A restarunt --restaruntAdmin
exports.deleteR = catchasyncError(
    async (req,res,next) => {
        const restarunt = await Resturent.findById(req.params.id);
    
        if(!restarunt)
            return next(new ErrorHandler("Invalid Id",404));
        await restarunt.remove();
        return res.send("restarunt is deleted");
    }
)

// get restarunt by filters
exports.getApiRestaurant = catchasyncError( async (req,res,next) =>{
    const api = new ApiFeature(Resturent.find(),req.query).search().pagination(1)
    const result = await api.query;
    res.send(result);
})

// create review --user
exports.createReview = catchasyncError( async (req,res,next)=>{
    
    const{rating,comment} = req.body;

    const user = await User.findById(req.user.id);
    let resturent = await Resturent.findById(req.params.id);

    if(!user || !resturent)
        return next(new ErrorHandler("item not found",404))
    
    const review = {
        user:user._id,  
        name:user.name,
        rating:Number(rating),
        comment:comment,
        createdAt:Date.now()
    };
    
    const isReviwerd = resturent.reviews.find(
        (rev) => {if(`${rev.user}` === `${user._id}`) return true}
        )
        
        if(isReviwerd){
            resturent.reviews.forEach((rev)=>{
                if(`${rev.user}` === `${user._id}`)
                (rev.rating=rating),(rev.comment = comment)
                // res.send(resturent.reviews);
            })
        }
        else{   
            resturent.reviews.push(review);
            resturent.totalReviews = resturent.reviews.length;
        }
        
        let avg =0;
        resturent.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        resturent.rating = avg/resturent.totalReviews

        await resturent.save({validateBeforeSave:false});

        res.status(200).json({
            review:true,
            userReview:review
        })
})

// get loggedin user review
exports.userReview = catchasyncError(async (req,res,next)=>{

    const user = await  req.user.id;
    const resturent = await Resturent.findById(req.params.id);
    if(!resturent){
        return next(new ErrorHandler("restaurant not found",400));
    }
    const userReview = resturent.reviews.find((rev) => {if(`${rev.user}` === `${user}`) return rev})
    if(userReview){
        res.status(200).json({
            review:true,
            userReview
        })
    }
    else{
        res.status(200).json({
            review:false,
            userReview
        })
    }
})


// get a restarunt review 
exports.getReviews = catchasyncError( async (req,res,next) => {
    const restarunt = await Resturent.findById(req.params.id);
    if(!restarunt)
        return next(new ErrorHandler("item not found"),404)
    res.status(200).json({ 
        success:true,
        reviews:restarunt.reviews});
})

// delete review --user
exports.deleteReview = catchasyncError( async (req,res,next) =>{
    const user = req.user._id;
    let resturent = await Resturent.findById(req.params.id);
    if(!user || !resturent)
    return next(new ErrorHandler("item not found",404));

    const reviews = resturent.reviews.filter((rev)=>`${rev.user}` !== `${user}`)
    let avg=0;
    reviews.forEach((rev)=>avg+=rev.rating)
    
    let ratings =0
    const totalReviews = reviews.length;
    
    if (reviews.length === 0) {
        ratings = 0;
    } 
    else{
        ratings = avg / totalReviews;
    }
    
    resturent = await Resturent.findByIdAndUpdate(
        req.params.id,
        {
            reviews,
            ratings,
            totalReviews
        },
        {
            new: true
        }
        );
        res.send(resturent);
})

// get All pending resturant --admin
exports.getPendingRestaruant = catchasyncError( async (req,res,next)=>{
    const pendingRestaurant = await Resturent.find({verified:false});
    res.status(200).json({
        success:true,
        pendingRestaurant
    });
});

// verifiy a resturant --admin
exports.verifyRestaurant = catchasyncError( async (req,res,next)=>{
    const restarunt = await Resturent.findById(req.params.id);
    if(!restarunt){
        return next(new ErrorHandler("invalid Id",400));
    }
    if(restarunt.verified===true){
        return next(new ErrorHandler("Restaurant is verified",400));
    }
    restarunt.verified=true;
    restarunt.save();
    res.status(200).json({
        success:true,
    });
})


