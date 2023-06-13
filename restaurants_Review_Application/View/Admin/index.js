
// AddDetail().addEventListener('click',(event)=>{
//     console.log("hello i am add detail")

// const { default: axios } = require("axios");
// const restaurant = require("../../Models/restaurantsDetail");

// });
const restaurant_Name = document.getElementById('Restaurant_Name');
const restaurant_address = document.getElementById('Restaurant_Address');

async function AddDetail(event){
    
    console.log(restaurant_Name.value)
    restaurant_detail = {
        restaurant_Name : restaurant_Name.value,
        restaurant_address : restaurant_address.value
    }

        axios.post("//localhost:4000/restaurant/addDetail",restaurant_detail)
        .then((response)=>{
            console.log("Data inserted Success");
        })
        .catch((error)=>{
            console.log("error")
        });
}