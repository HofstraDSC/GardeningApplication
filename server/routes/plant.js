let express = require('express');



let plantRouter = express.Router();

const plantModel = require('../models/plant.js');

plantRouter.get('/all',plantModel.getAll);
plantRouter.post('/removePlant',plantModel.removePlant); 
plantRouter.post('/addPlant',plantModel.registerPlant);
plantRouter.post('/harvest',plantModel.removeUserPlant);
	//local mysql db connectionS
	
	// console.log('plant');
	// // I don't think this works. Try looking for res.send
	// res.send("Select a Plant from the following list");
	// const plantList = sql.query("SELECT PlantId FROM `default`.plants WHERE PlantName = \'Cucumber\' ",function(err,result){
	// 	if (err) throw err;
	// 	console.log(plantList); // good
	//  })
	// // const getCircularReplacer = () => {
	// // 	const seen = new WeakSet();
	// // 	return (key, value) => {
	// // 	  if (typeof value === "object" && value !== null) {
	// // 		if (seen.has(value)) {
	// // 		  return;
	// // 		}
	// // 		seen.add(value);
	// // 	  }
	// // 	  return value;
	// // 	};
	// //   };
	  
	// // const finalList = JSON.stringify(plantList, getCircularReplacer());
	// // console.log(finalList);
	// // //res.send(plantList);

module.exports = plantRouter;
