'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Channelclone = require('../_legacy/security/channelclone.js');
const Channellockdown = require('../_legacy/security/channellockdown.js');
const Channeloverview = require('../_legacy/security/channeloverview.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelsec')
    .setDescription('Manage channel security features')
      .addSubcommand(sub => sub.setName('channelclone').setDescription('Subcommand for channelclone'))
      .addSubcommand(sub => sub.setName('channellockdown').setDescription('Subcommand for channellockdown'))
      .addSubcommand(sub => sub.setName('channeloverview').setDescription('Subcommand for channeloverview')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'channelclone': return Channelclone.execute(interaction, client);
      case 'channellockdown': return Channellockdown.execute(interaction, client);
      case 'channeloverview': return Channeloverview.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

