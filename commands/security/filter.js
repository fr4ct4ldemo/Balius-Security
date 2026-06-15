'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Attachmentfilter = require('../_legacy/security/attachmentfilter.js');
const Contentfilter = require('../_legacy/security/contentfilter.js');
const Imageonlymode = require('../_legacy/security/imageonlymode.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Manage basic content filters')
      .addSubcommand(sub => sub.setName('attachmentfilter').setDescription('Subcommand for attachmentfilter'))
      .addSubcommand(sub => sub.setName('contentfilter').setDescription('Subcommand for contentfilter'))
      .addSubcommand(sub => sub.setName('imageonlymode').setDescription('Subcommand for imageonlymode')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'attachmentfilter': return Attachmentfilter.execute(interaction, client);
      case 'contentfilter': return Contentfilter.execute(interaction, client);
      case 'imageonlymode': return Imageonlymode.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

