'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setembedlog',
  prefix: true,
  description: 'Set the channel used for embed/content logs',
  async execute(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    if (!channel) return message.reply({ embeds: [errorEmbed('No channel', 'Please mention a channel.')] }).catch(()=>null);
    db.setLogChannel && db.setLogChannel(message.guild.id, 'embed', channel.id);
    await message.reply({ embeds: [successEmbed('Saved', `Embed logs will be sent to <#${channel.id}>`)] }).catch(() => null);
  },
};
