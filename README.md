# GardeningApplication

## Keep track of all of your gardening needs

[Team Members](#team-members)

This is an implemented discord bot to help with basic garden management. There is functionality to build a garden with plants and position them where you would like. These are all run through discord bot commands.

Link to add the Bot to your server:

[Discord Bot Link](https://discordapp.com/api/oauth2/authorize?client_id=690298166473785425&permissions=8&scope=bot)

**List of Commands:**

```text
.addplant - Add a plant to a specific location in your garden
.harvestplant - Remove a plant from a specific location in your garden
.getmygarden - Retreive your garden and all the plants placed in it
.registerme - Register your discord to our gardening services
.getAllPlants - Retrieves a list of all available plants to add to your gardens.
```

## Team Members

[Gillian](https://github.com/gevers123) - Implemented addplant, harvestplant, registerme, and getmygarden.

[Greg](https://github.com/GregoryQuintanilla) - Implemented the getAllPlants command and the background task that checks whether a users plants need to be watered and notifies the garden owner.

[John](https://github.com/jramirez5) - Created database tables and populated them with plants and their watering information.

[Evan](https://github.com/evanb10) - Implemented the backend using the Express framwork for Javascripts.  



\* *Because of the sensitivity of Discord application tokens the source code will not work for out implemented bot. Please either use the link to add the bot to new servers or create you own bot and fill in the TOKEN variable within a .env file.
