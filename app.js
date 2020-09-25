const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const adminController = require('./controller/admin');
const MONGODB_URI = 'mongodb+srv://Arjun:arjun31@cluster0-ptp5p.mongodb.net/macvita?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine','ejs');
app.set('views','views');

app.get('/',adminController.getindex);
app.get('/additem',adminController.getdetails);
app.post('/additem',adminController.postDetails);
app.get('/showall',adminController.getall);
app.get('/search',adminController.getSearch);
app.post('/search',adminController.postSearch);
app.get('/delete',adminController.getDelete);
app.post('/delete',adminController.postDelete);
app.get('/belowlimit',adminController.getbelowlimit);
app.get('/email', adminController.sendEmail);

mongoose.connect(MONGODB_URI)
.then(result =>{
    console.log('CONNECTED');
    app.listen(7000);
})
.catch(err =>{
    console.log(err);
});
