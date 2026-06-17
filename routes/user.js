const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const { saveRedirectedUrl } = require("../middleware");
const usersController = require("../controllers/users");

router.route("/signup")
.get(usersController.signUpForm)
.post(usersController.signUp);

router.route("/login")
.get(usersController.loginForm)
.post(saveRedirectedUrl,
    passport.authenticate("local", { 
        failureRedirect : '/login', 
        failureFlash : true 
    }) , usersController.login);

router.get("/logout", usersController.logout);


module.exports = router;
