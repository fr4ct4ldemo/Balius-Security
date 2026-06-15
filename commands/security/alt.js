'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Altlink = require('../_legacy/security/altlink.js');
const Altlist = require('../_legacy/security/altlist.js');
const Altscan = require('../_legacy/security/altscan.js');
const Altunlink = require('../_legacy/security/altunlink.js');
const Antialt = require('../_legacy/security/antialt.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('alt')
    .setDescription('Manage alt features')
      .addSubcommand(sub => sub.setName('altlink').setDescription('Manually link two accounts as alts')
        .addUserOption(o => o.setName('user1').setDescription('First user').setRequired(true))
        .addUserOption(o => o.setName('user2').setDescription('Second user').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('altlist').setDescription('List all known alt pairs in the server'))
      .addSubcommand(sub => sub.setName('altscan').setDescription('Scan for potential alt accounts by similarity'))
      .addSubcommand(sub => sub.setName('altunlink').setDescription('Remove an alt link between two accounts')
        .addUserOption(o => o.setName('user1').setDescription('First user').setRequired(true))
        .addUserOption(o => o.setName('user2').setDescription('Second user').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('antialt').setDescription('Kick accounts newer than a minimum age')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable').setRequired(true))
        .addIntegerOption(o => o.setName('minage').setDescription('Minimum account age in days (default 7)'))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'altlink': return Altlink.execute(interaction, client);
      case 'altlist': return Altlist.execute(interaction, client);
      case 'altscan': return Altscan.execute(interaction, client);
      case 'altunlink': return Altunlink.execute(interaction, client);
      case 'antialt': return Antialt.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

