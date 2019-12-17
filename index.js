const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const routes = require('./routes/routes');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

let routespath = './routes'
fs.readdirSync(routespath).forEach(function (file) {
    if(~file.indexOf('.js')){
        let route = require(routespath + '/' + file);
        route.setRouter(app);
    }
});

let modelspath = './models'
fs.readdirSync(modelspath).forEach(function (file) {
    if(~file.indexOf('.js')){
        let model = require(modelspath + '/' + file);
    }
});



    
app.listen(appConfig.port,()=> {
    console.log('app is listening on port 3000')
    let db = mongoose.connect(appConfig.db.uri,{useNewUrlParser:true})
});

mongoose.connection.on('open',function (err){
    if(err)
        console.log("database error");
    else
    console.log("connection established"); 
    
})