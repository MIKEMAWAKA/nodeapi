const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    // console.log("hata5 data");
    const autHeader = req.headers.token
    // console.log("hata4 data");

    if (autHeader) {
        // console.log("hata12 data");

        

        const token = autHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if (err) {
                // console.log("hata9 data");
                res.status(403).json("Token is not valid!");
            }else{
                req.user = user;
                // console.log("hata8 data");
                next();

            }

        })
        
    } else {
        return res.status(402).json("Your not authenticated");
        
    }
}
const verifyTokenandAuth = (req,res,next)=>{
    // console.log("shida apaa no4 data");
    // console.log("hata7 ddddata");
  
    verifyToken(req,res,()=>{
        console.log("hata344 data");
        if (req.user.id ===req.params.id || req.user.isAdmin) {
            next()
            
        } else {
            // console.log("hata17 data");
            res.status(403).json("You are not alowed to do that!");
            
        }

    });

}

const verifyTokenandAdmin = (req,res,next)=>{
    // console.log("shida apaa no4 data");
    console.log("hata7 ddddata");
  
    verifyToken(req,res,()=>{
        // console.log("admin data");
        if (req.user.isAdmin) {
            // console.log("admin212 data");
            next()
            
        } else {
            // console.log("hata17 data");
            res.status(403).json("You are not alowed to do that!");
            
        }

    });

}

module.exports = {verifyTokenandAuth,verifyToken,verifyTokenandAdmin};

