'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Spamconfig = require('../_legacy/security/spamconfig.js');
const Spamexempt = require('../_legacy/security/spamexempt.js');
const Spamlog = require('../_legacy/security/spamlog.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('Manage spam features')
      .addSubcommand(sub => sub.setName('spamconfig').setDescription('Configure antispam thresholds')
        .addIntegerOption(o => o.setName('messages').setDescription('Messages allowed per interval').setRequired(true))
        .addIntegerOption(o => o.setName('seconds').setDescription('Time interval in seconds').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('spamexempt').setDescription('Exempt a role or channel from antispam')
        .addRoleOption(o => o.setName('role').setDescription('Role to exempt'))
        .addChannelOption(o => o.setName('channel').setDescription('Channel to exempt'))
      )
      .addSubcommand(sub => sub.setName('spamlog').setDescription('View the antispam action log')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'spamconfig': return Spamconfig.execute(interaction, client);
      case 'spamexempt': return Spamexempt.execute(interaction, client);
      case 'spamlog': return Spamlog.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

