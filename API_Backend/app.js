const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const middleware = require('./middleware');


require('dotenv').config();

const mongoUrl = process.env.DATABASE_URL;
mongoose.connect(mongoUrl,{ useNewUrlParser: true , useUnifiedTopology: true },()=>{console.log("DB Connected")});

const port = process.env.PORT | 8000 ;
const adminRoutes = require('./Routes/adminRoute');
const indexRoutes = require('./Routes/index');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


app.use('/', indexRoutes);
app.use('/admin', middleware.isAdmin, adminRoutes);



//Error handler
// app.use((err,req,res,next)=>{
//     const {status = 500, message='Something Went Wrong'} = err;
//     res.status(status).send(message);
//     //console.log(err);
// })

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})

