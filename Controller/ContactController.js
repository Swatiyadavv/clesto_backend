const ContactModel = require('../Model/ContactModel')

const add  = async(req,res)=>
{
    const {email,Subject,message} = req.body;
    try
    {
         if (!email){
        res.status(400).send({message:"email is required"})
      }
      if (!Subject){
        res.status(400).send({message:"Subject is required"})
      }
      if(!message)
      {
        res.status(400).send({message:"Subject is required"})
      }
        let UserData = await ContactModel.findOne({email})
      if(UserData)
       {
         return res.status(404).send({msg:"Message from this email already exist"})
        }
          UserData = await new ContactModel({email,Subject,message}).save();
          res.status(200).send({msg:"Sucess",data:UserData})
    }
    catch(error)
    {
        res.status(404).send({msg:"failed",error:error})
    }
}

const get = async(req,res)=>
{
    try
    {
       let UserData = await ContactModel.find({});
       res.status(200).send({msg:"Sucess",data:UserData})
    }
    catch(error)
    {
        res.status(404).send({msg:"failed",error:error})
    }
}

module.exports = {add,get}