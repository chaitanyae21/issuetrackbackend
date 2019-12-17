const express = require('express')
const issueController = require('../controller/issueController')
const appConfig = require('../config/appConfig')

let setRouter = (app) => {

    let baseUrl = appConfig.apiVersion;

    app.get('/issues', issueController.getAllIssues);
    app.get('/issues/:id', issueController.getIssuebyId);
    app.post('/issues/add',issueController.addIssue);
    app.put('/issues/update/:id',issueController.editIssue);
    app.put('/issues/update/comment/:id',issueController.editComment);
    app.get('/issues/delete/:id',issueController.deleteIssue);
    
}

module.exports = {

    setRouter:setRouter
}