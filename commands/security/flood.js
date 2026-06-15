'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Floodconfig = require('../_legacy/security/floodconfig.js');
const Floodgate = require('../_legacy/security/floodgate.js');
const Floodlog = require('../_legacy/security/floodlog.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flood')
    .setDescription('Manage flood features')
      .addSubcommand(sub => sub.setName('floodconfig').setDescription('Configure flood detection settings')
        .addIntegerOption(o => o.setName('burst-size').setDescription('Messages to trigger flood').setRequired(true))
        .addIntegerOption(o => o.setName('burst-window').setDescription('Time window in seconds').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('floodgate').setDescription('Auto-enable slowmode guild-wide when message flood is detected')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable').setRequired(true))
        .addIntegerOption(o => o.setName('threshold').setDescription('Messages per 5s across server to trigger (default 50)'))
        .addIntegerOption(o => o.setName('slowmode').setDescription('Slowmode seconds to apply when triggered (default 10)'))
      )
      .addSubcommand(sub => sub.setName('floodlog').setDescription('View flood detection events')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'floodconfig': return Floodconfig.execute(interaction, client);
      case 'floodgate': return Floodgate.execute(interaction, client);
      case 'floodlog': return Floodlog.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

