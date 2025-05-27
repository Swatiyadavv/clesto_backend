const express = require('express')
const {addStyle,getStyle} = require('../Controller/StyleController')
const {upload1,verifyext} = require('../Middleware/UserMiddleware')
const  Router = express.Router()
Router.route("/add").post(upload1.single('img'),verifyext,addStyle)
Router.route("/all").get(getStyle)
module.exports = Router;



// http://localhost:5000/style/upload
// http://localhost:5000/style/add
// http://localhost:5000/style/all