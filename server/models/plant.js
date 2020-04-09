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
		console.log(data);
		res.json({ plants: data });
	}
	catch (err) { console.log(err) }
}

plants.removePlant = async (req, res) => {
	let query = `SELECT PlantId, PlantName, PlantType, WaterFreq, WaterNeeded
	FROM \`default\`.plants WHERE PlantId = ${sql.con.escape(req.body['plantId'])}`;
	try{
		let data = await sql.con.query(query);
		if(data.length){
			query = `DELETE FROM \`default\`.userplants
			WHERE PlantId = ${sql.con.escape(req.body['plantId'])}`;
			try{
				await sql.con.query(query);
			}
			catch (err) { console.log(err) }
			query = `DELETE FROM \`default\`.plants WHERE PlantId=${sql.con.escape(req.body['plantId'])};`;
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
	let query = `SELECT UserId, PlantId, PosX, PosY, LastWatered 
	FROM \`default\`.userplants 
	WHERE PosX = ${sql.con.escape(req.body['posX'])} 
	AND PosY = ${sql.con.escape(req.body['posY'])};`;
	console.log(validatePlant(req.body['plantId']))
	const validPlantId =  await validatePlant(req.body['plantId']);
	console.log("Valid Plant Id: "+ validPlantId);
	if(validPlantId){
		try {
			let data = await sql.con.query(query);
		
			if(!data.length) {
				query = `INSERT INTO \`default\`.userplants (UserId, PlantId, PosX, PosY, LastWatered) 
				VALUES(\'${sql.con.escape(req.body['userId'])}\', ${sql.con.escape(req.body['plantId'])}, ${sql.con.escape(req.body['posX'])}, ${sql.con.escape(req.body['posY'])}, \'${sql.con.escape(req.body['lastWatered'])}\');`;
				try {
					data = await sql.con.query(query);
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
	else{
		res.json("Plant Id is not valid please select another Id that is valid.")
	}
}

plants.removeUserPlant = async (req, res) => {
	query = `SELECT UserId, PlantId, PosX, PosY, LastWatereD 
	FROM \`default\`.userplants 
	WHERE UserId=${sql.con.escape(req.body['userId'])}
	AND PosX=${sql.con.escape(req.body['posX'])}
	AND PosY=${sql.con.escape(req.body['posY'])}`;
	try {
		let data = await sql.con.query(query);
		if (data.length) {
			query = `DELETE FROM \`default\`.userplants 
			WHERE UserId=${sql.con.escape(req.body['userId'])} 
			AND PosX=${sql.con.escape(req.body['posX'])} 
			AND PosY=${sql.con.escape(req.body['posY'])};`;
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

plants.updateWater = async ( req, res ) => {
	let query = `UPDATE \`default\`.userplants
	SET LastWatered=\'${req.body['time']}\'
	WHERE UserId=${sql.con.escape(req.body['userId'])} AND PosX=${sql.con.escape(req.body['posX'])} AND PosY=${sql.con.escape(req.body['posY'])};`;
	try{
		await sql.con.query(query);
		res.json("Success")
	}
	catch( err ) {console.log( err )}
}






async function validatePlant(plantId){
	const query = `SELECT *
	FROM \`default\`.plants
	WHERE PlantId = ${sql.con.escape(plantId)};`;
	try{
		const data = await sql.con.query(query);
		console.log("Data Length: " + data.length);
		console.log("Data: " + data);
		if(data.length) return true;
		else return false;
	}
	catch( err ) {console.log(err) }
	
}


module.exports = plants;