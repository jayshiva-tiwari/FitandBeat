"use client";
import { Target, Users, Trophy, Flame } from 'lucide-react';

const CHALLENGES = [
  { title: '7-Day Walking Challenge', desc: 'Walk for at least 30 mins every day.', progress: 80, users: '1.2k', reward: '500 XP', active: true },
  { title: 'Weekend Sports', desc: 'Play any sport for 60 mins this weekend.', progress: 0, users: '850', reward: '300 XP', active: false },
  { title: 'College Step Challenge', desc: 'Inter-department step competition.', progress: 45, users: '4.5k', reward: 'Badge', active: true },
];

export default function Challenges() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Challenges</h1>
        <p className="text-slate-500 mt-1">Push your limits and earn rewards</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHALLENGES.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${c.active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-slate-400">
                <Users className="w-4 h-4" /> {c.users}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1 line-clamp-2">{c.desc}</p>
            </div>

            <div className="mt-auto pt-4">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-500">Progress</span>
                <span className={c.active ? 'text-indigo-600' : 'text-slate-500'}>{c.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${c.active ? 'bg-indigo-600' : 'bg-slate-300'}`} 
                  style={{ width: `${c.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
              <div className="flex items-center gap-1 font-bold text-orange-500 text-sm">
                <Flame className="w-4 h-4" /> {c.reward}
              </div>
              <button className={`px-4 py-2 rounded-lg font-bold text-sm transition ${c.active ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                {c.active ? 'Continue' : 'Join Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
