'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Antinuke = require('../_legacy/security/antinuke.js');
const Antiphishing = require('../_legacy/security/antiphishing.js');
const Antiraid = require('../_legacy/security/antiraid.js');
const Antispam = require('../_legacy/security/antispam.js');
const Antiword = require('../_legacy/security/antiword.js');
const Antizalgo = require('../_legacy/security/antizalgo.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antimod')
    .setDescription('Manage advanced automod features')
      .addSubcommand(sub => sub.setName('antinuke').setDescription('Subcommand for antinuke'))
      .addSubcommand(sub => sub.setName('antiphishing').setDescription('Subcommand for antiphishing'))
      .addSubcommand(sub => sub.setName('antiraid').setDescription('Subcommand for antiraid'))
      .addSubcommand(sub => sub.setName('antispam').setDescription('Subcommand for antispam'))
      .addSubcommand(sub => sub.setName('antiword').setDescription('Subcommand for antiword'))
      .addSubcommand(sub => sub.setName('antizalgo').setDescription('Subcommand for antizalgo')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'antinuke': return Antinuke.execute(interaction, client);
      case 'antiphishing': return Antiphishing.execute(interaction, client);
      case 'antiraid': return Antiraid.execute(interaction, client);
      case 'antispam': return Antispam.execute(interaction, client);
      case 'antiword': return Antiword.execute(interaction, client);
      case 'antizalgo': return Antizalgo.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

