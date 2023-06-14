const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');


const app = express();

const sequelize = require('./Database_Connection/connection');
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const AdminRouter = require('./router/AdminRoute')
const UserRouter = require('./router/UserRoute');


//
const usermodule =require('./Models/usertable');
const feedbackmodule =require('./Models/feedBackModel');
const restarunetmodule =require('./Models/restaurantsDetail');


app.use('/restaurant/',AdminRouter);
app.use('/restaurant/',UserRouter);


usermodule.hasMany(feedbackmodule); // user HasMany feedback
restarunetmodule.hasMany(feedbackmodule); // restarunent hasMant feedback




sequelize.sync({force : false})
.then(response=>{
    app.listen(4000);
    console.log("connection successfully");
})
.catch(error=>{
    console.log("Can not connect "+error);
})


