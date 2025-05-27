const express = require('express')
const {add,get} = require('../Controller/ContactController')
const Router = express.Router();
Router.route('/add').post(add)
Router.route('/get').get(get) 
module.exports = Router;