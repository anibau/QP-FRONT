const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcRoot = path.join(root, 'src');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

const replacements = [
  [/from ['"]\.\.\/\.\.\/app\/utils\//g, "from '../../utils/"],
  [/from ['"]\.\.\/\.\.\/app\/config\//g, "from '../../config/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/app\/utils\//g, "from '../../../utils/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/app\/config\//g, "from '../../../config/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/\.\.\/src\/controllers\//g, "from '../../../controllers/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/\.\.\/src\/components\//g, "from '../../../components/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/src\/controllers\//g, "from '../../controllers/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/src\/services\//g, "from '../../services/"],
  [/from ['"]\.\.\/\.\.\/src\/controllers\//g, "from '../controllers/"],
  [/from ['"]\.\.\/\.\.\/src\/services\//g, "from '../services/"],
  [/from ['"]\.\.\/src\/controllers\//g, "from '../controllers/"],
  [/from ['"]\.\.\/src\/services\//g, "from '../services/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/src\/services\/files\/download['"]/g, "from '../../services/files/download'"],
  [/from ['"]\.\.\/\.\.\/\.\.\/src\/components\/file\/FileSelector['"]/g, "from '../../components/file/FileSelector'"],
  [/from ['"]\.\.\/\.\.\/components\//g, "from '../../ui/"],
  [/from ['"]\.\.\/components\//g, "from '../../ui/"],
  [/from ['"]\.\.\/screens\//g, "from '../../screens/"],
  [/from ['"]\.\.\/config\//g, "from '../../config/"],
  [/from ['"]\.\.\/utils\//g, "from '../../utils/"],
  [/from ['"]\.\.\/redux\//g, "from '../../redux/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/components\/general\//g, "from '../../general/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/components\/container\//g, "from '../../container/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/components\/modal\//g, "from '../../modal/"],
  [/from ['"]\.\.\/\.\.\/\.\.\/components\/pages\//g, "from '../"],
  [/from ['"]\.\.\/\.\.\/components\/pages\/categories\//g, "from '../"],
  [/from ['"]\.\.\/\.\.\/components\/creditcard\//g, "from '../../creditcard/"],
  [/from ['"]\.\.\/\.\.\/components\/general\//g, "from '../../general/"],
  [/from ['"]\.\.\/\.\.\/components\/container\//g, "from '../../container/"],
  [/from ['"]\.\.\/\.\.\/components\/modal\//g, "from '../../modal/"],
  [/from ['"]\.\.\/components\/general\//g, "from '../general/"],
  [/from ['"]\.\.\/components\/pages\/categories\//g, "from '../../pages/categories/"],
  [/from ['"]\.\.\/components\/creditcard\//g, "from '../creditcard/"],
  [/from ['"]\.\.\/components\/container\//g, "from '../container/"],
  [/from ['"]\.\.\/components\/modal\//g, "from '../modal/"],
  [/from ['"]\.\.\/components\/config\//g, "from '../config/"],
  [/from ['"]\.\.\/\.\.\/components\/config\//g, "from '../../config/"],
  [/from ['"]\.\.\/\.\.\/components\/general\//g, "from '../../general/"],
  [/from ['"]\.\.\/\.\.\/components\/container\//g, "from '../../container/"],
  [/from ['"]\.\.\/\.\.\/components\/modal\//g, "from '../../modal/"],
  [/from ['"]\.\.\/\.\.\/components\/pages\//g, "from '../../pages/"],
];

let changed = 0;
for (const filePath of walk(srcRoot)) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    changed++;
    console.log('fixed', path.relative(root, filePath));
  }
}

console.log(`\nTotal files updated: ${changed}`);
