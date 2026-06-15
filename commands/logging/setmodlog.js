'use strict';
const { SlashCommandBuilder } = require('discord.js');
const db = require('../../utils/database');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');

module.exports = {
  name: 'setmodlog',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('setmodlog')
    .setDescription('Set the moderation log channel')
    .addChannelOption(o => o.setName('channel').setDescription('Channel for moderation logs').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply({ ephemeral: false });
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const channel = interaction.options.getChannel('channel', true);
      const settings = db.getSettings(interaction.guild.id);
      settings.modLogChannel = channel.id;
      db.saveSettings(interaction.guild.id, settings);
      await interaction.editReply({ embeds: [successEmbed('📋 Moderation Log Set', `Moderation logs will be sent to <#${channel.id}>.`)] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
