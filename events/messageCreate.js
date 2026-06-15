'use strict';
const db = require('../utils/database');
const antiSpam = require('../utils/antiSpamHandler');
const antiLink = require('../utils/antiLinkHandler');
const antiPhishing = require('../utils/antiPhishingHandler');
const antiMention = require('../utils/antiMentionHandler');
const antiCaps = require('../utils/antiCapsHandler');
const antiEmoji = require('../utils/antiEmojiHandler');
const antiWord = require('../utils/antiWordHandler');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    try {
      if (message.author?.bot) return;
      const guildId = message.guild?.id; if (!guildId) return;
      if (db.isChannelIgnored(guildId, message.channel.id)) return;

      if (message.content.startsWith('b!')) {
        const args = message.content.slice(2).trim().split(/\s+/);
        const commandName = args.shift()?.toLowerCase();
        if (commandName) {
          const command = client.prefixCommands?.get(commandName);
          if (command) {
            try {
              if (command.data) {
                const { buildPrefixInteraction } = require('../utils/prefixInteraction');
                const interaction = buildPrefixInteraction(message, args, client, command.data);
                await command.execute(interaction, client);
              } else {
                await command.execute(message, args, client);
              }
            } catch (err) {
              console.error('[prefix] command error', err);
              const { errorEmbed } = require('../utils/embedBuilder');
              await message.reply({ embeds: [errorEmbed('❌ Error', 'An unexpected error occurred.')] });
            }
            return;
          }
        }
      }

      // Ping response
      if (message.mentions.users.has(client.user.id) && !message.mentions.everyone) {
        const { EmbedBuilder } = require('discord.js');
        const embed = new EmbedBuilder()
          .setColor(0x7C3AED)
          .setAuthor({ name: 'Balius', iconURL: client.user.displayAvatarURL({ size: 128, extension: 'png' }) })
          .setDescription(`👋 Hello ${message.author}!\nUse **/help** to explore everything I can do.`)
          .setFooter({ text: 'Balius' })
          .setTimestamp();
        await message.reply({ embeds: [embed] });
        return;
      }
      // Run handlers in sequence
      await antiSpam(message, client);
      await antiLink(message, client);
      await antiPhishing(message, client);
      await antiMention(message, client);
      await antiCaps(message, client);
      await antiEmoji(message, client);
      await antiWord(message, client);
    } catch (err) { console.error(err); }
  }
};
