const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    email:
    {
        type:String,
        required:true
    },
    Subject:
    {
      type:String,
      required:true
    },
    message:
    {
        type:String,
        required:true,
        minlength:10,
        maxLength:200
    }
},
{
    timestamps:true
})

const ContactModel = mongoose.model("contact",ContactSchema)
module.exports = ContactModel;