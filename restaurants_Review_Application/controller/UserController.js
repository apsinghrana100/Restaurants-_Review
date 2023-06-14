const restaurantDetailModule = require('../Models/restaurantsDetail')
const feedBacklModule = require('../Models/feedBackModel')
const bcrpt=require('bcrypt');
const usermodule=require('../Models/usertable');
const jwt=require('jsonwebtoken');
const sequelize = require('sequelize');

exports.FetchRestaurantDetail = (async(req,res)=>{
    try {
        const result = await restaurantDetailModule.findAll();
         console.log(result);
        res.json({success:true,result});
    } catch (error) {
        console.log(error);
    }
    
});

exports.addFeedback = (async(req,res)=>{
    try {
        const userFeddback= req.body.feedback;
        const Rid = req.body.restaurant_id;
        console.log(req.body.restaurant_Name)
        output = await feedBacklModule.create({ feedback: userFeddback,tbluserdetailId:req.user.id,restaurantDetailTblRestaurantId:Rid});
        restaurantDetailModule.update(
            { total_review: sequelize.literal('total_review + 1') },
            { where: {restaurantId : Rid} }
          )
          .then((response) => {
                console.log("update successfull"+response)
          })
          .catch((error) => {
                console.log(error);
          });
    
        // console.log(" auto-generated ID:", output.restaurantId);
    } catch (error) {
        consolel.log(error);
    }
}) 
//localhost:4000/restaurant/fetchRestaurantDetail

exports.fetchFeedback = (async(req,res)=>{
    try {
        console.log(req.query.param)
        const output = await feedBacklModule.findAll({where:{restaurantDetailTblRestaurantId:req.query.param}});
        console.log(output);
        res.json({success : true,output});
    } catch (error) {
        console.log(error);
    }
})




exports.addUserData=(async(req,res,next)=>{
    
try {
    const pass=req.body.password
    const saltround=10;
    const count=await usermodule.count({where:{useremailid:req.body.emailid}});
    if(count>0)
        {
            console.log("email id duplicate");
            return res.json(true);
        }
        else
        {
            try {
                bcrpt.hash(pass,saltround, async(err,hash)=>{
                    await  usermodule.create({
                        username:req.body.username,
                        useremailid:req.body.emailid,
                        userpass:hash });
                        return res.json(false);
                })
                    
            } catch (error) {
                return res.json(true);
            }
          
        }
} catch (error) {
    console.log(error);
}
});


function detailencry(id,username,premium)// this function through we are encryption aur data with some special keys(secret key)
{
    return jwt.sign({userid:id,username:username,isuserpremium:premium},'sekreteky');
}

exports.logincred=(async(req,res,next)=>{
    console.log("i am login calling");
    console.log("email"+req.body.emailid);
    console.log("password"+req.body.password);
    const passwordtemp=req.body.password;
    const emailtemp=req.body.emailid;
try {
    
    const userdetail=await usermodule.findAll({where:{useremailid:req.body.emailid}});
    console.log("coundt"+userdetail.length);
    
    if(userdetail.length>0)
    {       
            bcrpt.compare(passwordtemp,userdetail[0].userpass,(err,result)=>{
                if(err)
                {
                    console.log("something went wrong");
                    // return res.status(401).send({error:"User not authorized!!"});
                    throw new Error("User not authorized!!");
                }
                if(result===true)
                {
                    // req.session.user=userdetail;
                    console.log("Login successfull");
                    return res.status(200).json({success:true,msg:"Login Successfull",userdetail:detailencry(userdetail[0].id,userdetail[0].username)});
                    //  res.redirect('/addexpense');
                }
                else
                {
                    return res.status(401).send({error:"User not authorized!!"});
                }
                
            })
        
    }
    else
    {
        return res.status(404).send({error:"404 - Not Found"});
    }
} catch (error) {
    console.log(error);
}
   
});


// restaurant/fetchfeedback

