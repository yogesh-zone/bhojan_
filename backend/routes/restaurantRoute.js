const express = require("express");
const { route } = require("express/lib/application");
const { register,getARestaurant, updateR ,deleteR,getApiRestaurant,createReview, deleteReview,getReviews, getPendingRestaruant, verifyRestaurant, getAllRestaurant, userReview,getAllItems} = require("../controllers/restaurantController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");

const router = express.Router();

router
.route("/api/y1/new")
.post(isAuthenticatedUser,register);

router
.route("/api/y1/all")
.get(getAllRestaurant);

router
.route("/api/y1/new/:id")
.put(isAuthenticatedUser,authorizeRoles("restaurantAdmin"),updateR)
.delete(isAuthenticatedUser,authorizeRoles("restaurantAdmin"),deleteR)
.get(getARestaurant);

router
.route("/api/y1/all/items/:id")
.get(getAllItems);


router
.route("/api/y1/new/review/:id")
.put(isAuthenticatedUser,createReview)
.get(getReviews);

router
.route("/api/y1/all/review")


router
.route("/api/y1/user/review/:id")
.get(isAuthenticatedUser, userReview);
router
.route("/api/y1")
.get(getApiRestaurant);

router
.route("/api/y1/deleteReview/:id")
.delete(isAuthenticatedUser,deleteReview)


        // Admin
router
.route("/admin/pending/requests")
.get(isAuthenticatedUser,authorizeRoles("admin"),getPendingRestaruant);

router
.route("/admin/pending/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),verifyRestaurant)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteR);
module.exports = router;


