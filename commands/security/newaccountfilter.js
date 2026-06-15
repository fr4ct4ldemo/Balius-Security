'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newaccountfilter')
    .setDescription('Set minimum account age required to join or send messages')
    .addIntegerOption((o) => o.setName('mindays').setDescription('Minimum account age in days').setRequired(true))
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable new account filter').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const mindays = interaction.options.getInteger('mindays');
      const enable = interaction.options.getBoolean('enable');
      settings.newaccountfilter = { enabled: enable, mindays };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ New Account Filter', `New account filter ${enable ? 'enabled' : 'disabled'}. Minimum age: ${mindays} day(s).`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
