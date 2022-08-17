const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { sample } = require("../controllers/sample");


router.route("/sample").get(sample);



module.exports=router;