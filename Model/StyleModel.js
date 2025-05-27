const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
name:
{
    type:String,
    required:true
},
Date:
{
    type:Date,
    required:true
},
img:
{
    type:String,
}}
,{
    timestamps:true
})
const UserModel  = mongoose.model("style",UserSchema)
module.exports = UserModel