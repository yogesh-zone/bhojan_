const Item = require("../DBmodels/itemModel");
const Restuarant = require("../DBmodels/restaurantModel");
const User = require("../DBmodels/userModel");
const catchasyncError = require("../middleWare/catchasyncError");
const ApiFeature = require("../utils/apiFeatch");
const ErrorHandler = require("../utils/errorHandler");

// create Item --restaurantAdmin
exports.createItem = catchasyncError(async (req,res,next) =>{
    const resturant = await Restuarant.findById(req.params.id);
    if(!resturant) 
        return next(new ErrorHandler("item not found",404));
    const newData = req.body;
    newData.restaurant=`${resturant._id}`;

    const item = await Item.create(newData);
    return res.status(200).json({
        success:true,
        item,
        message:"items created successfully",
    });

});

// update Item --restaurantAdmin
exports.updateItem = catchasyncError(async (req,res,next) =>{
    let item = await Item.findById(req.params.id);

    if(!item)
        return next(new ErrorHandler("item not found",404));
    item = await Item.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).json({
        success:true,
        item,
        message:"items updated successfully"
    });
}) 

// delete Item --restaurantAdmin
exports.deleteItem = catchasyncError(async (req,res,next) =>{
    const item = await Item.findById(req.params.id);
    if(!item)
        return next(new ErrorHandler("item not found",404));
    await item.remove();
    return res.status(200).json({
        success:true,
        message:"items removed successfully"
    });
});

// get item by filter
exports.getApiItem = catchasyncError( async (req,res,next) =>{
    const api = new ApiFeature(Item.find().select("-reviews"),req.query).search()//.pagination(1)
    const result = await api.query;
    res.send(result);
})

// get a item
exports.getItem = catchasyncError( async (req,res,next)=>{
    const item = await Item.findById(req.params.id).select("-reviews");

    if(!item)
        return next(new ErrorHandler("item not found",404));

    return res.status(200).json({
        success:true,
        item
    });
})

// get all item
exports.getAlltItem = catchasyncError( async (req,res,next)=>{
    const items = await Item.find().select("-reviews");

    if(!items)
        return next(new ErrorHandler("item not found",404));

    return res.status(200).json({
        success:true,
        items
    });
})


// create review --login
exports.createReviewItem = catchasyncError( async (req,res,next)=>{
    const{rating,comment} = req.body;
    const Itemid = req.params.id;
    const user = await User.findById(req.user.id);
    let item = await Item.findById(Itemid);
    
    if(!user || !item)
        return next(new ErrorHandler("item/user not found",404))
    
    const review = {
        user:user._id,  
        name:user.name,
        rating:Number(rating),
        comment:comment,
        createdAt: Date.now()
    };
    
    const isReviwerd = item.reviews.find(
        (rev) => {if(`${rev.user}` === `${user._id}`) return true}
        )
        
        if(isReviwerd){
            item.reviews.forEach((rev)=>{
                if(`${rev.user}` === `${user._id}`)
                (rev.rating=rating),(rev.comment = comment)
                // res.send(item.reviews);
            })
        }
        else{   
            item.reviews.push(review);
            item.totalReviews = item.reviews.length;
        }
        
        let avg =0;
        item.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        let numb = avg/item.totalReviews;
        item.rating = numb.toFixed(1);

        await item.save({validateBeforeSave:false});
        res.status(201).json({
            review:true,
            userReview:review
        });
});

// get loggedin user review
exports.userReview = catchasyncError(async (req,res,next)=>{

    const user = await  req.user.id;
    const item = await Item.findById(req.params.id);
    if(!item){
        return next(new ErrorHandler("item not found",400));
    }
    const userReview = item.reviews.find((rev) => {if(`${rev.user}` === `${user}`) return rev})
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

// get items all reviews
exports.getReviewsItem = catchasyncError( async (req,res,next) => {
    let item = await Item.findById(req.params.id).select("reviews");
    if(!item)
    return next(new ErrorHandler("item not found"),404)
    res.status(200).json({
        success:true,
        reviews:item.reviews});
})

// delete A review --login
exports.deleteReviewItem = catchasyncError( async (req,res,next) =>{
    const user = await User.findById(req.user.id);
    let item = await Item.findById(req.params.id);

    if(!user || !item)
        return next(new ErrorHandler("item not found",404))

    const reviews = item.reviews.filter((review)=>`${review.user}` !== `${user._id}`)
    let avg=0;
    reviews.forEach((review)=> avg+=review.rating)
    
    let rating =0
    const totalReviews = reviews.length;
    
    if (reviews.length === 0) {
        rating = 0;
    } 
    else{
        rating = avg / totalReviews;
    }
    
    await Item.findByIdAndUpdate(
        item._id,
        {
            reviews,
            rating,
            totalReviews
        },
        {
            new: true
        }
        );
        res.status(200).send("review has been deleted");
})
