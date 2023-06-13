const restaurantDetailModule = require('../Models/restaurantsDetail.js')

exports.AddDetail = (async(req,res)=>{
    try {
        const restaurant_name= req.body.restaurant_Name;
        const restaurant_address = req.body.restaurant_address;
        console.log(req.body.restaurant_Name)
        output = await restaurantDetailModule.create({ restaurant_Name: restaurant_name, address: restaurant_address });
        console.log(" auto-generated ID:", output.restaurantId);
    } catch (error) {
        console.log(`somwthing went wrong ${error}`);
    }
})