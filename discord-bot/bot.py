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

load_dotenv();
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')
bot = commands.Bot(command_prefix='!')
channel = discord.utils.get(bot.get_all_channels(), guild__name='GardeningApp', name='bot-testing-1')
greg_id = 219987051376803841

@bot.event
async def on_ready():
    #water.start() 
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
@tasks.loop(seconds=5)
async def water():
    guild = discord.utils.get(bot.guilds, name=GUILD)
    user = guild.get_member(greg_id)
    
    if user.dm_channel == None:
        await user.create_dm() 
    await user.dm_channel.send('Water Plant X')

@bot.command()
async def test(ctx):
    await ctx.send("test")
    
@bot.command(name='request')
async def request(ctx):
    user = ctx.author
    URL = 'http://localhost:3000/user/myGarden/22'
    plant_url = 'http://localhost:3000/plant/all'
    plant_request = requests.get(url = plant_url)
    #PARAMS = {'address':location}
    await user.create_dm()
    # sending get request and saving the response as response object 
    r = requests.get(url = URL) 
  
    # extracting data in json format 
    data = r.json()
    plant_data = plant_request.json()
    
    garden = data['myGarden']
    num_plants = len(data['myGarden'])
    for i in range(num_plants):
        curr_plant = garden[i]['PlantId']
        
        #for plant in plant_data:
            #if curr_plant == plant[0]['PlantId']:
                #await user.dm_channel.send(plant)

    await user.dm_channel.send(plant_data['plants'])
    await user.dm_channel.send(data)
    await user.dm_channel.send(num_plants)
    
@bot.command(name='plant', help='Should return a message to the user thanking them')
async def plant(ctx):
    response = 'Thank you ' + str(ctx.author) + ' for using the plant command'
    await ctx.send(response)

@bot.command(name='stop')
async def log_out(ctx):
    await bot.logout()

    
bot.run(TOKEN);
