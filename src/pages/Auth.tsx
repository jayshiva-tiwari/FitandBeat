import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [tab, setTab] = useState(initialTab);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'register') {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-3xl">
            <Activity className="w-8 h-8" /> FitandBeat
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setTab('login')}
              className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition", tab === 'login' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              Login
            </button>
            <button 
              onClick={() => setTab('register')}
              className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition", tab === 'register' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'register' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition font-medium" />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input required type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition font-medium" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-indigo-700 transition">
              {tab === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
