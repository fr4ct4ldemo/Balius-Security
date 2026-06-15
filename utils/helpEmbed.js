'use strict';
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { em, CATEGORY_COUNTS, getMenuOptions } = require('./helpData');

function buildHomeEmbed(client) {
  const CATS = [
    { label: 'Moderation', emojiId: 'hammer',    key: 'moderation', description: 'Ban, kick, mute, warn, purge & more' },
    { label: 'Security',   emojiId: 'shield',    key: 'security',   description: 'Antispam, antilink, antiraid & more'  },
    { label: 'Logging',    emojiId: 'clipboard', key: 'logging',    description: 'Log channels and event tracking'      },
    { label: 'Utility',    emojiId: 'wrench',    key: 'utility',    description: 'Info, snipe, ping, polls & more'      },
    { label: 'Config',     emojiId: 'gear',      key: 'config',     description: 'Automod settings, roles & bot setup'  },
  ];
  const totalCmds    = Object.values(CATEGORY_COUNTS).reduce((a, b) => a + b, 0);
  const categoryGrid = CATS.map(c =>
    `${em(c.emojiId)} **${c.label}** \`${CATEGORY_COUNTS[c.key]} cmds\`\n\u256f ${c.description}`
  ).join('\n\n');

  return new EmbedBuilder()
    .setColor(0x7C3AED)
    .setAuthor({
      name: `${client.user.username}  ·  Help Center`,
      iconURL: client.user.displayAvatarURL({ size: 128, extension: 'png' }),
    })
    .setTitle('Balius v2.0')
    .setDescription(
      `> A powerful, modern moderation & security bot.\n> **${totalCmds} commands** across **${CATS.length} categories.**`
    )
    .addFields(
      { name: `${em('folder')}  Categories`, value: categoryGrid, inline: false },
      {
        name: `${em('zap')}  Quick Start`,
        value: [
          '`1`  Set your log channel with `/setlog`',
          '`2`  Enable automod with `/antispam`, `/antilink`, etc.',
          '`3`  Use `/settings` to review your configuration',
        ].join('\n'),
        inline: false,
      }
    )
    .setThumbnail(client.user.displayAvatarURL({ size: 256, extension: 'png' }))
    .setFooter({ text: `${client.user.username}  ·  Use the menu below to explore commands` })
    .setTimestamp();
}

function buildMenuRow() {
  const menu = new StringSelectMenuBuilder()
    .setCustomId('help_menu')
    .setPlaceholder('Browse a category...')
    .addOptions(getMenuOptions());
  return new ActionRowBuilder().addComponents(menu);
}

module.exports = {
  buildHomeEmbed,
  buildMenuRow,
};
