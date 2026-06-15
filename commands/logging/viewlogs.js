'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'viewlogs',
  prefix: true,
  description: 'View configured logs for this server',
  async execute(message, args, client) {
    const logs = db.getLogChannels ? db.getLogChannels(message.guild.id) : {};
    const lines = Object.entries(logs || {}).map(([k,v]) => `${k}: <#${v}>`);
    await message.reply({ embeds: [successEmbed('Log Channels', lines.join('\n') || 'None configured')] }).catch(()=>null);
  },
};
