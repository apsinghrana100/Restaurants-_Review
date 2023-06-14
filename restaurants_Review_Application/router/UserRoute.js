const express = require('express');
const Router = express.Router();

const controller = require('../controller/UserController')
const auth = require('../middleware/auth');

Router.get('/fetchRestaurantDetail',controller.FetchRestaurantDetail);
Router.post('/feedBackMessage',auth.authenticate, controller.addFeedback);
Router.get('/fetchfeedback',auth.authenticate, controller.fetchFeedback);
Router.post('/signuppage', controller.addUserData);
Router.post('/loginpage', controller.logincred);
//localhost:4000/restaurant/fetchRestaurantDetail
// restaurant/fetchfeedback
module.exports=Router;