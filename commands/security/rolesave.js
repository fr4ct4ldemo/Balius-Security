'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Rolesnapshot = require('../_legacy/security/rolesnapshot.js');
const Rolerestore = require('../_legacy/security/rolerestore.js');

module.exports = {
  name: 'rolesave',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('rolesave')
    .setDescription('Manage rolesave features')
      .addSubcommand(sub => sub.setName('rolesnapshot').setDescription('Take a snapshot of all server roles'))
      .addSubcommand(sub => sub.setName('rolerestore').setDescription('Restore roles from a saved snapshot')
        .addIntegerOption(o => o.setName('snapshot').setDescription('Snapshot ID').setRequired(true))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'rolesnapshot': return Rolesnapshot.execute(interaction, client);
      case 'rolerestore': return Rolerestore.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
