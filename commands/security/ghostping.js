'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ghostping')
    .setDescription('Configure ghost ping detection and logging')
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable ghost ping detection').setRequired(true))
    .addChannelOption((o) => o.setName('log_channel').setDescription('Channel to log ghost pings')),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const enable = interaction.options.getBoolean('enable');
      const logChannel = interaction.options.getChannel('log_channel')?.id ?? settings.ghostping?.logChannel ?? null;
      settings.ghostping = { enabled: enable, logChannel };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Ghost Ping', `Ghost ping detection has been ${enable ? 'enabled' : 'disabled'}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
