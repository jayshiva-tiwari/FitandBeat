import { Sparkles, Calendar as CalendarIcon, Clock, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const PLAN = [
  { day: 'Monday', title: '25 min brisk walking', type: 'Cardio', duration: '25 min', completed: true },
  { day: 'Tuesday', title: '20 min beginner strength', type: 'Strength', duration: '20 min', completed: false },
  { day: 'Wednesday', title: '20 min yoga/stretching', type: 'Flexibility', duration: '20 min', completed: false },
  { day: 'Thursday', title: '30 min walking', type: 'Cardio', duration: '30 min', completed: false },
  { day: 'Friday', title: '25 min strength workout', type: 'Strength', duration: '25 min', completed: false },
  { day: 'Saturday', title: '45 min badminton', type: 'Sport', duration: '45 min', completed: false },
  { day: 'Sunday', title: 'Recovery + stretching', type: 'Recovery', duration: '15 min', completed: false },
];

export default function Plan() {
  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative overflow-hidden">
        <div className="absolute -left-12 -bottom-12 opacity-10">
          <Sparkles className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-purple-200 font-semibold uppercase tracking-wider text-sm mb-3">
            <Sparkles className="w-5 h-5" /> AI Personalized Plan
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Your Weekly Blueprint</h1>
          <p className="text-indigo-100 max-w-md">
            This plan adapts to your activity history. Complete activities to help the AI refine your recommendations.
          </p>
        </div>
        <div className="relative z-10 bg-white/20 p-4 rounded-2xl backdrop-blur-sm text-center shrink-0">
          <div className="text-sm font-medium text-indigo-100 mb-1">Week of Sep 7</div>
          <div className="text-3xl font-bold">1/7</div>
          <div className="text-sm font-medium text-indigo-200">Completed</div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-indigo-600" />
          This Week's Schedule
        </h2>
        
        <div className="grid gap-3">
          {PLAN.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-center p-4 rounded-2xl border transition-all",
                item.completed 
                  ? "bg-slate-50 border-slate-200" 
                  : index === 1 ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-white border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="w-24 shrink-0 font-bold text-slate-500">{item.day}</div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 ml-4 sm:ml-0 border-l sm:border-0 border-slate-200 pl-4 sm:pl-0">
                <div className={cn("font-bold text-lg", item.completed ? "text-slate-500 line-through" : "text-slate-900")}>
                  {item.title}
                </div>
                <div className="flex gap-3 text-sm font-medium text-slate-500">
                   <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {item.type}</span>
                   <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.duration}</span>
                </div>
              </div>
              <div className="shrink-0 ml-4">
                {item.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : index === 1 ? (
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition">
                    Start
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
