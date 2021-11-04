const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');



require('dotenv').config();

const mongoUrl = process.env.DATABASE_URL;
mongoose.connect(mongoUrl,{ useNewUrlParser: true , useUnifiedTopology: true },()=>{console.log("DB Connected")});

const port = process.env.PORT | 8000 ;
const adminRoutes = require('./Routes/adminRoute');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use('/admin',adminRoutes);

app.get('/',(req,res)=>{
    res.render('Login');
})

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})