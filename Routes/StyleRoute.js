const express = require('express')
const {addStyle,getStyle} = require('../Controller/StyleController')
const {upload1,verifyext} = require('../Middleware/UserMiddleware')
const  Router = express.Router()
Router.route("/add").post(upload1.single('img'),verifyext,addStyle)
Router.route("/all").get(getStyle)
app.use('/upload', express.static('upload'));

module.exports = Router;

