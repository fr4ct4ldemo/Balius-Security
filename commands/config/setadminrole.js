'use strict';
const { SlashCommandBuilder } = require('discord.js');
const db = require('../../utils/database');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');

module.exports = {
  name: 'setadminrole',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('setadminrole')
    .setDescription('Set the administrator role for the server')
    .addRoleOption(o => o.setName('role').setDescription('Role to assign as administrator role').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply({ ephemeral: false });
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const role = interaction.options.getRole('role', true);
      const settings = db.getSettings(interaction.guild.id);
      settings.adminRole = role.id;
      db.saveSettings(interaction.guild.id, settings);
      await interaction.editReply({ embeds: [successEmbed('✅ Admin Role Set', `Administrator role updated to ${role}.`)] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
