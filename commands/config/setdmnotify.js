'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setdmnotify',
  prefix: true,
  description: 'Toggle DM notifications for moderation actions',
  async execute(message, args, client) {
    const [on] = args;
    const val = on === 'on' || on === 'true';
    db.setConfig && db.setConfig(message.guild.id, { dm_notify: !!val });
    await message.reply({ embeds: [successEmbed('Saved', `DM notifications ${val ? 'enabled' : 'disabled'}`)] }).catch(()=>null);
  },
};
