const sequelize= require('sequelize');
const Database_Connection = require('../Database_Connection/connection');

const restaurant =  Database_Connection.define('restaurantDetailTbl',{
    restaurantId:{
        type : sequelize.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    },
    restaurant_Name: sequelize.STRING,
    address : sequelize.STRING,
    total_review : sequelize.INTEGER
});

module.exports = restaurant;