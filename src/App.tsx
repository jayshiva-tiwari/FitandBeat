/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/Layout';
import Onboarding from './pages/Onboarding';
import Plan from './pages/Plan';
import ActivityTracker from './pages/ActivityTracker';
import History from './pages/History';
import Coach from './pages/Coach';
import Sports from './pages/Sports';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/activity" element={<ActivityTracker />} />
          <Route path="/history" element={<History />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/community" element={<Community />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
