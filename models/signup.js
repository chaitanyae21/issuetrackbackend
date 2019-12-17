const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const signupSchema = new Schema(
{
    userid:{
        type:String,
        default:''
    },        
    
    firstName:{
        type:String
    },

    lastName:{
        type:String
    },

    mobile:{
        type:Number
    },

    email : {
        type:String

    },

    password : {
        type:String
    }
}
);

mongoose.model('Signup',signupSchema);