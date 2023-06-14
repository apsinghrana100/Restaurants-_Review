const sequelize= require('sequelize');
const Database_Connection = require('../Database_Connection/connection');

const feedback =  Database_Connection.define('feedBackTbl',{
    feedbackId:{
        type : sequelize.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    },
    feedback: sequelize.TEXT
   
});

module.exports = feedback;