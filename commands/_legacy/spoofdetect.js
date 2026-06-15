'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spoofdetect')
    .setDescription('Detect usernames spoofing staff or known bots')
    .addBooleanOption((o) => o.setName('enable').setDescription('Enable or disable spoof detection').setRequired(true))
    .addStringOption((o) => o.setName('pattern').setDescription('Optional pattern to watch for (regex)').setRequired(false)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      const enable = interaction.options.getBoolean('enable');
      const pattern = interaction.options.getString('pattern') ?? settings.spoofdetect?.pattern ?? null;
      settings.spoofdetect = { enabled: enable, pattern };
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Spoof Detect', `Spoof detection has been ${enable ? 'enabled' : 'disabled'}.`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
