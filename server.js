const express = require('express')
const app = express()
require('dotenv').config()
const PORT = 4040
const cors = require('cors')
const model = require('./user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.myMongoUrl)
app.post('/api/register',async (req,res)=>{
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try{
        const user = await model.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        res.json({status:'ok'})
    }catch(err){
        res.json({status:'Duplicate Email'})

    }
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.password);
})

app.post('/api/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await model.findOne({email:email,password:password})
    if(user){
        res.json({status:'ok',message:'logged in'})
    }else{
        res.json({status:'Wrong Email or Password'})
    }
})
app.listen(PORT,()=>console.log('server started on port ' + PORT))