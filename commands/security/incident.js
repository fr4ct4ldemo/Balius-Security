'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Incidentlog = require('../_legacy/security/incidentlog.js');
const Incidentlist = require('../_legacy/security/incidentlist.js');
const Incidentview = require('../_legacy/security/incidentview.js');

module.exports = {
  name: 'incident',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('incident')
    .setDescription('Manage incident features')
      .addSubcommand(sub => sub.setName('incidentlog').setDescription('Log a manual security incident')
        .addStringOption(o => o.setName('type').setDescription('Incident type').setRequired(true))
        .addStringOption(o => o.setName('description').setDescription('Incident details').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('incidentlist').setDescription('List all logged security incidents'))
      .addSubcommand(sub => sub.setName('incidentview').setDescription('View a logged security incident by ID')
        .addIntegerOption(o => o.setName('id').setDescription('Incident ID').setRequired(true))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'incidentlog': return Incidentlog.execute(interaction, client);
      case 'incidentlist': return Incidentlist.execute(interaction, client);
      case 'incidentview': return Incidentview.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};
