'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Raidconfig = require('../_legacy/security/raidconfig.js');
const Raidmode = require('../_legacy/security/raidmode.js');
const Raidlog = require('../_legacy/security/raidlog.js');
const Raidhistory = require('../_legacy/security/raidhistory.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('raid')
    .setDescription('Manage raid detection and logs')
      .addSubcommand(sub => sub.setName('raidconfig').setDescription('Subcommand for raidconfig'))
      .addSubcommand(sub => sub.setName('raidmode').setDescription('Subcommand for raidmode'))
      .addSubcommand(sub => sub.setName('raidlog').setDescription('Subcommand for raidlog'))
      .addSubcommand(sub => sub.setName('raidhistory').setDescription('Subcommand for raidhistory')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'raidconfig': return Raidconfig.execute(interaction, client);
      case 'raidmode': return Raidmode.execute(interaction, client);
      case 'raidlog': return Raidlog.execute(interaction, client);
      case 'raidhistory': return Raidhistory.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

