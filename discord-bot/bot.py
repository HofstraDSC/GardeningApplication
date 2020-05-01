"""
List of function/ requests (check with evan that these can/do exist):
hasGarden - return if the user even has a garden in DB
isGardenEmpty - return if the user has plants in their garden to check
"""

import os
import discord
from discord.ext import commands, tasks
from dotenv import load_dotenv
import requests
from datetime import datetime 
import dateutil.parser

load_dotenv();
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')
bot = commands.Bot(command_prefix='.')
channel = discord.utils.get(bot.get_all_channels(), guild__name='GardeningApp', name='bot-testing-1')

# Information generate in the on_ready does not persist. Have to get it within function
# and everything. Global ones do persist.
@tasks.loop(seconds = 14400)
async def needs_water():
    guild = discord.utils.get(bot.guilds, name=GUILD)
     
    plant_url = 'http://localhost:3000/plant/all'
    user_url = 'http://localhost:3000/user/hasGarden'
    
    # sending get request and saving the response as response object 
    plant_request = requests.get(url = plant_url)
    user_request = requests.get(url = user_url)
    # extracting data in json format 
    plant_data_db = plant_request.json()
    plant_data_db = plant_data_db['plants']
    user_data = user_request.json()
    for user in user_data['users']:
        #retrieve the user's garden
        discord_user = guild.get_member(int(user['DiscordId']))
        #await discord_user.create_dm()
        user_garden_request = 'http://localhost:3000/user/myGarden/' + str(user['UserId'])
    
        user_garden = requests.get(url = user_garden_request)
        user_garden_data = user_garden.json()
        #Go through the user's garden
        garden = user_garden_data['myGarden']
        for plant_in_garden in garden:
            plant_in_garden_id = plant_in_garden['PlantId']
            plant_in_garden_info = None
            for plant_db in plant_data_db:
                if(plant_db["PlantId"] == plant_in_garden_id):
                    plant_in_garden_info = plant_db
                    break;
            last_watered = plant_in_garden['LastWatered']
            #await discord_user.dm_channel.send(last_watered)
            last_watered_date = dateutil.parser.parse(last_watered)
            current_time = datetime.now()
            watered_unawered = last_watered_date.replace(tzinfo=None)
            delta = current_time - watered_unawered;
            hours = delta.days * 24
            if(plant_in_garden_info["WaterFreq"] <= hours):
                await discord_user.send(str(user['UserId']) + " Water your " + plant_in_garden_info["PlantName"] + " at (" + str(plant_in_garden['PosX']) + "," + str(plant_in_garden['PosY']) + ")") 
            #await discord_user.dm_channel.send(current_time-last_watered_date)
            
    
@bot.command(name='getAllPlants', help='Should return a message to the user thanking them')
async def getAllPlants(ctx):
    URL = "http://localhost:3000/plant/all"
    r = requests.get(url=URL)
    data = r.json()["plants"]

    user = ctx.author
    await user.create_dm()
    for plant in data:
        await user.dm_channel.send("ID: " + str(plant["PlantId"]) +"     Name: "+ plant["PlantName"] +"\n\t Type: "+ plant["PlantType"] +" \n\t Water Frequency: "+ str(plant["WaterFreq"]) +"\n\t Water needed: "+ str(plant["WaterNeeded"])+"\n")
    

@bot.command(name='stop')
async def log_out(ctx):
    await bot.logout()

    
@bot.event
async def on_ready():
    print('It is time!');
    print('I am running on ' + bot.user.name);
    print('With the ID: ' + str(bot.user.id));
    needs_water.start() 
    guild = discord.utils.get(bot.guilds, name=GUILD)
    members = '\n - '.join([member.name for member in guild.members])
    channels = guild.channels

@bot.command()
async def registerMe(ctx):
    userName = ctx.message.author;
    discordId = ctx.message.author.id;
    data = {'userName':userName,
        'discordId':discordId};
    r = requests.post(url = "http://localhost:3000/user/register", data = data);
    await userName.send(r.text);

@bot.command()
async def addPlant(ctx, plantId, posX, posY):
    user = ctx.message.author;
    data = {'discordId':user.id,
            'plantId':plantId,
            'posX':posX,
            'posY':posY};
    r = requests.post(url = "http://localhost:3000/plant/addPlant", data = data);
    await user.send(r.text);

@bot.command()
async def harvestPlant(ctx, plantId, posX, posY):
    user = ctx.message.author;

    data = {'discordId':user.id,
            'plantId':plantId,
            'posX':posX,
            'posY':posY};
    r = requests.post(url = "http://localhost:3000/plant/harvest", data = data);
    await user.send(r.text);

@bot.command()
async def getMyGarden(ctx):
    user = ctx.message.author;
    discordId = ctx.message.author.id;

    r = requests.get(url = "http://localhost:3000/user/myGardenDiscord/" + str(discordId));
    data = r.json();
    garden = data['myGarden'];
    await user.send(garden);

#@bot.command()
#async def help(ctx):
#    username = ctx.message.author;
#    test = discord.Embed(colour = discord.Colour.green());
#
#    test.set_author(name = "Bot prefix = .");
#    test.add_field(name = "registerme", value = "Registers you to create a garden", inline = False);
#    test.add_field(name = "addplant", value = "Needs plant id, x position, and y position", inline = False);
#    test.add_field(name = "harvestplant", value = "Needs plant id, x position, and y position", inline = False);
#    test.add_field(name = "getmygarden", value = "Shows you your garden", inline = False);
#    
#    await username.send(embed = test);

bot.run(TOKEN);
