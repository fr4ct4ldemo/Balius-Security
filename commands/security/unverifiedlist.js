'use strict';
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { errorEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: 'unverifiedlist',
  prefix: true,
  data: new SlashCommandBuilder()
    .setName('unverifiedlist')
    .setDescription('List members who haven\'t verified'),
  async execute(interaction, client) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle('❌ Unverified Members')
        .setDescription('Members who have not completed verification')
        .addFields({ name: 'Total', value: '0', inline: true })
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [errorEmbed('❌ Error', 'Could not retrieve unverified list.')] });
    }
  }
};
