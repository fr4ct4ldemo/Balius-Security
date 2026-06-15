'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('honeypot')
    .setDescription('Set up a honeypot channel to detect suspicious users')
    .addChannelOption((o) => o.setName('channel').setDescription('Channel to use as honeypot').setRequired(true))
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable honeypot').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const channel = interaction.options.getChannel('channel')?.id;
      const enable = interaction.options.getBoolean('enable');
      settings.honeypot = { enabled: enable, channel };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Honeypot', `Honeypot ${enable ? 'enabled' : 'disabled'} on <#${channel}>.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
