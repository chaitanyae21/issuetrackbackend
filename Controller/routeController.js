const express = require('express');
const mongoose = require('mongoose')
const signupschema = require('../models/signup')
const SignupModel = mongoose.model('Signup')
const shortid = require('shortid');


let getAllUsers = (req,res)=> {
    SignupModel.find()
    .select('-v-id')
    .lean()
    .exec((error,result)=>{
        if(error){
            console.log(error)
            res.send(error)
        }
        else if(result==undefined || result==null || result==""){
            console.log('No User Found')
            res.send('No User Found')
        }
        else{
            res.send(result)
        }
    }
    )
}



let Signup = (req,res)=>{
    let id = shortid.generate();
    let newUser = new SignupModel({
        userid:id,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password 
    })

    newUser.save((error,result)=>{
        if(error){
            console.log(error)
            res.send(Response={
                status:0,
                data:error,
                message:'Error in saving to mongo'
                
            })
        }
        else{
            res.send(Response={
                status:200,
                data:result
            })
        }
    })
      
} 

let Login = (req,res)=>{ 
    
    let user={
        email : req.body.email,
        password : req.body.password 
    }
    
        SignupModel.findOne({
            email : user.email
        })
        .select('-v-id')
        .lean()
        .exec((error,result)=>{
            if(error){
                console.log(error)
                res.send(Response={
                    status:0,
                    data:error,
                    message:'Error in mongo'
                    
                })
            }
            else if(result==null||result==undefined||result==""){
                res.send(Response={
                    status:0,
                    data:error,
                    message:'Message not found'      
                })
            }
            else{
                console.log(result)
                res.send(Response={
                    status:200,
                    data:result,
                    message:'Login successful'
                })
            }
        }
        )
    
}

module.exports={
    getAllUsers:getAllUsers,
    Signup:Signup,
    Login:Login
}