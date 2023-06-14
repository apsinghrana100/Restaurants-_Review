const Sequelize=require('sequelize');
const connection=require('../Database_Connection/connection');

const user=connection.define('tbluserdetail',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    username:Sequelize.STRING,
    useremailid:{
        type:Sequelize.STRING,
    },
    userpass:Sequelize.STRING


});

module.exports=user;