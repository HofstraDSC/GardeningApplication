let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let plants = require('./routes/plant');
let users = require('./routes/user');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/plant', plants);
app.use('/user', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});
