'use strict';
const { EmbedBuilder } = require('discord.js');

const COLOR_PRIMARY = 0x7C3AED; // midnight purple — success/info
const COLOR_ERROR   = 0xED4245; // red — errors/failures

function successEmbed(title, description, fields = []) {
  const embed = new EmbedBuilder()
    .setColor(COLOR_PRIMARY)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setFooter({ text: 'Balius' });
  if (fields.length) embed.addFields(fields);
  return embed;
}

function errorEmbed(title, description, fields = []) {
  const embed = new EmbedBuilder()
    .setColor(COLOR_ERROR)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setFooter({ text: 'Balius' });
  if (fields.length) embed.addFields(fields);
  return embed;
}

module.exports = { successEmbed, errorEmbed };
