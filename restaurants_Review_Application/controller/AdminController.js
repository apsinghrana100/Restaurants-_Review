const restaurantDetailModule = require('../Models/restaurantsDetail.js')

exports.AddDetail = (async(req,res)=>{
    try {
        const restaurant_name= req.body.restaurant_Name;
        const restaurant_address = req.body.restaurant_address;
        const Restaurant_description = req.body.Restaurant_description
        console.log(req.body.restaurant_Name)
        output = await restaurantDetailModule.create({ restaurant_Name: restaurant_name, address: restaurant_address,description : Restaurant_description });
        console.log(" auto-generated ID:", output.restaurantId);
        res.json({success:true,msg:"insert Successfully"});
    } catch (error) {
        console.log(`somwthing went wrong ${error}`);
    }
})