let express = require('express');

let userRouter = express.Router();

const userModel = require('../models/user.js');

userRouter.post('/register',userModel.register); 
userRouter.get('/myGardenDiscord/:discordId',userModel.myGarden);
userRouter.get('/myGarden/:userId', async (req, res) =>{
	try{
		const garden = await userModel.myGardenUserId(req.params.userId)
		res.json(garden);
	}catch(error){
		console.log(error);
	}
});
userRouter.get('/hasGarden',userModel.hasGarden);

module.exports = userRouter
