'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Emergencylock = require('../_legacy/security/emergencylock.js');
const Emergencyunlock = require('../_legacy/security/emergencyunlock.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emergency')
    .setDescription('Manage emergency features')
      .addSubcommand(sub => sub.setName('emergencylock').setDescription('Instantly lock all channels (emergency use)'))
      .addSubcommand(sub => sub.setName('emergencyunlock').setDescription('Unlock all channels after emergency lockdown')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'emergencylock': return Emergencylock.execute(interaction, client);
      case 'emergencyunlock': return Emergencyunlock.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

