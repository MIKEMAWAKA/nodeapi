const User = require('../models/User');
const { verifyTokenandAuth, verifyTokenandAdmin } = require('./verifyToken');


const router = require('express').Router();


//edit user
router.put("/:id",verifyTokenandAuth,async (req,res)=>{
  console.log("no data");
  console.log(req.params.id);
  if (req.body.password) {
    req.body.password=CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
      ).toString();
    
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true});
    res.status(200).json(updatedUser);
    
  } catch (error) {
    res.status(500).json(error);

    
  }
});


//Deleted
router.delete('/:id',verifyTokenandAuth,async (req,res)=>{

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("success user deleted");
    
  } catch (error) {
    res.status(500).json(error);
  }
})


//Get user by id
router.get('/:id',verifyTokenandAdmin,async (req,res)=>{
  // console.log("admi500 data");

  try {
   
    // console.log("admi500 data");
   const user= await User.findById(req.params.id);
   const {password, ...others} = user._doc;
    res.status(200).json(others);
    
  } catch (error) {
    res.status(500).json(error);
  }
});


//Get all users
router.get('/',verifyTokenandAdmin,async (req,res)=>{
 
  const query = req.query.new;

  try {
   
    // console.log("admi500 data");
   const users= query? await User.find().sort({_id:-1}).limit(2) : await User.find();
  //  const {password, ...others} = user._doc;
    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json(error);
  }
});


//Get user stats

router.get('/find/stats',verifyTokenandAdmin,async (req,res)=>{
  console.log("ad8000 data");

  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear()-1));
  console.log(lastyear);
  console.log("data s");
  console.log("ad8000 data");
 


  try {
   

    const data =  await User.aggregate([
      { $match: { createdAt:{ $gte:lastyear}} },
      { $project: {
        month:{ $month: "$createdAt"},
      },
    },
      {
        $group:{
          _id: "$month",
          total: {$sum:1},
        },

      }
    ]

    );
   
    
  //  const {password, ...others} = user._doc;
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;