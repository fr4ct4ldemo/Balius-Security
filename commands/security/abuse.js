'use strict';
const { SlashCommandBuilder } = require('discord.js');
const Ghostping = require('../_legacy/security/ghostping.js');
const Reactionspam = require('../_legacy/security/reactionspam.js');
const Mentionspam = require('../_legacy/security/mentionspam.js');
const Dupemessage = require('../_legacy/security/dupemessage.js');
const Imagespam = require('../_legacy/security/imagespam.js');
const Honeypot = require('../_legacy/security/honeypot.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('abuse')
    .setDescription('Manage abuse features')
      .addSubcommand(sub => sub.setName('ghostping').setDescription('Detect and log ghost pings (mention then delete)')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable').setRequired(true))
        .addChannelOption(o => o.setName('logchannel').setDescription('Channel to send ghost ping alerts'))
      )
      .addSubcommand(sub => sub.setName('reactionspam').setDescription('Limit reaction spam per message')
        .addIntegerOption(o => o.setName('max-reactions').setDescription('Max different reactions per message').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('mentionspam').setDescription('Punish users who mass-mention others in one message')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable').setRequired(true))
        .addIntegerOption(o => o.setName('limit').setDescription('Max unique mentions allowed (default 5)'))
        .addStringOption(o => o.setName('action').setDescription('Action to take').addChoices({ name: 'Delete', value: 'delete' }, { name: 'Mute', value: 'mute' }, { name: 'Kick', value: 'kick' }, { name: 'Ban', value: 'ban' }))
      )
      .addSubcommand(sub => sub.setName('dupemessage').setDescription('Delete repeated identical messages from the same user')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable').setRequired(true))
        .addIntegerOption(o => o.setName('limit').setDescription('How many dupes before action (default 3)'))
      )
      .addSubcommand(sub => sub.setName('imagespam').setDescription('Configure image/attachment spam limits')
        .addIntegerOption(o => o.setName('max-per-minute').setDescription('Max images per minute').setRequired(true))
      )
      .addSubcommand(sub => sub.setName('honeypot').setDescription('Configure a honeypot channel for security monitoring')
        .addBooleanOption(o => o.setName('enabled').setDescription('Enable or disable honeypot').setRequired(true))
        .addChannelOption(o => o.setName('channel').setDescription('Honeypot channel to monitor'))
      ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'ghostping': return Ghostping.execute(interaction, client);
      case 'reactionspam': return Reactionspam.execute(interaction, client);
      case 'mentionspam': return Mentionspam.execute(interaction, client);
      case 'dupemessage': return Dupemessage.execute(interaction, client);
      case 'imagespam': return Imagespam.execute(interaction, client);
      case 'honeypot': return Honeypot.execute(interaction, client);
      default:
        return interaction.reply({ content: 'Unknown subcommand.', ephemeral: true });
    }
  },
};

