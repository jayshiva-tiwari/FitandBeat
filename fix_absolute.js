import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/from\s+['"]\.\.\/.*?src\//g, "from '@/src/");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/src\//g, "from '@/src/");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/src\//g, "from '@/src/");
  content = content.replace(/from\s+['"]\.\.\/src\//g, "from '@/src/");

  fs.writeFileSync(filePath, content);
}

function migrateDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      migrateDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

migrateDir('./app');
console.log('Done fixing absolute imports');
