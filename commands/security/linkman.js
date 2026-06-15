'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Linklog = require('../_legacy/security/linklog.js');
const Linkscan = require('../_legacy/security/linkscan.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('linkman')
    .setDescription('Manage link logging and scanning')
      .addSubcommand(sub => sub.setName('linklog').setDescription('Subcommand for linklog'))
      .addSubcommand(sub => sub.setName('linkscan').setDescription('Subcommand for linkscan')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'linklog': return Linklog.execute(interaction, client);
      case 'linkscan': return Linkscan.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

