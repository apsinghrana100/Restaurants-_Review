const sequelize= require('sequelize');

const connection=new sequelize("restaurantDB", "root", "root",{
    dialect:'mysql',
    host:'localhost'
})

module.exports=connection;