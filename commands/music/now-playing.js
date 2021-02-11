/*
Copyright (C) 2021  Adebowale35
*/
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class NPCommand extends Command {
  constructor() {
    super('now-playing', {
      aliases: ['now-playing', 'np', 'now-play', 'nowplaying'],
      category: 'music',
      description: {
        content: "Command that gives information about the played song",
        usage: "+now-playing"
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
    const track = this.client.player.nowPlaying(message);
    var embed31 = new MessageEmbed()
      .setColor('BLACK')
      .setTitle(`${track.title} `)
      .setURL(track.url)
      .setThumbnail(track.thumbnail)
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: 'Song Requested by',
          value: track.requestedBy.username,
          inline: true
        },
        {
          name: `Channel Name`,
          value: `[${track.author}](${track.link})`,
          inline: true
        },
        {
          name: 'Song Name',
          value: track.title,
          inline: true
        },
        {
          name: 'Song Duration',
          value: track.duration,
          inline: true
        },
        {
          name: 'Song Views',
          value: track.views.toLocaleString(),
          inline: true
        },
        {
          name: 'Song Volume',
          value: '%' + this.client.player.getQueue(message).volume,
          inline: true
        },
        {
          name: 'From Playlist',
          value: track.fromPlaylist ? `${emojies.active}` : `${emojies.inactive}`,
          inline: true
        },
        {
          name: 'Song Repeat mode',
          value: this.client.player.getQueue(message).repeatMode ? `${emojies.active}` : `${emojies.inactive}`,
          inline: true
        },
        {
          name: 'Currently paused',
          value: this.client.player.getQueue(message).paused ? `${emojies.active}` : `${emojies.inactive}`,
          inline: true
        },
        {
          name: '‏‏‏‏‏‏‏‏   ',
          value: this.client.player.createProgressBar(message, { timecodes: true }),
          inline: true
        }
      )
    message.channel.send(embed31).then(msg => {
      msg.delete({ timeout: track.durationMS })
    });
  }
}

module.exports = NPCommand;