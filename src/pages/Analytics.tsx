import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Flame, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', activeMins: 45 },
  { name: 'Tue', activeMins: 30 },
  { name: 'Wed', activeMins: 60 },
  { name: 'Thu', activeMins: 20 },
  { name: 'Fri', activeMins: 50 },
  { name: 'Sat', activeMins: 90 },
  { name: 'Sun', activeMins: 0 },
];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Track your progress over time</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Weekly Active Mins', value: '295', icon: Activity, color: 'text-blue-500' },
          { label: 'Total Calories', value: '1,840', icon: Flame, color: 'text-orange-500' },
          { label: 'Current Streak', value: '5 Days', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Avg FitandBeat Score', value: '82', icon: Activity, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className={`flex items-center gap-2 font-medium text-slate-500`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="truncate">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Active Minutes (This Week)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 500 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 500 }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="activeMins" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-2xl p-6 flex items-start gap-4 border border-indigo-100">
         <div className="bg-white p-3 rounded-xl text-indigo-600 shadow-sm shrink-0">
           <Activity className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-indigo-900">AI Insight</h4>
           <p className="text-indigo-700 mt-1 font-medium leading-relaxed">
             You are most active on weekends, but your weekday activity has dropped by 15% compared to last week. Try scheduling a 15-minute walk on Wednesday to keep your momentum going!
           </p>
         </div>
      </div>
    </div>
  );
}
