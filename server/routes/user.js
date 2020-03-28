// let express = require('express');
// let userRouter = express.Router();

// userRouter.get('/', function(req, res){
// 	console.log('user');
// 	// I don't think this works. Search for res.send
// 	res.body = '<h1>User</h1>';
// });

// module.exports = userRouter;
let express = require('express');



let userRouter = express.Router();

const userModel = require('../models/user.js');

userRouter.post('/register',userModel.register); 

module.exports = userRouter