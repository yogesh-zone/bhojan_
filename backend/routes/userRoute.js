const express = require("express")
const { Login, newU, Logout, ForgotPassword, ResetPassword, UpdatePassword, UpdateProfile, GetAllUsers, GetUser, DeleteUser, ChangeRole, getUserDetails } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

router
.route("/api/y1/register")
.post(newU);

router
.route("/api/y1/login")
.post(Login);

router
.route("/api/y1/logout")
.get(isAuthenticatedUser,Logout);

router
.route("/api/y1/me")
.get(isAuthenticatedUser,getUserDetails);

router
.route("/api/y1/forgot")
.post(ForgotPassword);

router
.route("/api/y1/update")
.put(isAuthenticatedUser,UpdatePassword);

router
.route("/password/reset/:token")
.put(ResetPassword);  

router
.route("/me/update")
.put(isAuthenticatedUser,UpdateProfile);

//Only ADMIN 
router
.route("/admin/users")
.get(isAuthenticatedUser,authorizeRoles("admin"),GetAllUsers);

router
.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),GetUser)
.delete(isAuthenticatedUser,authorizeRoles("admin"),DeleteUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),ChangeRole);


module.exports = router;