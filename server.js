require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //views
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.use(session({
    secret :'my secret key',
    saveUninitialized :true,
    resave:false
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//database
require('./config/database');

//controller
const controllerPage = require('./controller/mycontroller');
app.use('/', controllerPage);

//port 
app.listen(process.env.PORT, (req, res) => {
    console.log(`Port working on: http://localhost:${process.env.PORT}`);
});