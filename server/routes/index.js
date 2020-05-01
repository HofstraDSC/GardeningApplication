const express = require('express');
const indexRouter = express.Router();

// indexRouter.get('/', function(req, res){
// 	res.render('add'); 
// });

indexRouter.get('/',(req,res)=>{
	res.send('Hello World');
});

module.exports = indexRouter;
