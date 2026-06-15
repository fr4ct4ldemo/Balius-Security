const fs = require('fs');
const path = require('path');
const root = process.cwd();
const helpPath = path.join(root, 'utils', 'helpData.js');
const text = fs.readFileSync(helpPath, 'utf8');
const regex = /\[\s*['\"]`?([^'\"]+?)`?['\"]/g;
let m;
let helpCmds = [];
while ((m = regex.exec(text)) !== null) {
  helpCmds.push(m[1].replace(/\//g, '').replace(/b!/g, '').trim());
}
helpCmds = [...new Set(helpCmds)].sort();
let actual = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) actual.push(path.basename(full, '.js'));
  }
}
walk(path.join(root, 'commands'));
actual = [...new Set(actual)].sort();
const missing = helpCmds.filter(c => !actual.includes(c));
const extra = actual.filter(c => !helpCmds.includes(c));
console.log('HELP_COUNT', helpCmds.length);
console.log('ACTUAL_COUNT', actual.length);
console.log('MISSING', JSON.stringify(missing, null, 2));
console.log('EXTRA_FIRST_50', JSON.stringify(extra.slice(0, 50), null, 2));
