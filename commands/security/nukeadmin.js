'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Nukeblacklist = require('../_legacy/security/nukeblacklist.js');
const Nukewhitelist = require('../_legacy/security/nukewhitelist.js');

module.exports = {
  name: 'nukeadmin',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('nukeadmin')
    .setDescription('Manage nuke blacklist and whitelist')
      .addSubcommand(sub => sub.setName('nukeblacklist').setDescription('Subcommand for nukeblacklist'))
      .addSubcommand(sub => sub.setName('nukewhitelist').setDescription('Subcommand for nukewhitelist')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'nukeblacklist': return Nukeblacklist.execute(interaction, client);
      case 'nukewhitelist': return Nukewhitelist.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
