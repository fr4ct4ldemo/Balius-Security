const fs = require('fs');
const path = require('path');
const root = process.cwd();
const helpData = require(path.join(root, 'utils', 'helpData.js'));
const targetCats = ['utility','config','logging'];
const results = [];
for(const catName of targetCats){
  const cat = helpData.CATEGORY_DETAILS[catName];
  if(!cat) continue;
  for(const page of cat.pages){
    for(const entry of page){
      if(!Array.isArray(entry) || entry.length===0) continue;
      let cmd = entry[0].replace(/`/g,'').trim();
      if(cmd.startsWith('/')) cmd = cmd.slice(1);
      if(cmd.startsWith('b!')) cmd = cmd.slice(2);
      const filename = path.join(root,'commands',catName,`${cmd}.js`);
      let exists = fs.existsSync(filename);
      let prefix = false;
      if(exists){
        const text = fs.readFileSync(filename,'utf8');
        prefix = /prefix\s*:\s*true/.test(text);
      }
      results.push({category:catName,command:cmd,exists,prefix,filename: exists? filename : null});
    }
  }
}
console.log(JSON.stringify(results,null,2));
