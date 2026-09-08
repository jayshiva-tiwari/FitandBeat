"use client";
import { User, Award, Flame, Target } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-8 pb-10 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="relative z-10 w-32 h-32 bg-white rounded-full p-2 mt-12 md:mt-16 shrink-0 shadow-lg">
           <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
             <User className="w-12 h-12" />
           </div>
        </div>

        <div className="relative z-10 md:mt-20 flex-1">
          <h1 className="text-3xl font-extrabold text-slate-900">{user?.name || 'User'}</h1>
          <p className="text-slate-500 font-medium text-lg mb-4">Level 3 • Active Explorer</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2">
               <Target className="w-4 h-4" /> Goal: Become more active
             </span>
             <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-bold flex items-center gap-2">
               <Flame className="w-4 h-4" /> 7 Day Streak
             </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" /> Badges
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-2xl shadow-inner border-4 border-white ring-2 ring-yellow-50">🏆</div>
              <span className="text-xs font-bold text-slate-700">First Step</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl shadow-inner border-4 border-white ring-2 ring-orange-50">🔥</div>
              <span className="text-xs font-bold text-slate-700">7-Day Streak</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shadow-inner border-4 border-white ring-2 ring-blue-50">🏃‍♂️</div>
              <span className="text-xs font-bold text-slate-700">Active Explorer</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 opacity-40 grayscale">
              <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-2xl shadow-inner border-4 border-white ring-2 ring-slate-50">⭐</div>
              <span className="text-xs font-bold text-slate-700">Challenge Champ</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Level Progress</h3>
          <div className="text-4xl font-extrabold text-indigo-600 mb-1">2,450 <span className="text-lg text-slate-400 font-medium">XP</span></div>
          <p className="text-sm font-medium text-slate-500 mb-6">550 XP to Level 4</p>
          
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-2">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>Level 3</span>
            <span>Level 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
