'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setvoicelog',
  prefix: true,
  description: 'Set the channel used for voice logs',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('No channel', 'Please mention a channel.')]}).catch(()=>null);
    db.setLogChannel && db.setLogChannel(message.guild.id, 'voice', channel.id);
    await message.reply({ embeds: [successEmbed('Saved', `Voice logs will be sent to <#${channel.id}>`)] }).catch(() => null);
  },
};
