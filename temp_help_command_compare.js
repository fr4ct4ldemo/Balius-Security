const fs = require('fs');
const path = require('path');
const root = process.cwd();
const helpData = require(path.join(root, 'utils', 'helpData.js'));
const helpNames = [];
for (const cat of Object.values(helpData.CATEGORY_DETAILS)) {
  for (const page of cat.pages) {
    for (const entry of page) {
      if (Array.isArray(entry) && entry.length > 0) {
        let cmd = entry[0];
        if (typeof cmd !== 'string') continue;
        cmd = cmd.replace(/`/g, '').trim();
        if (cmd.startsWith('/')) cmd = cmd.slice(1);
        if (cmd.startsWith('b!')) cmd = cmd.slice(2);
        helpNames.push(cmd);
      }
    }
  }
}
const uniqueHelp = [...new Set(helpNames.sort())];

const actualNames = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue;
      walk(full);
    } else if (entry.isFile() && full.endsWith('.js')) {
      try {
        const command = require(full);
        if (command?.data?.name) actualNames.push(command.data.name);
        else if (command?.name) actualNames.push(command.name);
        else actualNames.push(path.basename(full, '.js'));
      } catch (e) {
        actualNames.push(path.basename(full, '.js'));
      }
    }
  }
}
walk(path.join(root, 'commands'));
const uniqueActual = [...new Set(actualNames.sort())];
const missing = uniqueHelp.filter(c => !uniqueActual.includes(c));
const extra = uniqueActual.filter(c => !uniqueHelp.includes(c));
console.log('HELP_COUNT', uniqueHelp.length);
console.log('ACTUAL_COUNT', uniqueActual.length);
console.log('MISSING', JSON.stringify(missing, null, 2));
console.log('HELP_ONLY_FIRST_50', JSON.stringify(uniqueHelp.slice(0, 50), null, 2));
console.log('ACTUAL_ONLY_FIRST_50', JSON.stringify(uniqueActual.slice(0, 50), null, 2));
