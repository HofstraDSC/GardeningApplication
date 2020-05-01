const db = require('./database');
const sql = require('../models/database.js');
const users = {};
const myGarden = {};


/**
 * Used to register for the app.  userName , discordId MUST be passed CASE SENSITIVE.
 */
users.register = async (req,res) =>{
	let query = `SELECT UserId, UserName, DiscordId FROM \`default\`.users WHERE UserName = "${sql.con.escape(req.body['userName'])}" OR DiscordId = ${sql.con.escape(req.body['discordId'])};`;
	console.log(query);
	try{
		let data = await sql.con.query(query);
		console.log(data.length);
		console.log(data);
		if(!data.length){
			query = `INSERT INTO \`default\`.users (UserName, DiscordId) VALUES(${sql.con.escape(req.body['userName'])}, ${sql.con.escape(req.body['discordId'])});`;
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
	let id_query = `SELECT UserId FROM \`default\`.users WHERE DiscordId = '${req.params.discordId})'`;
	let id_res = await sql.con.query(id_query);
	let user_id = id_res[0].UserId;

	try{
		const garden = await users.myGardenUserId(user_id);
		res.json(garden);
	}catch(err){
		console.log(err);
	}
}

users.myGardenUserId = async(user_id) => {
	const query = `SELECT UserId, PlantId, PosX, PosY, LastWatered
		FROM \`default\`.userplants
		WHERE UserId = ${sql.con.escape(user_id)}`;
	const data = await sql.con.query(query);
	return { myGarden : data };

}

users.hasGarden = async (req,res) =>{
	const query = `SELECT DISTINCT(u.UserId), u.DiscordId FROM \`default\`.userplants up
			LEFT JOIN \`default\`.users u ON up.UserId = u.UserId;`;
	try{
		const data = await sql.con.query(query);
		res.json( { users : data } );
	}
	catch (err) {console.log(err)}
}

module.exports = users;
