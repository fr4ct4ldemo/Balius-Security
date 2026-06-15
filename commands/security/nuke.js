'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Nukeconfig = require('../_legacy/security/nukeconfig.js');
const Nukelog = require('../_legacy/security/nukelog.js');
const Nukeprotection = require('../_legacy/security/nukeprotection.js');
const Nukestatus = require('../_legacy/security/nukestatus.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Manage anti-nuke settings')
      .addSubcommand(sub => sub.setName('nukeconfig').setDescription('Subcommand for nukeconfig'))
      .addSubcommand(sub => sub.setName('nukelog').setDescription('Subcommand for nukelog'))
      .addSubcommand(sub => sub.setName('nukeprotection').setDescription('Subcommand for nukeprotection'))
      .addSubcommand(sub => sub.setName('nukestatus').setDescription('Subcommand for nukestatus')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'nukeconfig': return Nukeconfig.execute(interaction, client);
      case 'nukelog': return Nukelog.execute(interaction, client);
      case 'nukeprotection': return Nukeprotection.execute(interaction, client);
      case 'nukestatus': return Nukestatus.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

