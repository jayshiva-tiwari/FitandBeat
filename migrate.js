import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace react-router-dom Link with next/link
  content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];?/g, 'import Link from "next/link";');
  content = content.replace(/to=/g, 'href=');
  // Add "use client" to the top
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = '"use client";\n' + content;
  }
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

migrateDir('./src/pages');
migrateDir('./src/layouts');
migrateDir('./src/components');
console.log('Done migrating files');
