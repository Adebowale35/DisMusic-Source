/*
Copyright (C) 2021  Adebowale35
*/

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { emojies } = require('../../settings/config.js');



class HelpCommand extends Command {
  constructor() {
    super('Help', {
      aliases: ['help'],
      category: 'informations',
      ownerOnly: false,
      description: {
        content: "Command that informs you about commands",
        usage: "+help",
        examples: [
          "+help",
          "+help play"
        ]
      },
      args: [
        {
          id: 'one',
          type: 'commandAlias',
        },
        {
          id: 'two',
          match: 'content'
        }
      ],
      clientPermissions: ['CONNECT'],
      cooldown: 20000,
      userPermissions: ['SEND_MESSAGES'],
      channel: 'guild'
    });
  }

  async exec(message, args, client) {
    if (args.two) {
      if (args.one) {
        if (args.one.categoryID === 'admin') return;
        var commandHelp = new MessageEmbed()
          .setColor('BLACK')
          .setTitle(` ${args.one.id} Command Infos`)
          .setDescription(`\`\`\` ${args.one.description.usage || 'Not Found!'}  \`\`\``)
          .addField('Command Aliases', `\` ${args.one.aliases} \``)
          .addField('Command Description', `\` ${args.one.description.content || 'Not Found'}  \``)
          .addField(`Other information`, `  Category :\` ${args.one.categoryID || 'Not Found!'} \` \n OwnerOnly : \` ${args.one.ownerOnly} \` \n Cooldown : \`5 second(s) \` \n Client Permission(s) : \` ${args.one.clientPermissions} \``)
          .addField(`Command Examples`, `\`\`\` ${args.one.description.examples || 'Not Found'} \`\`\` `)
          .setFooter(`[] optinal argument`)
        message.channel.send(commandHelp)
        //  console.log(args.one)
      } else {
        message.channel.send(new MessageEmbed()
          .setColor('BLACK')
          .setDescription(emojies.unverified + ' | Could not find a command like this')).then(msg => {
            msg.delete({ timeout: 15000 })
          })
      }
    } else {
      var helpEmbed = new MessageEmbed()
        .setDescription(`\`\`\` +help [commandName] \`\`\``)
        .setColor('BLACK')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .addField(`**Music Commands(13) **`, [
          ` \`volume\` \`skip\` \`shuffle\` \`search\` `,
          ` \`resume\` \`queue\` \`play\` \`pause\` `,
          ` \`now-playing\` \`lyrics\` \`loop\` \`disconnect\` `,
          ` \`clear-queue\` `
        ])
        .addField(`**Other Commands(5) **`, [
          `\`gamedc\` \`support\` \`ping\` `,
          `\`invite\` \`vote\` \`translate\` `
        ])
        .addField(`** Informations Commands(2)**`, [
          `\`help\` \`bot-info\``
        ])
        .setFooter(` My prefix: + and mention`)
      message.channel.send(helpEmbed).then(msg => {
        msg.delete({ timeout: 180000 })
      })
    }
  }
}

module.exports = HelpCommand;