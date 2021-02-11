/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class GamedcCommand extends Command {
  constructor() {
    super('GameDC', {
      aliases: ['gamedc', 'vds'],
      category: 'other',
      ownerOnly: false,
      usage: '+gamedc',
      cooldown: 30000,
      description: {
        content: "A Sponsored Company",
        usage: "+gamedc"
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
      .setDescription("We continue to move forward with our 5 years of experience and know-how in the web world tour we started in 2019 to offer our customers an understanding of affordable price and quality. We provide Domain Name, Hosting, Private, Virtual Server services. And our services to existing customers are increasing day by day.")
      .setAuthor("DisMusic")
      .setTitle("GameDC")
      .setThumbnail('https://cdn.discordapp.com/attachments/746236994857992253/783202928764780544/gamedc.png')
      .addField("gamedc.net :", "[Click](https://gamedc.net/r/1)")
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send({ embed: embed }).then(j => j.delete({ timeout: 35000 }));

  }
}

module.exports = GamedcCommand;