'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Joinreaction = require('../_legacy/security/joinreaction.js');
const Joinscan = require('../_legacy/security/joinscan.js');
const Joinspike = require('../_legacy/security/joinspike.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joinsecurity')
    .setDescription('Manage join security features')
      .addSubcommand(sub => sub.setName('joinreaction').setDescription('Subcommand for joinreaction'))
      .addSubcommand(sub => sub.setName('joinscan').setDescription('Subcommand for joinscan'))
      .addSubcommand(sub => sub.setName('joinspike').setDescription('Subcommand for joinspike')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'joinreaction': return Joinreaction.execute(interaction, client);
      case 'joinscan': return Joinscan.execute(interaction, client);
      case 'joinspike': return Joinspike.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

