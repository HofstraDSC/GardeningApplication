import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv();
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')
bot = commands.Bot(command_prefix='!')

@bot.event
async def on_ready():
    guild = discord.utils.get(bot.guilds, name=GUILD)
    members = '\n - '.join([member.name for member in guild.members])
    print('It is time!')
    print('I am running on ' + bot.user.name)
    print('With the ID: ' + str(bot.user.id))
    print('The Guild is ' + guild.name)
    print('Guild Members:\n-' + members)
"""
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return 0
    if 'hello bot' in message.content.lower():
        await message.channel.send('hello ' + str(message.author))
"""

@bot.command()
async def test(ctx):
    await ctx.send("test")

    
@bot.command(name='plant', help='Should return a message to the user thanking them')
async def plant(ctx):
    response = 'Thank you ' + str(ctx.author) + ' for using the plant command'
    await ctx.send(response)

bot.run(TOKEN);
