const fs = require('fs');
let code = fs.readFileSync('app/(app)/coach/page.tsx', 'utf8');
code = code.replace(
  "if (!response.ok) {\n        throw new Error('Failed to fetch response');\n      }",
  "if (!response.ok) {\n        const errData = await response.json();\n        throw new Error(errData.error || 'Failed to fetch response');\n      }"
);
fs.writeFileSync('app/(app)/coach/page.tsx', code);
