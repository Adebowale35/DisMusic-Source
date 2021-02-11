/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const os = require('os')
const moment = require('moment');
require('moment-duration-format')
const { database } = require('../../settings/config.json');
const { Database } = require('g9db');
const db = new Database(database, "DisMusic");



class BotInfoCommand extends Command {
  constructor() {
    super('Bot Info', {
      aliases: ['botinfo', 'bot-info', 'client-info', 'clientinfo'],
      category: 'informations',
      ownerOnly: false,
      description: {
        content: "Command that gives information about the bot",
        usage: "+client-info",
        examples: [
          "+client-info"
        ]
      },
      cooldown: 20000,
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
    const duration = moment.duration(this.client.uptime).format(" D [day], H [hour], m [minute], s [second]");
    const embed = new MessageEmbed()
      .setThumbnail(this.client.user.displayAvatarURL())
      .setTitle('Bot Informations')
      .setColor('BLACK')
      .addFields(
        {
          name: '🌐 Servers',
          value: `\`${this.client.guilds.cache.size} servers.\``,
          inline: true
        },
        {
          name: '📺 Channel',
          value: `\`${this.client.channels.cache.size} channels.\``,
          inline: true
        },
        {
          name: '👥 Server Users',
          value: `\`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``,
          inline: true
        },
        {
          name: '⏳ Ping',
          value: `\`${Math.round(this.client.ws.ping)}ms\``,
          inline: true
        },
        {
          name: "Commands",
          value: `\`Total Commands : ${this.client.commandHandler.modules.size}\``,
          inline: true
        },
        {
          name: "Shard Info",
          value: `\`Total Shard:  ${this.client.ws.totalShards}\``,
          inline: false
        },
        {
          name: 'System Info',
          value: `\`Cores: ${os.cpus().length}\` \n \`Memory Usage: ${(process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2)}mb\` \n \`Bit : ${os.arch()}\` `,
          value3: `\`CPU : ${os.cpus().map(i => `${i.model}`)[0]}`,
          inline: false
        },
        {
          name: 'Client Uptime',
          value: `\`${duration}\``,
          inline: false
        },
        {
          name: '📥 Join Date',
          value: `\`${this.client.user.createdAt}\``,
          inline: false
        },
      )
    message.channel.send(embed)
  }
}

module.exports = BotInfoCommand;