'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Importfilter = require('../_legacy/security/importfilter.js');
const Suspiciouslink = require('../_legacy/security/suspiciouslink.js');

module.exports = {
  name: 'importfilter',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('importfilter')
    .setDescription('Manage import and suspicious link filters')
      .addSubcommand(sub => sub.setName('importfilter').setDescription('Subcommand for importfilter'))
      .addSubcommand(sub => sub.setName('suspiciouslink').setDescription('Subcommand for suspiciouslink')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'importfilter': return Importfilter.execute(interaction, client);
      case 'suspiciouslink': return Suspiciouslink.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
