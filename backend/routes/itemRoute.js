const express = require("express");
const req = require("express/lib/request");
const { createItem, updateItem, deleteItem, getItem, createReviewItem, deleteReviewItem, getReviewsItem, getApiItem, getAlltItem ,userReview} = require("../controllers/itemController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

router
.route("/new/:id")
.post(isAuthenticatedUser,authorizeRoles("restaurantAdmin"),createItem);

router.route("/update/:id").put(isAuthenticatedUser,authorizeRoles("restaurantAdmin"),updateItem)
.delete(isAuthenticatedUser,authorizeRoles("restaurantAdmin"),deleteItem)
.get(getItem);

router
.route("/All")
.get(getAlltItem);


router
.route("/new/review/:id")
.put(isAuthenticatedUser,createReviewItem)
.delete(isAuthenticatedUser,deleteReviewItem)
.get(getReviewsItem);

router
.route("/user/review/:id")
.get(isAuthenticatedUser,userReview);

router
.route("/")
.get(getApiItem);
// router.route("/api/y1/new/review/:id")

module.exports = router;

// Reactstart for rating <Reactstart {...options}/>
// css => scroll-behaviure:smouth (for if we click home then scroll smouth to home)
// react metadata for title