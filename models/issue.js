const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let issueSchema = new Schema({
    title:{
        type:String
    },
    reporter:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    severity:{
        type:String
    },
    status:{
        type:String,
        default:'Open'
    },
    assignedTo:{
        type:String
    },
    comments:{
        type:Array,
        default:null
    },
    watchers:{
        type:Array,
        default:null
    }
});

mongoose.model('Issue',issueSchema);