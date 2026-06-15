'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channellock')
    .setDescription('Lock or unlock specific channels during an incident')
    .addChannelOption((o) => o.setName('channel').setDescription('Channel to lock/unlock').setRequired(true))
    .addBooleanOption((o) => o.setName('lock').setDescription('Lock (true) or unlock (false)').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const channel = interaction.options.getChannel('channel');
      const lock = interaction.options.getBoolean('lock');
      const settings = (await db.getSettings(guildId)) || {};
      settings.channellock = settings.channellock || {};
      settings.channellock[channel.id] = { locked: lock };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Channel Lock', `${lock ? 'Locked' : 'Unlocked'} ${channel}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
