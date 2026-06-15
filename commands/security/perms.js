'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Permaudit = require('../_legacy/security/permaudit.js');
const Permsnap = require('../_legacy/security/permsnap.js');
const Permlock = require('../_legacy/security/permlock.js');
const Permreset = require('../_legacy/security/permreset.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('perms')
    .setDescription('Manage permission audits and channel permission locks')
      .addSubcommand(sub => sub.setName('permaudit').setDescription('Subcommand for permaudit'))
      .addSubcommand(sub => sub.setName('permsnap').setDescription('Subcommand for permsnap'))
      .addSubcommand(sub => sub.setName('permlock').setDescription('Subcommand for permlock'))
      .addSubcommand(sub => sub.setName('permreset').setDescription('Subcommand for permreset')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'permaudit': return Permaudit.execute(interaction, client);
      case 'permsnap': return Permsnap.execute(interaction, client);
      case 'permlock': return Permlock.execute(interaction, client);
      case 'permreset': return Permreset.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

