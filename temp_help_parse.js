const fs = require('fs');
const path = require('path');
const root = process.cwd();
const helpPath = path.join(root, 'utils', 'helpData.js');
const text = fs.readFileSync(helpPath, 'utf8');
const lines = text.split(/\r?\n/);
const helpCmds = [];
for (const line of lines) {
  const m = line.match(/\[\s*['\"](`?)([^'\"]+?)\1['\"]\s*,/);
  if (!m) continue;
  const cmd = m[2].trim();
  if (/^[/`]?[b!]?[a-zA-Z0-9]/.test(cmd)) {
    helpCmds.push(cmd.replace(/^`/, '').replace(/`$/, ''));
  }
}
const normalized = [...new Set(helpCmds.map(c => c.replace(/^\//, '').replace(/^b!/, '').trim()))].sort();
const actual = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) actual.push(path.basename(full, '.js'));
  }
}
walk(path.join(root, 'commands'));
const actualSet = new Set(actual);
const missing = normalized.filter(c => !actualSet.has(c));
const extra = actual.filter(c => !normalized.includes(c));
console.log('PARSED_HELP_COMMANDS', normalized.length);
console.log(normalized.join(', '));
console.log('MISSING', JSON.stringify(missing, null, 2));
console.log('EXTRA_FIRST_50', JSON.stringify(extra.slice(0, 50), null, 2));
