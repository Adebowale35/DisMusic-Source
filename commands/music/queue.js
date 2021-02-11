/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class QueueCommand extends Command {
  constructor() {
    super('queue', {
      aliases: ['queue'],
      category: 'music',
      description: {
        content: "Command to showing queue",
        usage: "+queue"
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
    const queue = this.client.player.getQueue(message);

    var QueueEmbed = new MessageEmbed()
      .setColor('BLACK')
      .setThumbnail(message.guild.iconURL())
      .setAuthor(`${message.guild.name} Queue List `)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${this.client.player.getQueue(message).loopMode ? '(Loop Mode)' : ''}**\nCurrent Playing :** [${queue.playing.title}](${queue.playing.url}) - <@${queue.playing.requestedBy.id}> \n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - [${track.title}](${track.url}) -  Requested By : <@${queue.playing.requestedBy.id}>`
      }).slice(0, 7).join('\n') + `\n\n${queue.tracks.length > 7 ? `And **${queue.tracks.length - 7}** other song(s)!` : `‏‏‏‏‏‏‏‏   `}`))
    message.channel.send(QueueEmbed).then(msg => {
      msg.delete({ timeout: 90000 });
    });
  }
}

module.exports = QueueCommand;