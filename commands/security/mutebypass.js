'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mutebypass')
    .setDescription('Detect and re-mute users who bypass mute via role changes')
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable mutebypass protection').setRequired(true))
    .addRoleOption((o) => o.setName('muted_role').setDescription('Role to reassign when re-muting users')),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const enable = interaction.options.getBoolean('enable');
      const mutedRole = interaction.options.getRole('muted_role')?.id ?? settings.mutebypass?.mutedRole ?? null;
      settings.mutebypass = { enabled: enable, mutedRole };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Mute Bypass', `Mute-bypass protection has been ${enable ? 'enabled' : 'disabled'}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
