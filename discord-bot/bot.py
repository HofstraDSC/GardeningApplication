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

load_dotenv();
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')
bot = commands.Bot(command_prefix='!')
channel = discord.utils.get(bot.get_all_channels(), guild__name='GardeningApp', name='bot-testing-1')
greg_id = 219987051376803841

@bot.event
async def on_ready():
    #needs_water.start() 
    guild = discord.utils.get(bot.guilds, name=GUILD)
    members = '\n - '.join([member.name for member in guild.members])
    channels = guild.channels
    greg2 = guild.get_member(greg_id)
    #await greg2.create_dm()
    #await greg2.dm_channel.send('on ready message')
    print(greg2)
    print('It is time!')
    print('I am running on ' + bot.user.name)
    print('With the ID: ' + str(bot.user.id))
    print('The Guild is ' + guild.name)
    print('Guild Members:\n-' + members)

# Information generate in the on_ready does not persist. Have to get it within function
# and everything. Global ones do persist.
"""
@tasks.loop(seconds=5)
async def water():
    guild = discord.utils.get(bot.guilds, name=GUILD)
    user = guild.get_member(greg_id)
    
    if user.dm_channel == None:
        await user.create_dm() 
    await user.dm_channel.send('Water Plant X')
"""
@tasks.loop(seconds = 10)
async def needs_water():
    guild = discord.utils.get(bot.guilds, name=GUILD)
    discord_user = guild.get_member(greg_id)
    await discord_user.create_dm()
    
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
                
            last_watered = plant_in_garden['LastWatered'][:-1]
            #await discord_user.dm_channel.send(last_watered)
            last_watered_date = datetime.fromisoformat(last_watered)
            current_time = datetime.now()
            delta = current_time - last_watered_date
            hours = delta.days * 24
            if(plant_in_garden_info["WaterFreq"] <= hours):
                await discord_user.dm_channel.send(str(user['UserId']) + " Water your " + plant_in_garden_info["PlantName"] + " at (" + str(plant_in_garden['PosX']) + "," + str(plant_in_garden['PosY']) + ")") 
            #await discord_user.dm_channel.send(current_time-last_watered_date)
            
@bot.command()
async def test(ctx):
    await ctx.send("test")
        
    
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

    
bot.run(TOKEN);
