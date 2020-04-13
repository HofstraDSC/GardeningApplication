let express = require('express');



let plantRouter = express.Router();

const plantModel = require('../models/plant.js');

plantRouter.get('/all',plantModel.getAll);
plantRouter.post('/removePlant',plantModel.removePlant); 
plantRouter.post('/addPlant',plantModel.registerPlant);
plantRouter.post('/harvest',plantModel.removeUserPlant);
plantRouter.post('/updateWater',plantModel.updateWater);

module.exports = plantRouter;
