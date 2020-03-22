let express = require('express');
let router = express.Router();

router.get('/', function(req, res){
	console.log('user');
	// I don't think this works. Search for res.send
	res.body = '<h1>User</h1>';
});

module.exports = router;
