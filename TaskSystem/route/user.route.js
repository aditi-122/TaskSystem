const express = require("express");
const UserRoute = express.Router();
const UserController= require("../controllers/user.controller");
const authMw = require("../middlewares/auth.mdw");
UserRoute.post("/signup",authMw,UserController.signup);
UserRoute.post("/login",authMw,UserController.login);
 module.exports = UserRoute;
