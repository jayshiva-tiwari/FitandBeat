import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix imports from moving one level deeper for app/(app) routes
  if (filePath.includes('(app)')) {
    content = content.replace(/from '\.\.\//g, "from '../../src/");
  } else {
    // app/auth, app/onboarding, app/page.tsx
    content = content.replace(/from '\.\.\//g, "from '../src/");
  }

  // Replace react-router-dom hooks
  content = content.replace(/import\s+\{.*useNavigate.*\}\s+from\s+['"]react-router-dom['"];?/g, 'import { useRouter } from "next/navigation";');
  content = content.replace(/import\s+\{.*useSearchParams.*\}\s+from\s+['"]react-router-dom['"];?/g, 'import { useSearchParams } from "next/navigation";');
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');

  // Fix index.css in layout
  if (filePath.endsWith('layout.tsx')) {
    // handled
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

migrateDir('./app');
console.log('Done fixing imports');
