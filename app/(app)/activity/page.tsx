"use client";
import { useState, useEffect } from 'react';
import { Play, Pause, Square, Activity, Flame, MapPin } from 'lucide-react';
import { cn } from '@/src/utils/cn';

export default function ActivityTracker() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const formatTime = (seconds: number) => {
    const getSeconds = `0${(seconds % 60)}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-2xl mx-auto items-center pt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Activity</h1>
        <p className="text-slate-500 font-medium">Running • Outdoor</p>
      </div>

      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-50">
          {isActive && !isPaused && (
            <div className="h-full bg-indigo-500 animate-pulse w-full"></div>
          )}
        </div>
        
        <div className="text-7xl font-extrabold text-slate-900 tracking-tight tabular-nums mb-12">
          {formatTime(time)}
        </div>

        <div className="grid grid-cols-3 w-full gap-4 text-center mb-12">
           <div>
             <div className="flex justify-center mb-1"><MapPin className="w-6 h-6 text-blue-500" /></div>
             <div className="text-2xl font-bold text-slate-900">{(time * 0.002).toFixed(2)}</div>
             <div className="text-sm font-medium text-slate-400">km</div>
           </div>
           <div>
             <div className="flex justify-center mb-1"><Flame className="w-6 h-6 text-orange-500" /></div>
             <div className="text-2xl font-bold text-slate-900">{Math.floor(time * 0.15)}</div>
             <div className="text-sm font-medium text-slate-400">kcal</div>
           </div>
           <div>
             <div className="flex justify-center mb-1"><Activity className="w-6 h-6 text-green-500" /></div>
             <div className="text-2xl font-bold text-slate-900">{isActive ? '142' : '--'}</div>
             <div className="text-sm font-medium text-slate-400">bpm</div>
           </div>
        </div>

        <div className="flex items-center gap-6">
          {!isActive ? (
            <button 
              onClick={handleStart}
              className="bg-indigo-600 text-white w-24 h-24 rounded-full flex items-center justify-center hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              <Play className="w-10 h-10 ml-2" />
            </button>
          ) : (
            <>
              <button 
                onClick={handlePauseResume}
                className="bg-slate-100 text-slate-700 w-20 h-20 rounded-full flex items-center justify-center hover:bg-slate-200 transition"
              >
                {isPaused ? <Play className="w-8 h-8 ml-1" /> : <Pause className="w-8 h-8" />}
              </button>
              <button 
                onClick={handleStop}
                className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg shadow-red-200"
              >
                <Square className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <button className="text-indigo-600 font-bold hover:underline">
        Log Activity Manually Instead
      </button>
    </div>
  );
}
