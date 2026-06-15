'use strict';
const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { em, getMenuOptions } = require('../../utils/helpData');
const { buildHomeEmbed } = require('../../utils/helpEmbed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show the bot help menu'),

  async execute(interaction, client) {
    try {
      await interaction.deferReply();

      const menu = new StringSelectMenuBuilder()
        .setCustomId('help_menu')
        .setPlaceholder('Browse a category...')
        .addOptions(getMenuOptions());

      await interaction.editReply({
        embeds: [buildHomeEmbed(client)],
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    } catch (err) {
      console.error('[help] error:', err);
      const { errorEmbed } = require('../../utils/embedBuilder');
      const payload = { embeds: [errorEmbed(`${em('xmark')} Error`, 'An unexpected error occurred.')] };
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply(payload).catch(() => null);
      } else {
        await interaction.reply(payload).catch(() => null);
      }
    }
  },
};
