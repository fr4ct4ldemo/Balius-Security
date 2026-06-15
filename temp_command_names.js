const fs = require('fs');
const path = require('path');
const root = process.cwd();
const cmds = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) {
      const text = fs.readFileSync(full, 'utf8');
      const nameMatch = text.match(/\.setName\(\s*['\"]([^'\"]+)['\"]\s*\)/);
      if (nameMatch) cmds.push({file: path.relative(root, full), name: nameMatch[1]});
      else cmds.push({file: path.relative(root, full), name: path.basename(full, '.js')});
    }
  }
}
walk(path.join(root,'commands'));
fs.writeFileSync(path.join(root,'temp_command_names.json'), JSON.stringify(cmds, null, 2));
console.log('WROTE', path.join(root,'temp_command_names.json'));
