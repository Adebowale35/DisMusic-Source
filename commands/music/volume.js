/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class VolumeCommand extends Command {
  constructor() {
    super('volume', {
      aliases: ['volume', 'vol'],
      category: 'music',
      description: {
        content: "Command to adjust the music level",
        usage: "+volume <number>",
        examples: [
          "+volume 45"
        ]
      },
      ownerOnly: false,
      args: [
        {
          id: 'a',
          match: 'content',
          type: 'number'
        }
      ],
      clientPermissions: ['CONNECT'],
      userPermissions: ['SEND_MESSAGES'],
      channel: 'guild'
    });
  }

  async exec(message, args, client) {
    var notVoice = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | Please enter to a voice channel!`)
    if (!message.member.voice.channel) return message.channel.send(notVoice).then(msg => {
      msg.delete({ timeout: 15000 })
    });
    var haveChannel = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | I already service on a voice channel!`)
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(haveChannel).then(msg => {
      msg.delete({ timeout: 15000 })
    });
    var yok = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | No music currently playing!`)
    if (!this.client.player.getQueue(message)) return message.channel.send(yok).then(msg => {
      msg.delete({ timeout: 15000 })
    });
    var yok2 = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | Please set a volume `)
    if (!args.a) return message.channel.send(yok2).then(a => a.delete({ timeout: 15000 }));
    if (args.a > 100 || args.a < 0) {
      var yok5 = new MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emojies.unverified} | Please enter a valid number (between 1-100)!`)
      return message.channel.send(yok5).then(a => a.delete({ timeout: 15000 }));
    }
    if (args.a === this.client.player.getQueue(message).volume) {
      var er = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emojies.unverified} | Volume level is already ${a}`)
      return message.channel.send(er).then(msg => {
        msg.delete({ timeout: 15000 })
      });
    }
    this.client.player.setVolume(message, args.a);
    var yok6 = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.verified} | Song Volume set to **%${parseInt(args.a)}** !`)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(yok6).then(a => a.delete({ timeout: 120000 }));
  }
}

module.exports = VolumeCommand;