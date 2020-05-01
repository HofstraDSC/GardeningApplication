import os
import discord
import requests
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv();

TOKEN = os.getenv('DISCORD_TOKEN')
bot = commands.Bot(command_prefix='.');
bot.remove_command('help');

@bot.event
async def on_ready():
    print('It is time!');
    print('I am running on ' + bot.user.name);
    print('With the ID: ' + str(bot.user.id));

@bot.command()
async def registerme(ctx):
    userName = ctx.message.author;
    discordId = ctx.message.author.id;

    data = {'userName':userName,
            'discordId':discordId};
    r = requests.post(url = "/user/register", data = data);
    await userName.send(r.text);

@bot.command()
async def addplant(ctx, userId, plantId, posX, posY):
    user = ctx.message.author;
    data = {'userId':userId,
            'plantId':plantId,
            'posX':posX,
            'posY':posY};
    r = requests.post(url = "/plant/addPlant", data = data);
    await user.send(r.text);

@bot.command()
async def harvestplant(ctx, userId, plantId, posX, posY):
    user = ctx.message.author;

    data = {'userId':userId,
            'plantId':plantId,
            'posX':posX,
            'posY':posY};
    r = requests.post(url = "/plant/harvest", data = data);
    await user.send(r.text);

@bot.command()
async def getmygarden(ctx):
    user = ctx.message.author;
    discordId = ctx.message.author.id;

    r = requests.get(url = "/user/myGarden/" + str(discordId));
    data = r.json();
    garden = data['myGarden'];
    await user.send(garden);

@bot.command()
async def help(ctx):
    username = ctx.message.author;
    test = discord.Embed(colour = discord.Colour.green());

    test.set_author(name = "Bot prefix = .");
    test.add_field(name = "registerme", value = "Registers you to create a garden", inline = False);
    test.add_field(name = "addplant", value = "Needs plant id, x position, and y position", inline = False);
    test.add_field(name = "harvestplant", value = "Needs plant id, x position, and y position", inline = False);
    test.add_field(name = "getmygarden", value = "Shows you your garden", inline = False);
    
    await username.send(embed = test);

bot.run(TOKEN);
