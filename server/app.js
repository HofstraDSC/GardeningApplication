const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');


const plants = require('./routes/plant');
const users = require('./routes/user');
const index = require('./routes/index');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const mc = mysql.createConnection({
    host: '35.237.100.8',
    user: 'root',
    password: 'hofstradsc2020',
    database: ''
});

mc.connect();

app.use('/plant', plants);
app.use('/user', users);
app.use('/index',index);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});
