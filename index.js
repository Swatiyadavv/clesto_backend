const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors= require('cors')
const  UserRoutes  = require('./Routes/UserRoutes')
const StyleRoutes = require('./Routes/StyleRoute')
const ContactRoutes = require('./Routes/ContactRoute')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
var path = require('path')
app.use("/upload",express.static(path.join(__dirname,'upload')))
app.use("/style/upload",express.static(path.join(__dirname,'upload')))
dotenv.config()
const Port = process.env.PORT;
const mongoUrl = process.env.MONGO_URI;

try
{
  mongoose.connect(mongoUrl)
  console.log("database connect");
}
catch(error)
{
    console.log(error);
    
}
app.use("/user",UserRoutes)
app.use("/style",StyleRoutes)
app.use("/contact",ContactRoutes)
// app.use('/',(req,res)=>{
//   res.send(
//     ``
//   )
// })

app.listen(Port,()=>
{
    console.log(`listening on port ${Port}`);
})
