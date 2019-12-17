const express = require('express')
const routeController = require('../controller/routeController')
const appConfig = require('../config/appConfig')

let setRouter = (app) => {

    let baseUrl = appConfig.apiVersion;

    app.get(baseUrl+'/userlist',routeController.getAllUsers)
    app.post(baseUrl+'/signup',routeController.Signup)
    app.post(baseUrl+'/login',routeController.Login)

}

module.exports = {

    setRouter:setRouter
}