import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv();
TOKEN = os.getenv('DISCORD_TOKEN');
bot = commands.Bot(command_prefix='>');

@bot.event
async def on_ready():
    print('It is time!');
    print('I am running on ' + bot.user.name);
    print('With the ID: ' + str(bot.user.id));

bot.run(TOKEN);
