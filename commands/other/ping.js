/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class PingCommand extends Command {
  constructor() {
    super('Ping', {
      aliases: ['ping', 'ms'],
      category: 'other',
      description: {
        content: "",
        usage: "+ping"
      },
      ownerOnly: false,
      args: [
        {
          id: 'a',
          match: 'content'
        }
      ],
      clientPermissions: ['SEND_MESSAGES'],
      userPermissions: ['SEND_MESSAGES'],
      channel: 'guild'
    });
  }

  async exec(message, args, client) {
    var ping = this.client.ws.ping;
    let color;
    let status;
    if (ping < 100) {
      color = 'GREEN';
      status = emojies.active;
    }

    if (100 < ping < 200) {
      color = 'YELLOW';
      status = emojies.reconnect;
    }
    if (ping > 200) {
      color = 'RED';
      status = emojies.inactive;
    }
    var pingEmbed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${status} | Ping : ${ping}`)
    return message.channel.send(pingEmbed).then(msg => {
      msg.delete({ timeout: 15000 });
    });
  }
}

module.exports = PingCommand;