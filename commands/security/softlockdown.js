'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('softlockdown')
    .setDescription('Apply soft lockdown (slow mode only, no full lock)')
    .addIntegerOption((o) => o.setName('seconds').setDescription('Slowmode duration in seconds (0 to disable)').setRequired(true))
    .addChannelOption((o) => o.setName('channel').setDescription('Channel to apply slowmode to (defaults to current)').setRequired(false)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const seconds = interaction.options.getInteger('seconds');
      const channel = interaction.options.getChannel('channel') || interaction.channel;
      const settings = (await db.getSettings(guildId)) || {};
      settings.softlockdown = settings.softlockdown || {};
      settings.softlockdown[channel.id] = { seconds };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Soft Lockdown', `Soft lockdown applied to ${channel} with slowmode ${seconds}s.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
