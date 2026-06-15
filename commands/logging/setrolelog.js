'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setrolelog',
  prefix: true,
  description: 'Set the channel used for role change logs',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('No channel', 'Please mention a channel.')]}).catch(()=>null);
    db.setLogChannel && db.setLogChannel(message.guild.id, 'role', channel.id);
    await message.reply({ embeds: [successEmbed('Saved', `Role logs will be sent to <#${channel.id}>`)] }).catch(() => null);
  },
};
