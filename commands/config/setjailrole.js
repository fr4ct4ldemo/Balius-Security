'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setjailrole',
  prefix: true,
  description: 'Set the jail role used for temporary punishments',
  async execute(message, args, client) {
    const role = message.mentions.roles.first();
    if (!role) return message.reply({ embeds: [errorEmbed('Missing Role', 'Mention a role.')] }).catch(()=>null);
    db.setConfig && db.setConfig(message.guild.id, { jail_role: role.id });
    await message.reply({ embeds: [successEmbed('Saved', `Jail role set to ${role.name}`)] }).catch(()=>null);
  },
};
