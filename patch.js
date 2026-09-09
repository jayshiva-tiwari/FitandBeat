const fs = require('fs');
let code = fs.readFileSync('app/(app)/coach/page.tsx', 'utf8');
code = code.replace(
  "setMessages(prev => [...prev, { role: 'assistant', content: \"Sorry, I'm having trouble connecting to the server right now. Please try again later.\" }]);",
  "setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Unknown error'}. Please try again.` }]);"
);
fs.writeFileSync('app/(app)/coach/page.tsx', code);
