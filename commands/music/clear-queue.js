/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class ClearQueueCommand extends Command {
  constructor() {
    super('clearqueue', {
      aliases: ['clearqueue', 'clear-queue', 'c-queue', 'cqueue'],
      category: 'music',
      description: {
        content: "The command that wound the queue clean",
        usage: "+clear-queue"
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
    var paused = new MessageEmbed()
      .setColor('BLACK')
      .setAuthor(this.client.user.username)
      .setDescription(`${emojies.verified} | Queue cleared successfully!`)
      .addField(`Number of songs cleared`, this.client.player.getQueue(message).tracks.length - 1)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    this.client.player.clearQueue(message);
    message.channel.send(paused).then(msg => {
      msg.delete({ timeout: 210000 });
    });
  }
}

module.exports = ClearQueueCommand;