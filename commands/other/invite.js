/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class InviteCommand extends Command {
  constructor() {
    super('Invite', {
      aliases: ['invite'],
      category: 'other',
      ownerOnly: false,
      cooldown: 30000,
      description: {
        content: "The command used to invite the bot",
        usage: "+invite"
      },
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
    var a = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | Invalid documentation`)
    if (args.a) return message.channel.send(a).then(msg => {
      msg.delete({ timeout: 15000 })
    });
    var embed = new MessageEmbed()
      .setColor("BLACK")
      .addField("For Invite", "[Click here](https://discord.com/oauth2/authorize?client_id=740450864820650036&scope=bot&permissions=3238976)")
      .setAuthor("DisMusic")
      .setThumbnail(this.client.user.avatarURL())
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send({ embed: embed }).then(msg => {
      msg.delete({ timeout: 60000 })
    });
  }
}

module.exports = InviteCommand;