'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Regexfilter = require('../_legacy/security/regexfilter.js');
const Regexlist = require('../_legacy/security/regexlist.js');
const Regexremove = require('../_legacy/security/regexremove.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('regex')
    .setDescription('Manage regex features')
      .addSubcommand(sub => sub.setName('regexfilter').setDescription('Add a custom regex pattern to the filter')
        .addStringOption(o => o.setName('pattern').setDescription('Regex pattern to match').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('regexlist').setDescription('List all active regex filter patterns'))
      .addSubcommand(sub => sub.setName('regexremove').setDescription('Remove a regex filter pattern by ID')
        .addIntegerOption(o => o.setName('pattern-id').setDescription('Pattern ID to remove').setRequired(true))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'regexfilter': return Regexfilter.execute(interaction, client);
      case 'regexlist': return Regexlist.execute(interaction, client);
      case 'regexremove': return Regexremove.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

