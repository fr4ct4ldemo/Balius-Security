'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setappealchannel',
  prefix: true,
  description: 'Set the channel where appeals are posted',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('Missing channel', 'Mention a channel.')]}).catch(()=>null);
    db.setConfig && db.setConfig(message.guild.id, { appeal_channel: channel.id });
    await message.reply({ embeds: [successEmbed('Saved', `Appeals will be posted to <#${channel.id}>`)] }).catch(()=>null);
  },
};
