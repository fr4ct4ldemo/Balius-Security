const fs = require('fs');
const path = require('path');
const root = process.cwd();
const helpPath = path.join(root, 'utils', 'helpData.js');
const helpText = fs.readFileSync(helpPath, 'utf8');
const cmdRegex = /\[\s*['\"](`?)([^'\"]+?)\1['\"]\s*,/g;
let m;
const helpCmds = [];
while ((m = cmdRegex.exec(helpText)) !== null) {
  const cmd = m[2].trim();
  if (cmd.startsWith('/') || cmd.startsWith('b!')) {
    helpCmds.push(cmd.replace(/^\//, '').replace(/^b!/, '').trim());
  }
}
const uniqueHelp = [...new Set(helpCmds)].sort();
const actual = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) {
      actual.push(path.basename(full, '.js'));
    }
  }
}
walk(path.join(root, 'commands'));
const uniqueActual = [...new Set(actual)].sort();
const missing = uniqueHelp.filter(c => !uniqueActual.includes(c));
const extra = uniqueActual.filter(c => !uniqueHelp.includes(c));
console.log('helpCount', uniqueHelp.length);
console.log('actualCount', uniqueActual.length);
console.log('missingCommands', JSON.stringify(missing, null, 2));
console.log('extraFirst50', JSON.stringify(extra.slice(0, 50), null, 2));
