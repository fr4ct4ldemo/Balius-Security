'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Anticaps = require('../_legacy/security/anticaps.js');
const Antiemoji = require('../_legacy/security/antiemoji.js');
const Antihoisting = require('../_legacy/security/antihoisting.js');
const Antiinvite = require('../_legacy/security/antiinvite.js');
const Antilink = require('../_legacy/security/antilink.js');
const Antimentions = require('../_legacy/security/antimentions.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('Manage automod settings')
      .addSubcommand(sub => sub.setName('anticaps').setDescription('Subcommand for anticaps'))
      .addSubcommand(sub => sub.setName('antiemoji').setDescription('Subcommand for antiemoji'))
      .addSubcommand(sub => sub.setName('antihoisting').setDescription('Subcommand for antihoisting'))
      .addSubcommand(sub => sub.setName('antiinvite').setDescription('Subcommand for antiinvite'))
      .addSubcommand(sub => sub.setName('antilink').setDescription('Subcommand for antilink'))
      .addSubcommand(sub => sub.setName('antimentions').setDescription('Subcommand for antimentions')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'anticaps': return Anticaps.execute(interaction, client);
      case 'antiemoji': return Antiemoji.execute(interaction, client);
      case 'antihoisting': return Antihoisting.execute(interaction, client);
      case 'antiinvite': return Antiinvite.execute(interaction, client);
      case 'antilink': return Antilink.execute(interaction, client);
      case 'antimentions': return Antimentions.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

