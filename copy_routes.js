import fs from 'fs';
import path from 'path';

const map = {
  'src/pages/LandingPage.tsx': 'app/page.tsx',
  'src/pages/Dashboard.tsx': 'app/dashboard/page.tsx',
  'src/pages/Plan.tsx': 'app/plan/page.tsx',
  'src/pages/ActivityTracker.tsx': 'app/activity/page.tsx',
  'src/pages/History.tsx': 'app/history/page.tsx',
  'src/pages/Coach.tsx': 'app/coach/page.tsx',
  'src/pages/Sports.tsx': 'app/sports/page.tsx',
  'src/pages/Challenges.tsx': 'app/challenges/page.tsx',
  'src/pages/Community.tsx': 'app/community/page.tsx',
  'src/pages/Analytics.tsx': 'app/analytics/page.tsx',
  'src/pages/Profile.tsx': 'app/profile/page.tsx',
  'src/pages/Auth.tsx': 'app/auth/page.tsx',
  'src/pages/Onboarding.tsx': 'app/onboarding/page.tsx',
};

for (const [src, dest] of Object.entries(map)) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}
console.log('Routes copied');
