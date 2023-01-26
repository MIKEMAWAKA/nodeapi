const express = require('express');
const app = express();
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const productRoute = require('./routes/products');

app.use(express.json());

const authRoute = require('./routes/auth')
dotenv.config();


const db_url= process.env.MONGO_URL;

const mongoose = require('mongoose');

mongoose.connect(db_url).then(()=>{
   console.log("db connected successs full") ;
}).catch((err)=>{
    console.log(err) ;
});

// app.get("/api/test",()=>{
//     console.log("test is success")

// });

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);


app.listen(process.env.PORT || 3000,()=>{
    console.log("Backend serve is running! ");
});

