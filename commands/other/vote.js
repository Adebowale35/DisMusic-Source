/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');


class VoteCommand extends Command {
  constructor() {
    super('Vote', {
      aliases: ['vote', 'topgg', 'dbl'],
      category: 'other',
      description: {
        content: "The command used to vote for a bot",
        usage: '+vote'
      },
      ownerOnly: false,
      cooldown: 30000,
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
      .addField("To vote", "[Click here](https://top.gg/bot/740450864820650036/vote)")
      .setAuthor("DisMusic")
      .setThumbnail(this.client.user.avatarURL())
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send({ embed: embed }).then(msg => {
      msg.delete({ timeout: 60000 })
    });
  }
}

module.exports = VoteCommand;