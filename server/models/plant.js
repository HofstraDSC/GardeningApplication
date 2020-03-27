const db = require('./database');
const sql = require('../models/database.js');
const plants = {};

plants.getAll = async (req, res) =>{
const query = "SELECT * FROM `default`.plants";
	try{
		let data = await sql.con.query(query);
		console.log(data[0]);
		res.json({plants: data});
	}
    catch(err) {console.log(err)}
}

plants.register = async (req,res) =>{
	const query = `SELECT UserId, UserName, DiscordId FROM \`default\`.users WHERE UserName = "${req.body['userName']}" OR DiscordId = ${req.body['discordId']};`;
	try{
		let data = await sql.con.query(query);
		console.log(data.length);
		console.log(data);
		if(!data.length){
			const query = `INSERT INTO \`default\`.users (UserName, DiscordId) VALUES(\'${req.body['userName']}\', ${req.body['discordId']});`;
			try{
				let data = await sql.con.query(query);
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

module.exports = plants;