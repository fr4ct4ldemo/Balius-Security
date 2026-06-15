'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'clearlog',
  prefix: true,
  description: 'Clear a specific log type',
  async execute(message, args, client) {
    const [type] = args;
    if (!type) return message.reply({ embeds: [errorEmbed('Missing Type', 'Specify a log type to clear.')] }).catch(()=>null);
    db.clearLog && db.clearLog(message.guild.id, type);
    await message.reply({ embeds: [successEmbed('Cleared', `Cleared ${type} logs for this server.`)] }).catch(() => null);
  },
};
