let express = require('express');
let router = express.Router();

router.get('/', function(req, res){
	console.log('plant');
	// I don't think this works. Try looking for res.send
	res.body = '<h1>Plant</h1>';
});

module.exports = router;
