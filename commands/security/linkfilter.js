'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Linkblacklist = require('../_legacy/security/linkblacklist.js');
const Linkwhitelist = require('../_legacy/security/linkwhitelist.js');
const Linkcooldown = require('../_legacy/security/linkcooldown.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('linkfilter')
    .setDescription('Manage link restrictions and whitelists')
      .addSubcommand(sub => sub.setName('linkblacklist').setDescription('Subcommand for linkblacklist'))
      .addSubcommand(sub => sub.setName('linkwhitelist').setDescription('Subcommand for linkwhitelist'))
      .addSubcommand(sub => sub.setName('linkcooldown').setDescription('Subcommand for linkcooldown')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'linkblacklist': return Linkblacklist.execute(interaction, client);
      case 'linkwhitelist': return Linkwhitelist.execute(interaction, client);
      case 'linkcooldown': return Linkcooldown.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

