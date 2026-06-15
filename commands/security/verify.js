'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Verifylog = require('../_legacy/security/verifylog.js');
const Verifystatus = require('../_legacy/security/verifystatus.js');
const Verifybypass = require('../_legacy/security/verifybypass.js');
const Requireverify = require('../_legacy/security/requireverify.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Manage verify features')
      .addSubcommand(sub => sub.setName('verifylog').setDescription('View the verification attempt log'))
      .addSubcommand(sub => sub.setName('verifystatus').setDescription('Check verification status of a user')
        .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('verifybypass').setDescription('Grant a user a verification bypass')
        .addUserOption(o => o.setName('user').setDescription('User to bypass').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('Reason for bypass').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('requireverify').setDescription('Force reverification for a member')
        .addUserOption(o => o.setName('user').setDescription('User to reverify').setRequired(true))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'verifylog': return Verifylog.execute(interaction, client);
      case 'verifystatus': return Verifystatus.execute(interaction, client);
      case 'verifybypass': return Verifybypass.execute(interaction, client);
      case 'requireverify': return Requireverify.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

