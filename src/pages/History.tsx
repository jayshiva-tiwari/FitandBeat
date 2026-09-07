import { Calendar, Clock, Flame, Activity } from 'lucide-react';

const HISTORY = [
  { date: 'Today', type: 'Running', duration: '30 min', distance: '4.2 km', calories: '320 kcal', score: 85 },
  { date: 'Yesterday', type: 'Badminton', duration: '45 min', distance: '-', calories: '410 kcal', score: 92 },
  { date: 'Sep 5, 2026', type: 'Walking', duration: '20 min', distance: '2.1 km', calories: '110 kcal', score: 70 },
  { date: 'Sep 4, 2026', type: 'Yoga', duration: '25 min', distance: '-', calories: '85 kcal', score: 75 },
];

export default function History() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Activity History</h1>
        <p className="text-slate-500 mt-1">Review your past workouts and activities</p>
      </div>

      <div className="flex flex-col gap-4">
        {HISTORY.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-100 transition cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">{item.type}</h3>
                <p className="text-sm font-medium text-slate-500">{item.date}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8">
               <div className="flex flex-col">
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Duration</span>
                 <span className="font-bold text-slate-700 flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400" /> {item.duration}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Distance</span>
                 <span className="font-bold text-slate-700">{item.distance}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Calories</span>
                 <span className="font-bold text-slate-700 flex items-center gap-1"><Flame className="w-4 h-4 text-orange-400" /> {item.calories}</span>
               </div>
               <div className="flex flex-col items-end sm:w-16">
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Score</span>
                 <span className="font-bold text-indigo-600 text-lg">{item.score}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
