/*
Copyright (C) 2021  Adebowale35
*/


//------\\

const { MessageEmbed } = require('discord.js');

//------\\

const { token, database, ownerIDs } = require('./settings/config.json')
const { emojies } = require("./settings/config.js");

//------\\

const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');

class MyClient extends AkairoClient {
  constructor() {
    super({
      ownerID: ownerIDs,
    }, {
      disableMentions: 'everyone'
    });

    this.commandHandler = new CommandHandler(this, {
      directory: './commands',
      prefix: '+',
      allowMention: true,
      defaultCooldown: 7500,
      blockBots: true,
      blockClient: true,
      handleEdits: true,
      commandUtil: true,
      //ignoreCooldown: [ownerIDs]
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: './client-events'
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors'
    });
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      inhibitorHandler: this.inhibitorHandler
    })
    this.listenerHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new MyClient();
client.timer = require('./settings/timer.js')

//------\\

const { yellow, red, green } = require('chalk');

//------\\

const { Database } = require('g9db');
const db = new Database(database, "DisMusic");
client.db = db

//----------Player----------\\

const { Player } = require('./sources/discord-player');

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnEndCooldown: 12000,
  leaveOnStop: true,
  leaveOnStopCooldown: 12000,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 12000,
  autoSelfDeaf: true
});
client.player = player
//----------Database Events----------\\

client.db.on("ready", async () => {
  console.log(yellow('@') + green("Logged to the database!"));
});

client.db.on("error", (err) => {
  console.log(yellow('@') + red("DataBase Error: ") + err);
});

//----------Database Events----------\\



//-------Client Login-----\\

client.login(token);

//-------Client Login-----\\