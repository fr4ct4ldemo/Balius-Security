'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setlogchannel',
  prefix: true,
  description: 'Set the default log channel for the server',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('Missing channel', 'Mention a channel.')] }).catch(()=>null);
    db.setConfig && db.setConfig(message.guild.id, { log_channel: channel.id });
    await message.reply({ embeds: [successEmbed('Saved', `Default log channel set to <#${channel.id}>`)] }).catch(()=>null);
  },
};
