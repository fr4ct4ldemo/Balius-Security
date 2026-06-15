'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const { checkPermissions } = require('../../utils/permissionCheck');
const { logAction } = require('../../utils/logger');
const db = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wordfilter')
    .setDescription('Add or remove words from the custom word filter')
    .addStringOption((o) => o.setName('action').setDescription('add or remove').setRequired(true).addChoices({ name: 'add', value: 'add' }, { name: 'remove', value: 'remove' }))
    .addStringOption((o) => o.setName('word').setDescription('Word to add or remove').setRequired(true)),
  async execute(interaction, client) {
    try {
      await interaction.deferReply();
      const ok = await checkPermissions(interaction, ['ManageGuild']);
      if (!ok) return;
      const guildId = interaction.guild.id;
      const settings = (await db.getSettings(guildId)) || {};
      settings.wordfilter = settings.wordfilter || [];
      const action = interaction.options.getString('action');
      const word = interaction.options.getString('word');
      if (action === 'add') {
        if (!settings.wordfilter.includes(word)) settings.wordfilter.push(word);
      } else {
        settings.wordfilter = settings.wordfilter.filter((w) => w !== word);
      }
      await db.saveSettings(guildId, settings);
      const embed = successEmbed('✅ Word Filter', `Word filter updated (${action}): ${word}`);
      await interaction.editReply({ embeds: [embed] });
      return logAction(client, guildId, embed);
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
    }
  }
};
