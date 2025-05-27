const  UserModel = require('../Model/UserModel')
const {createHmac} = require('crypto')
const {otp, sentOtp } = require('../utils/helper')

const Register = async(req,res)=>
{
   const {email,password,confirmPassword} = req.body;
   try
   {
      if (!password){
        res.status(400).send({message:"Password is required"})
      }
      if(!confirmPassword)
      {
        res.status(400).send({message:"Password is required"})  
      }

      let UserData = await UserModel.findOne({email})
      if(UserData)
      {
        res.status(400).send({message:"Email already exists please login"})
      }
       else
       {
        UserData = await new UserModel({email,password,confirmPassword}).save();
        res.status(200).send({message:"Account created",data:UserData})
       }
   }
   catch(error)
   {
    res.status(404).send({message:"Failed",data:error})
   }
}
const Login = async(req,res)=>
{
   const{email,password} = req.body;
   try
   {
      if (!email){
        res.status(400).send({message:"email is required"})
      }
      if (!password){
        res.status(400).send({message:"Password is required"})
      }
      const token = await UserModel.matchPassword(email,password)
      {
         res.status(200).send({message:"Login Success",data:{token:token}})
      }
   }
      catch(error)
   {
    res.status(404).send({message:"Failed",error:error})
    console.log(error);
   }
}

const verifyOTP = async(req,res)=>
{
   const{email} = req.params;
   const {otp} = req.body;
   try
   {
      if (!otp){
        res.status(400).send({message:"otp is required"})
      }  
    let userdata = await UserModel.findOne({email});
    if(userdata.otp === otp)
    {
      res.status(200).send({ message: "otp verified !", data: userdata });
    } else {
      res.status(400).send({ message: "OTP doesn't match ! ", data: "" });
    }
    }
   catch (error) {
      res
        .status(400)
        .send({ message: "request   Failed ! ", data: "", error: error });
    }
}
const forgotPassword = async(req,res)=>
{ 
   const{email} = req.body;
     try
     {
      let user = await UserModel.findOne({email})
      if(!user)
      {
         res.status(400).send({message: "email not found"})
      }
      else
      {
        let code = otp(6)
        console.log(code);
        let data = await UserModel.updateOne(
         {email:user.email},
         {$set:{otp:code}}
        );
        sentOtp(user.email,code);
        res.status(200).send({ message: "otp sent !", data: data });
      }
     }
     catch (error) {
      res
        .status(400)
        .send({ message: "request   Failed ! ", data: "", error: error });
    }
}
const resetPassword = async(req,res)=>
{
   const { email } = req.params;
   const{password} = req.body;
   try
   {
       if (!email){
        res.status(400).send({message:"email is required"})
      }
      if (!password){
        res.status(400).send({message:"Password is required"})
      }
       const salt = "password";
       const hashpassword = createHmac('sha256',salt).update(password).digest('hex')
       let data = await UserModel.updateOne(
         {
            email:email,
         },
         {$set:{password:hashpassword}}
       )
       res.status(200).send({ message: "password updated !", data: data });
   }
   catch (error) {
      res
        .status(400)
        .send({ message: "Password doesnot match ! ", data: "", error: error });
    }
}
module.exports = {Register,Login,verifyOTP,forgotPassword,resetPassword}