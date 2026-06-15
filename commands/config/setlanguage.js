'use strict';
const { successEmbed, errorEmbed } = require('../../utils/embedBuilder');
const db = require('../../utils/database');

module.exports = {
  name: 'setlanguage',
  prefix: true,
  description: 'Set the server language',
  async execute(message, args, client) {
    const [lang] = args;
    if (!lang) return message.reply({ embeds: [errorEmbed('Missing Language', 'Provide a language code.')] }).catch(()=>null);
    db.setConfig && db.setConfig(message.guild.id, { language: lang });
    await message.reply({ embeds: [successEmbed('Saved', `Language set to ${lang}`)] }).catch(()=>null);
  },
};
