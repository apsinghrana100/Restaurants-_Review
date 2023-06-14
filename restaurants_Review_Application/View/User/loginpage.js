const loginbutton=document.getElementById('login-btn');
const message=document.getElementById("msg");
// loginbutton.addEventListener('click',loginpage);

function goToPage() {
    window.location.href = "signinpage.htm";
  }
let mes="";
let promise;
async function loginpage(event)
{
    // event.preventDefault();
    const emailid=document.getElementById("user-email").value;
    const password=document.getElementById("user-password").value;
    try {  
        
             if(emailid!==undefined && password!=="" && password!==undefined)
             {
                const userdetail={
                    emailid,
                    password
                };
                try {
                    const abc="ajay";
                    
                    promise=await axios.post("http://localhost:4000/restaurant/loginpage",userdetail)
                    console.log(promise);
                    if(promise.data.success)
                    {
                        // alert("login successfull");
                        console.log(promise.data.userdetail);
                         localStorage.setItem("user",promise.data.userdetail);
                          window.location.href = "index.htm";
                         console.log(promise);
                    }
                   
                    cleardata();
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        let errorMessage = error.response.data.error;
                        mes=errorMessage+"User not found";
                       
                      }else if(error.response && error.response.status === 401){
                        let errorMessage = error.response.data.error;
                        mes=errorMessage;
                      }
                      message.style.backgroundColor="red"; 
                      message.innerText=mes;
                }
                    setTimeout(() => {
                        message.style.display = "none";
                    }, 3000);

                    message.style.display = "block";
           
             }else{
                    console.log("some Field are might be empty");
                    message.style.backgroundColor="red";
                    message.innerText="some Field are might be empty";
                   setTimeout(() => {
                      message.style.display="none";
                  }, 3000);
                  message.style.display = "block";
             }
    } catch (error) {
        console.log(error);
    }
}

function cleardata()
{
    const emailid=document.getElementById("user-email").value="";
    const password=document.getElementById("user-password").value="";
};