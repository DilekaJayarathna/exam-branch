
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const config = require('./config/database');
const users = require('./routes/users');
const exams = require('./routes/exams');
const regexams = require('./routes/regexams');
const repexams = require('./routes/repexams');

const connection = mongoose.connect(config.database);
if(connection){
    console.log('database connected');
}else{
    console.log('database not connected');
}

app.use(express.static(path.join(__dirname,"public")));

app.use('/users', users);
app.use('/exams',exams);
app.use('/regexams',regexams);
app.use('/repexams',repexams);

app.get('/',(req,res)=>{
    res.send('hello..');
});

app.listen(3000, ()=> {
   console.log('listening to port: '+ port);
});
