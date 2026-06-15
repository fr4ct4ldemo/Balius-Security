'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Threadlock = require('../_legacy/security/threadlock.js');
const Webhookpurge = require('../_legacy/security/webhookpurge.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channeltools')
    .setDescription('Manage channel moderation utilities')
      .addSubcommand(sub => sub.setName('threadlock').setDescription('Subcommand for threadlock'))
      .addSubcommand(sub => sub.setName('webhookpurge').setDescription('Subcommand for webhookpurge')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'threadlock': return Threadlock.execute(interaction, client);
      case 'webhookpurge': return Webhookpurge.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

