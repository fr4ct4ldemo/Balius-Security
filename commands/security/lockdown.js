'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Lockdown = require('../_legacy/security/lockdown.js');
const Lockdownconfig = require('../_legacy/security/lockdownconfig.js');
const Lockdownlog = require('../_legacy/security/lockdownlog.js');
const Lockdownstatus = require('../_legacy/security/lockdownstatus.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockdown')
    .setDescription('Manage lockdown features')
      .addSubcommand(sub => sub.setName('lockdown').setDescription('Lock or unlock all text channels for @everyone')
        .addStringOption(o => o.setName('action').setDescription('Lock or unlock').setRequired(true).addChoices({ name: 'Lock', value: 'lock' }, { name: 'Unlock', value: 'unlock' }))
        .addStringOption(o => o.setName('reason').setDescription('Reason for lockdown'))
      )
      .addSubcommand(sub => sub.setName('lockdownconfig').setDescription('Configure automatic lockdown behavior')
        .addBooleanOption(o => o.setName('auto-lockdown').setDescription('Enable automatic lockdown on raid').setRequired(true))
        .addIntegerOption(o => o.setName('duration').setDescription('Lockdown duration in minutes').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('lockdownlog').setDescription('View the lockdown action log'))
      .addSubcommand(sub => sub.setName('lockdownstatus').setDescription('Show current lockdown state of all channels')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'lockdown': return Lockdown.execute(interaction, client);
      case 'lockdownconfig': return Lockdownconfig.execute(interaction, client);
      case 'lockdownlog': return Lockdownlog.execute(interaction, client);
      case 'lockdownstatus': return Lockdownstatus.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

