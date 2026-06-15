'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('imagespam')
    .setDescription('Configure image/attachment spam detection')
    .addIntegerOption((o) => o.setName('threshold').setDescription('Number of attachments to consider spam').setRequired(true))
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable image spam detection').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const threshold = interaction.options.getInteger('threshold');
      const enable = interaction.options.getBoolean('enable');
      settings.imagespam = { enabled: enable, threshold };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Image Spam', `Image/attachment spam detection ${enable ? 'enabled' : 'disabled'}. Threshold: ${threshold}`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
