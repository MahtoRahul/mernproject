const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");


require("../db/connect");
const User = require("../schema/userschema"); 


router.get("/" ,(req,res) => {
    res.send("hello world from the server router");
 });

       //promises
//  router.post("/register", (req,res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if( !name || !email || !phone || !work || !password || !cpassword){
//         return res.json({error:"plz fill the field properly"});
//     }

//     user.findOne({email: email})
//     .then((userexist) => {
//         if(userexist) {
//             return res.status(422).json({ error : "user already exist"});
//         }

//         const users = new user({ name, email, phone, work, password, cpassword });

//         users.save().then(() => {
//             res.status(201).json({message:"user registered successfully" });

//         }).catch((err) => res.status(500).json({ error : "failed to registered "}));
    
//     }).catch(err =>  { console.log(err); })
  
//  });


     // async await
router.post("/register", async (req,res) => {
    
    const { name, email, phone, work, password, cpassword } = req.body;

    if( !name || !email || !phone || !work || !password || !cpassword){
       return res.json({error:"plz fill the field properly"});
    }
    try{
        const userexist = await User.findOne({email: email});

        if(userexist) {
            return res.status(422).json({error:"user already exist"});
        } else if(password != cpassword){
                 return res.status(422).json({error:"password not matching"});
        } else {
            const users = new User({ name, email, phone, work, password, cpassword });
        await users.save();
        res.status(201).json({message:"user registered successfully" });
        console.log("user registered successfully");
        }
       

    }catch(err) {
        console.log(err);
       }

});        

 

 router.post("/signin", async ( req,res)  => {

   try {
       const {email , password} = req.body;
       
       if(!email  || !password) {
           return res.status(400).json({error:"plz fill yhe credentials properly"});
       }

       const userLogin = await User.findOne({email:email});

       // console.log(userLogin);


       if (userLogin) {

        const isMatch = await bcrypt.compare(password , userLogin.password);

        const token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken" , token , {
            expires:new Date (Date.now()+25892000000),
            httpOnly:true
        });

        if(!isMatch) {
            res.status(400).json({error:"invalid credentials"});
        } else {
            res.status(201).json({message:"user signin successfully"});
        }
        }
        else {
            res.status(400).json({error:"invalid credentials"});
        }
            

   } catch (err)  {
       console.log(err);
      }
 });

 module.exports = router;