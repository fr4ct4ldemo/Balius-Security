'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Permrestore = require('../_legacy/security/permrestore.js');
const Permissionlock = require('../_legacy/security/permissionlock.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('permmanage')
    .setDescription('Restore and lock permission snapshots')
      .addSubcommand(sub => sub.setName('permrestore').setDescription('Subcommand for permrestore'))
      .addSubcommand(sub => sub.setName('permissionlock').setDescription('Subcommand for permissionlock')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'permrestore': return Permrestore.execute(interaction, client);
      case 'permissionlock': return Permissionlock.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

