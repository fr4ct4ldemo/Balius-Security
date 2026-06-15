'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setbanlog',
  prefix: true,
  description: 'Set the channel used for ban logs',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('No channel', 'Please mention a channel.')]}).catch(()=>null);
    db.setLogChannel && db.setLogChannel(message.guild.id, 'ban', channel.id);
    await message.reply({ embeds: [successEmbed('Saved', `Ban logs will be sent to <#${channel.id}>`)] }).catch(() => null);
  },
};
