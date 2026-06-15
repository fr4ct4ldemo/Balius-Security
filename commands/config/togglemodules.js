'use strict';
const { successEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'togglemodules',
  prefix: true,
  description: 'Enable or disable specific modules (comma-separated)',
  async execute(message, args, client) {
    const [moduleName, state] = args.join(' ').split(',').map(s=>s.trim());
    if (!moduleName) return message.reply({ embeds: [errorEmbed('Missing Module', 'Provide a module name.')] }).catch(()=>null);
    const enabled = state === 'on' || state === 'true';
    db.setConfig && db.setConfig(message.guild.id, { [`module_${moduleName}`]: !!enabled });
    await message.reply({ embeds: [successEmbed('Saved', `${moduleName} is now ${enabled ? 'enabled' : 'disabled'}`)] }).catch(()=>null);
  },
};
