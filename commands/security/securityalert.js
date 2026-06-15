'use strict';
const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: 'securityalert',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('securityalert')
    .setDescription('Manually trigger a security alert message')
    .addStringOption(opt => opt.setName('level').setDescription('Alert level').setRequired(true).addChoices(
      { name: 'Low', value: 'low' },
      { name: 'Medium', value: 'medium' },
      { name: 'High', value: 'high' },
      { name: 'Critical', value: 'critical' }
    ))
    .addStringOption(opt => opt.setName('message').setDescription('Alert message').setRequired(true)),
  async execute(interaction, client) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const level = interaction.options.getString('level');
      await interaction.editReply({
        embeds: [successEmbed('✅ Alert Sent', `Security alert (${level.toUpperCase()}) triggered.`)]
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'Could not send alert.')] });
    }
  }
};
