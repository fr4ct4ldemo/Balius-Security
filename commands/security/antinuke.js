'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antinuke')
    .setDescription('Configure anti-nuke protection settings')
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable anti-nuke').setRequired(true))
    .addIntegerOption((o) => o.setName('threshold').setDescription('Action threshold for triggering anti-nuke').setRequired(false)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const enable = interaction.options.getBoolean('enable');
      const threshold = interaction.options.getInteger('threshold') ?? settings.antinuke?.threshold ?? 5;
      settings.antinuke = { enabled: enable, threshold };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Anti-nuke', `Anti-nuke has been ${enable ? 'enabled' : 'disabled'}. Threshold is ${threshold}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
