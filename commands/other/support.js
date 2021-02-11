/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class SupportCommand extends Command {
  constructor() {
    super('Support', {
      aliases: ['support', 'server', 'supportserver', 'support-server'],
      category: 'other',
      description: {
        content: "The command used to enter the support server",
        usage: '+support'
      },
      cooldown: 30000,
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
    var a = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | Invalid documentation`)
    if (args.a) return message.channel.send(a).then(msg => {
      msg.delete({ timeout: 15000 })
    });
    var embed = new MessageEmbed()
      .setColor("BLACK")
      .addField("For Support Server", "[Click here](https://discord.gg/st8Jm7yQRK)")
      .setAuthor("DisMusic")
      .setThumbnail(this.client.user.avatarURL())
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send({ embed: embed }).then(msg => {
      msg.delete({ timeout: 60000 })
    });
  }
}

module.exports = SupportCommand;