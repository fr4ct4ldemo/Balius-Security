'use strict';
const { successEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'viewconfig',
  prefix: true,
  description: 'View current server configuration',
  async execute(message, args, client) {
    const cfg = db.getConfig ? db.getConfig(message.guild.id) : {};
    const lines = Object.entries(cfg || {}).map(([k,v]) => `${k}: ${v}`);
    await message.reply({ embeds: [successEmbed('Configuration', lines.join('\n') || 'No config set')] }).catch(()=>null);
  },
};
