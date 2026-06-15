'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Raidsuspend = require('../_legacy/security/raidsuspend.js');

module.exports = {
  name: 'raidcontrol',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('raidcontrol')
    .setDescription('Manage raid control features')
      .addSubcommand(sub => sub.setName('raidsuspend').setDescription('Subcommand for raidsuspend')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'raidsuspend': return Raidsuspend.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
