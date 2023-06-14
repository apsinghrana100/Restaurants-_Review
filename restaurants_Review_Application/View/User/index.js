

const tblid = document.getElementById('resturantent_detail');
var popupContainer = document.getElementById('popupContainer');
var closeBtn = document.getElementById('closeBtn');
var feedback = document.getElementById('feedback');
var FeedBtn = document.getElementById('FeedBtn');

async function fetchRestaurantDetail()
{ 
    try {
        const outcome =  await axios.get('//localhost:4000/restaurant/fetchRestaurantDetail');
        console.log(outcome.data.result);
       displayOnScreen(outcome.data.result)
    } catch (error) {
        console.log(error);
    }
    
}

window.addEventListener( 'DOMContentLoaded',async(event)=>{
    console.log("i am clling");
    try {
        const outcome =  await axios.get('//localhost:4000/restaurant/fetchRestaurantDetail');
         console.log(outcome.data.result);
        displayOnScreen(outcome.data.result)
       
      } catch (error) {
          console.log(error);
      }
})

function displayOnScreen(data)
{
     console.log();
    for (let index = 0; index < data.length; index++) {
        let add=`<tr id=${data[index].restaurantId}>   
        <td hidden>${data[index].restaurantId}</td>
        <td>${data[index].restaurant_Name}</td>
        <td>${data[index].address}</td>
        <td><button type="button" onclick=DetailForm('${data[index].restaurantId}','${data[index].restaurant_Name}','${data[index].description}')>Detail</button></td>
        </tr>`;
    
    tblid.innerHTML+=add;
    }
}

async function DetailForm(id,name,description){
    try {
        popupContainer.style.display = 'block';
    
        document.getElementById('hidden').value=id;
        
        document.getElementById('rname').innerText = name;
        document.getElementById('description').innerText = description;
        const token=localStorage.getItem("user");
       const response = await axios.get(`//localhost:4000/restaurant/fetchfeedback?param=${id}`,{headers: {"Authorization":token}})
       console.log(response.data.output);
       displayFeedBackOnScreen(response.data.output);
    } catch (error) {
        console.log(error);
    }
    
}

closeBtn.addEventListener('click', function() {
    popupContainer.style.display = 'none';
  });


  async function addFeedback(event){
        console.log("dddddd"+document.getElementById('hidden').value);

        data={
            feedback : feedback.value,
            restaurant_id :document.getElementById('hidden').value
        }

        const token=localStorage.getItem("user");
        try {
                axios.post("//localhost:4000/restaurant/feedBackMessage",data,{headers: {"Authorization":token}})
        } catch (error) {
            console.log(error);
        }
  }

  function displayFeedBackOnScreen(output){
    for (let index = 0; index < output.length; index++) {
        let li=`<li>${output[index].feedback}</li>`
        document.getElementById('userfeedBack').innerHTML+=li;
        
    }

  }


