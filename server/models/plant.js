const db = require('./database');
const sql = require('../models/database.js');
const plants = {};

/**
 * Used to get the list of all available plants supported by this application.
 */
plants.getAll = async (req, res) => {
	const query = "SELECT * FROM `default`.plants";
	try {
		let data = await sql.con.query(query);
		console.log(data[0]);
		res.json({ plants: data });
	}
	catch (err) { console.log(err) }
}

plants.removePlant = async (req, res) => {
	let query = `SELECT PlantId, PlantName, PlantType, WaterFreq, WaterNeeded
	FROM \`default\`.plants WHERE PlantId = ${req.body['plantId']}`;
	try{
		let data = await sql.con.query(query);
		if(data.length){
			query = `DELETE FROM \`default\`.userplants
			WHERE PlantId = ${req.body['plantId']}`;
			try{
				await sql.con.query(query);
			}
			catch (err) { console.log(err) }
			query = `DELETE FROM \`default\`.plants WHERE PlantId=${req.body['plantId']};`;
			try {
				let data = await sql.con.query(query);
				res.json("Success");
			}
			catch (err) { console.log(err) }
		}
		else{
			res.json("There is no plant with that plantId. Please try again with a different Id.")
		}
	}
	catch (err) { console.log(err) }



	
}

plants.registerPlant = async (req, res) => {
	const query = `SELECT UserId, PlantId, PosX, PosY, LastWatered 
	FROM \`default\`.userplants 
	WHERE PosX = ${req.body['posX']} 
	AND PosY = ${req.body['posY']};`;
	try {
		let data = await sql.con.query(query);
		console.log(data.length);
		console.log(data);
		if (!data.length) {
			const query = `INSERT INTO \`default\`.userplants (UserId, PlantId, PosX, PosY, LastWatered) 
			VALUES(\'${req.body['userId']}\', ${req.body['plantId']}, ${req.body['posX']}, ${req.body['posY']}, \'${req.body['lastWatered']}\');`;
			try {
				let data = await sql.con.query(query);
				res.json("Success");
			}
			catch (err) { console.log(err) }
		}
		else {
			res.json("Plant already exists at the location specified.  Please select a new X and/or Y value(s).");
		}
	}
	catch (err) { console.log(err) }

}

plants.removeUserPlant = async (req, res) => {
	query = `SELECT UserId, PlantId, PosX, PosY, LastWatereD 
	FROM \`default\`.userplants 
	WHERE UserId=${req.body['userId']}
	AND PosX=${req.body['posX']}
	AND PosY=${req.body['posY']}`;
	try {
		let data = await sql.con.query(query);
		if (data.length) {
			query = `DELETE FROM \`default\`.userplants 
			WHERE UserId=${req.body['userId']} 
			AND PosX=${req.body['posX']} 
			AND PosY=${req.body['posY']};`;
			try {
				let data = await sql.con.query(query);
				res.json("Success");
			}
			catch (err) { console.log(err) }
		}
		else{
			res.json("There is no plant at this location. Please make sure the location entered is correct.")
		}

	}
	catch(err) { console.log(err) }
	
}


module.exports = plants;