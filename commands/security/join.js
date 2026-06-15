'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Accountagegate = require('../_legacy/security/accountagegate.js');
const Agecheck = require('../_legacy/security/agecheck.js');
const Newaccountfilter = require('../_legacy/security/newaccountfilter.js');
const Newaccounts = require('../_legacy/security/newaccounts.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Manage join checks and age filters')
      .addSubcommand(sub => sub.setName('accountagegate').setDescription('Subcommand for accountagegate'))
      .addSubcommand(sub => sub.setName('agecheck').setDescription('Subcommand for agecheck'))
      .addSubcommand(sub => sub.setName('newaccountfilter').setDescription('Subcommand for newaccountfilter'))
      .addSubcommand(sub => sub.setName('newaccounts').setDescription('Subcommand for newaccounts')),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'accountagegate': return Accountagegate.execute(interaction, client);
      case 'agecheck': return Agecheck.execute(interaction, client);
      case 'newaccountfilter': return Newaccountfilter.execute(interaction, client);
      case 'newaccounts': return Newaccounts.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

