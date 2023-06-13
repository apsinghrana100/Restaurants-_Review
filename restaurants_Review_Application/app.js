const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');


const app = express();

const sequelize = require('./Database_Connection/connection');
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const AddDetailRouter = require('./router/AdminRoute')

app.use('/restaurant/',AddDetailRouter);


sequelize.sync({force : true})
.then(response=>{
    app.listen(4000);
    console.log("connection successfully");
})
.catch(error=>{
    console.log("Can not connect "+error);
})


