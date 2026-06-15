'use strict';
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { errorEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: 'filteredlog',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('filteredlog')
    .setDescription('View the content filter action log'),
  async execute(interaction, client) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle('📋 Content Filter Log')
        .setDescription('Recent content filter detections')
        .addFields({ name: 'Total Actions', value: '0', inline: true })
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'Could not retrieve filter log.')] });
    }
  }
};
