/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class ShuffleCommand extends Command {
  constructor() {
    super('shuffle', {
      aliases: ['shuffle'],
      category: 'music',
      description: {
        content: "command used to shuffle queue",
        usage: "+shuffle"
      },
      ownerOnly: false,
      args: [
        {
          id: 'a',
          match: 'content'
        }
      ],
      clientPermissions: ['CONNECT'],
      userPermissions: ['SEND_MESSAGES'],
      channel: 'guild'
    });
  }

  async exec(message, args, client) {
    var alı = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.unverified} | Invalid documentation`)
    if (args.a) return message.channel.send(alı).then(msg => {
      msg.delete({ timeout: 15000 })
    });
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
    if (this.client.player.getQueue(message).tracks.length <= 1) {
      var yo = new MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emojies.unverified} | No songs in the queue!`)
      return message.channel.send(yo).then(msg => {
        msg.delete({ timeout: 15000 })
      });
    }
    this.client.player.shuffle(message);
    var yok2 = new MessageEmbed()
      .setColor('BLACK')
      .setDescription(`${emojies.verified} Queue shuffled`)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .addField(`Number Of Songs Shuffled`, `**${this.client.player.getQueue(message).tracks.length}** song(s) !`)
    return message.channel.send(yok2).then(msg => {
      msg.delete({ timeout: 120000 })
    });
  }
}

module.exports = ShuffleCommand;