const User = require('../models/User');

const router = require('express').Router();
const crytojs = require('crypto-js');

const jwt = require('jsonwebtoken');

//Register user

router.post('/register',async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:crytojs.AES.encrypt(req.body.password,process.env.PASS_SEC),
      
        
    });
    try {
        const result = await newUser.save();
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
   

})

router.post('/login',async (req,res)=>{

    try {
        const user = await  User.findOne({
            username:req.body.username,
           
          });

         !user && res.status(401).json("Wrong credential");
         const hashedPassword = crytojs.AES.decrypt(user.password,process.env.PASS_SEC).toString(crytojs.enc.Utf8);
          
         hashedPassword  !==req.body.password && res.status(401).json("Wrong credential");
         
         const {password, ...others} = user._doc;
         const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,

         },process.env.JWT_SEC,{expiresIn:"3d"});
         
        res.status(200).json({others,accessToken});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
   

})


module.exports = router;