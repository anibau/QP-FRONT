const fs = require('fs');
const path = require('path');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

let changed = 0;
for (const filePath of walk(path.join(__dirname, '..', 'src'))) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/from '([^'\n]+)"/g, "from '$1'");
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    changed++;
    console.log('fixed', path.relative(path.join(__dirname, '..'), filePath));
  }
}
console.log(`Total: ${changed}`);
