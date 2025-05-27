const express = require('express')
const {Register,Login,forgotPassword,resetPassword,verifyOTP} = require('../Controller/UserController')
const  Router = express.Router()
Router.route("/").post(Register)
Router.route("/login").post(Login)
Router.route("/forgotpassword").post(forgotPassword)
Router.route("/resetPassword/:email").patch(resetPassword)
Router.route("/verifyOTP/:email").post(verifyOTP)

module.exports = Router;