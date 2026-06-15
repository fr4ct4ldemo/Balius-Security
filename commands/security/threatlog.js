'use strict';
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { errorEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: 'threatlog',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('threatlog')
    .setDescription('View recent threat detections in the server'),
  async execute(interaction, client) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle('📋 Threat Log')
        .setDescription('Recent threat detections in this server')
        .addFields(
          { name: 'Total Threats', value: '0', inline: true },
          { name: 'Last Detection', value: 'None', inline: true }
        )
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'Could not retrieve threat log.')] });
    }
  }
};
