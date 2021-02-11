/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class SearchCommand extends Command {
  constructor() {
    super('search', {
      aliases: ['search'],
      category: 'music',
      description: {
        content: "Command for searching songs",
        usage: "+search [<songName>]",
        examples: [
          "1.Message +search do i wanna know artic monkeys 2.Message: 1-10 between number ",
          "1.Message : +search 2.Message: do i wanna know artic monkeys 3.Message: 1-10 between number"
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
    await this.client.player.play(message, args.a, false)
  }
}

module.exports = SearchCommand;