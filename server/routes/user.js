let express = require('express');

let userRouter = express.Router();

const userModel = require('../models/user.js');

userRouter.post('/register',userModel.register); 
userRouter.get('/myGarden/:userId',userModel.myGarden);
userRouter.get('/hasGarden',userModel.hasGarden);

module.exports = userRouter