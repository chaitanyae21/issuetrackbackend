const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const issueSchema = require('../models/issue');
const Issue = mongoose.model('Issue');



let getAllIssues = (req,res) => {
    Issue.find((err,data)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
            
        else
        {
            console.log(data);
            res.send(data);
        }
    })
}

let getIssuebyId = (req,res) => {
    Issue.findById(req.params.id,(err,data)=>{
        if(err)
            console.log(err);
        else
        {
            console.log(data);
            res.json(data);
        }
    })
}

let addIssue = (req,res) => {
    let issue = new Issue({
        title : req.body.title,
        reporter : req.body.reporter,
        description : req.body.description,
        date : req.body.date,
        severity : req.body.severity,
        status : req.body.status,
        assignedTo : req.body.assignedTo,
        watchers:[req.body.reporter,req.body.assignedTo]
    });
    issue.save()
        .then(issue=>{
            res.status(200).json('issue added succesfully');
        })
        .catch(err=>{
            res.status(400).json('failed to create a new record');
        })
    
    
}


let editIssue = (req,res) => {
    Issue.findById(req.params.id,(err,issue)=>{
        if(err){
            console.log(err);
            console.log('could not load document');}
        else
        {
            issue.title = req.body.title;
            issue.reporter = req.body.reporter;
            issue.description = req.body.description;
            issue.date = req.body.date;
            issue.severity = req.body.severity;
            issue.status = req.body.status;
            issue.assignedTo = req.body.assignedTo;
            issue.watchers = req.body.watchers;
            issue.save()
                .then(issue=>{
                       res.status(200).json('Update done');
                })
                .catch(err=>{
                        res.status(400).json('Update failed');
                })
        }
    })
}

let deleteIssue = (req,res) => {
    Issue.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)
            res.json(err);
        else
        {
            res.json('Removed successfully');
        }
    })
}

let editComment = (req,res) => {
    Issue.findById(req.params.id,(err,issue)=>{
        if(err){
            console.log(err);
            console.log('could not load document');}
        else
        {
            issue.comments.push(req.body);
            issue.save()
                .then(issue=>{
                       res.status(200).json('Update done');
                })
                .catch(err=>{
                        res.status(400).json('Update failed');
                })
        }
    })
}

module.exports={
    getAllIssues:getAllIssues,
    getIssuebyId:getIssuebyId,
    addIssue:addIssue,
    editIssue:editIssue,
    deleteIssue:deleteIssue,
    editComment:editComment
}