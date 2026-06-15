'use strict';
const { syncEmojis } = require('../utils/emojiSync');

module.exports = {
  name: 'clientReady',
  once: true,
  async execute(client) {
    console.log(`✅ Online as ${client.user.tag} in ${client.guilds.cache.size} servers`);

    try {
      client.user.setActivity(
        `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members across ${client.guilds.cache.size} servers`,
        { type: 3 }
      );
    } catch (err) {
      console.error('[ready] setActivity failed:', err.message);
    }

    try {
      await syncEmojis(client);
    } catch (err) {
      console.error('[ready] syncEmojis failed:', err.message);
    }

    try {
      printBanner(client);
    } catch (err) {
      console.error('[ready] printBanner failed:', err.message);
    }
  }
};

function printBanner(client) {
  const G0 = '\x1b[38;2;88;28;220m';
  const G1 = '\x1b[38;2;109;40;217m';
  const G2 = '\x1b[38;2;139;92;246m';
  const G3 = '\x1b[38;2;167;139;250m';
  const G4 = '\x1b[38;2;196;181;253m';
  const G5 = '\x1b[38;2;221;214;254m';
  const G6 = '\x1b[38;2;255;255;255m';
  const C4 = '\x1b[38;2;167;139;250m';
  const BD = '\x1b[38;2;91;33;182m';
  const R  = '\x1b[0m';
  const b  = '\x1b[1m';

  const art = [
    `${G0}  ██████╗  █████╗  ██╗     ██╗██╗   ██╗███████╗`,
    `${G1}  ██╔══██╗██╔══██╗ ██║     ██║██║   ██║██╔════╝`,
    `${G2}  ██████╔╝███████║ ██║     ██║██║   ██║███████╗`,
    `${G3}  ██╔══██╗██╔══██║ ██║     ██║██║   ██║╚════██║`,
    `${G4}  ██████╔╝██║  ██║ ███████╗██║╚██████╔╝███████║`,
    `${G5}  ╚═════╝ ╚═╝  ╚═╝ ╚══════╝╚═╝ ╚═════╝ ╚══════╝`,
    `${G6}`,
  ];

  const ANSI_RE = /\x1b\[[0-9;]*m/g;
  const TARGET  = 56;
  const BORDER  = '\u2500'.repeat(TARGET + 2);

  const servers = client.guilds.cache.size;
  const members = client.guilds.cache.reduce((n, g) => n + g.memberCount, 0);

  function pad(line) {
    const visible = line.replace(ANSI_RE, '').length;
    return line + ' '.repeat(Math.max(0, TARGET - visible));
  }

  const nodeVer    = `Node ${process.version}  \u2022  discord.js v14  \u2022  sql.js`;
  const serverLine = `Servers: ${C4}${b}${servers}${R}${BD}   Members: ${C4}${b}${members}${R}`;
  const serverVis  = `Servers: ${servers}   Members: ${members}`.length;

  const lines = [
    '',
    `  ${BD}\u250c${BORDER}\u2510${R}`,
    `  ${BD}\u2502${R}${' '.repeat(TARGET + 2)}${BD}\u2502${R}`,
    ...art.map(l => `  ${BD}\u2502${R} ${pad(l)}${R} ${BD}\u2502${R}`),
    `  ${BD}\u2502${R}${' '.repeat(TARGET + 2)}${BD}\u2502${R}`,
    `  ${BD}\u251c${BORDER}\u2524${R}`,
    `  ${BD}\u2502${R}  ${C4}${b}Security & Moderation Bot${R}${' '.repeat(TARGET - 25)}${BD}\u2502${R}`,
    `  ${BD}\u2502${R}  ${BD}${nodeVer}${R}${' '.repeat(Math.max(0, TARGET - 2 - nodeVer.length))}${BD}\u2502${R}`,
    `  ${BD}\u2502${R}${' '.repeat(TARGET + 2)}${BD}\u2502${R}`,
    `  ${BD}\u2502${R}  ${BD}${serverLine}${R}${' '.repeat(Math.max(0, TARGET - 2 - serverVis))}${BD}\u2502${R}`,
    `  ${BD}\u2514${BORDER}\u2518${R}`,
    '',
  ];

  console.log(lines.join('\n'));
  console.log(`  ${G1}Created by fr4ct4l${R}\n`);
  console.log(`  ${BD}>>  ${R}Logged in as ${C4}${b}${client.user.tag}${R}\n`);
}
