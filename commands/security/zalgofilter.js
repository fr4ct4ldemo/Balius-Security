'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zalgofilter')
    .setDescription('Toggle zalgo/unicode abuse character filtering')
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable zalgo filter').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const enable = interaction.options.getBoolean('enable');
      settings.zalgofilter = { enabled: enable };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Zalgo Filter', `Zalgo/unicode filtering has been ${enable ? 'enabled' : 'disabled'}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
