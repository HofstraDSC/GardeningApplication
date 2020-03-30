const db = require('./database');
const sql = require('../models/database.js');
const users = {};
const myGarden = {};


/**
 * Used to register for the app.  userName , discordId MUST be passed CASE SENSITIVE.
 */
users.register = async (req,res) =>{
	let query = `SELECT UserId, UserName, DiscordId FROM \`default\`.users WHERE UserName = "${req.body['userName']}" OR DiscordId = ${req.body['discordId']};`;
	try{
		let data = await sql.con.query(query);
		console.log(data.length);
		console.log(data);
		if(!data.length){
			query = `INSERT INTO \`default\`.users (UserName, DiscordId) VALUES(\'${req.body['userName']}\', ${req.body['discordId']});`;
			try{
				data = await sql.con.query(query);
				res.json("Success");
			}
			catch(err) {console.log(err)}
		}
		else{
			res.json("Username or DiscordId already exists. Make sure you do not already have an existing account.");
		}
	}
    catch(err) {console.log(err)}
}


users.myGarden = async (req,res) =>{
	const query = `SELECT UserId, PlantId, PosX, PosY, LastWatered
	FROM \`default\`.userplants
	WHERE UserId = ${req.params['userId']}`;
	try{
		const data = await sql.con.query(query);
		res.json( { myGarden : data } );
	}
	catch (err) {console.log(err)}
}

module.exports = users;