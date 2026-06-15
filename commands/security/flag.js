'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Flaguser = require('../_legacy/security/flaguser.js');
const Unflaguser = require('../_legacy/security/unflaguser.js');
const Flaggedlist = require('../_legacy/security/flaggedlist.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flag')
    .setDescription('Manage flag features')
      .addSubcommand(sub => sub.setName('flaguser').setDescription('Manually flag a user as suspicious')
        .addUserOption(o => o.setName('user').setDescription('User to flag').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('Reason for flagging').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('unflaguser').setDescription('Remove a suspicious flag from a user')
        .addUserOption(o => o.setName('user').setDescription('User to unflag').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('flaggedlist').setDescription('List all currently flagged users')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'flaguser': return Flaguser.execute(interaction, client);
      case 'unflaguser': return Unflaguser.execute(interaction, client);
      case 'flaggedlist': return Flaggedlist.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

