'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Botdetect = require('../_legacy/security/botdetect.js');
const Botgate = require('../_legacy/security/botgate.js');
const Botroleaudit = require('../_legacy/security/botroleaudit.js');
const Botscan = require('../_legacy/security/botscan.js');

module.exports = {
  name: 'botaudit',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('botaudit')
    .setDescription('Manage botaudit features')
      .addSubcommand(sub => sub.setName('botdetect').setDescription('Scan for unverified or suspicious bots'))
      .addSubcommand(sub => sub.setName('botgate').setDescription('Require a role assignment for new bots or users to pass gate checks')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable bot gate').setRequired(true))
        .addRoleOption(o => o.setName('role').setDescription('Role assigned when gate passes'))
      )
      .addSubcommand(sub => sub.setName('botroleaudit').setDescription('Audit all roles assigned to bots'))
      .addSubcommand(sub => sub.setName('botscan').setDescription('List all bots in the server with join dates')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'botdetect': return Botdetect.execute(interaction, client);
      case 'botgate': return Botgate.execute(interaction, client);
      case 'botroleaudit': return Botroleaudit.execute(interaction, client);
      case 'botscan': return Botscan.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
