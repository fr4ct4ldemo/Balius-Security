'use strict';
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { errorEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: 'invitelog',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('invitelog')
    .setDescription('View the anti-invite action log'),
  async execute(interaction, client) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle('📋 Anti-Invite Log')
        .setDescription('Recent anti-invite detections')
        .addFields({ name: 'Total Actions', value: '0', inline: true })
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'Could not retrieve invite log.')] });
    }
  }
};
