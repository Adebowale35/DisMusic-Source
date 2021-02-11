/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class PlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: ['play', 'p'],
      category: 'music',
      description: {
        content: "Command for playing music",
        usage: "+play [<songName>]",
        examples: [
          "1.Message +play do i wanna know artic monkeys",
          "1.Message : +play 2.Message: do i wanna know artic monkeys"
        ]
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
    await this.client.player.play(message, args.a, { firstResult: true })
  }
}

module.exports = PlayCommand;