'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dupemessage')
    .setDescription('Detect and delete repeated identical messages')
    .addIntegerOption((o) => o.setName('threshold').setDescription('Number of identical messages to consider spam').setRequired(true))
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable duplicate message detection').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const threshold = interaction.options.getInteger('threshold');
      const enable = interaction.options.getBoolean('enable');
      settings.dupemessage = { enabled: enable, threshold };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Duplicate Message', `Duplicate message detection ${enable ? 'enabled' : 'disabled'}. Threshold: ${threshold}`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
