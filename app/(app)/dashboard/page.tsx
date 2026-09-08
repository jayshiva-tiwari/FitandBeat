"use client";
import { PlayCircle, Target, Flame, TrendingUp, ChevronRight, Activity, Calendar, Trophy } from 'lucide-react';
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] || 'User';
  
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Morning, {userName} 👋</h1>
          <p className="text-gray-500 mt-1">Ready to crush your goals today?</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-medium">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>7 Day Streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Activity className="w-5 h-5 text-blue-500" /> Steps
          </div>
          <div className="text-3xl font-bold text-gray-900">8,432</div>
          <div className="text-sm text-gray-400">Goal: 10,000</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Target className="w-5 h-5 text-green-500" /> Active Mins
          </div>
          <div className="text-3xl font-bold text-gray-900">42<span className="text-lg text-gray-400 ml-1">/60</span></div>
          <div className="text-sm text-green-600 font-medium">Almost there!</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Flame className="w-5 h-5 text-orange-500" /> Calories
          </div>
          <div className="text-3xl font-bold text-gray-900">450</div>
          <div className="text-sm text-gray-400">Goal: 600</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-indigo-50 w-24 h-24 rounded-full opacity-50"></div>
          <div className="flex items-center gap-2 text-gray-500 font-medium relative z-10">
            <TrendingUp className="w-5 h-5 text-indigo-500" /> FitandBeat Score
          </div>
          <div className="text-3xl font-bold text-indigo-600 relative z-10">78<span className="text-lg text-gray-400 ml-1">/100</span></div>
          <div className="text-sm text-indigo-600 font-medium relative z-10">Top 20% today</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* AI Recommendation */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Activity className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium uppercase tracking-wider">
                <Target className="w-4 h-4" /> Today's AI Recommendation
              </div>
              <h3 className="text-2xl font-bold">Try a 20-minute brisk walk today.</h3>
              <p className="text-indigo-100 max-w-md">Based on your recent activity, a light cardio session will help you hit your daily goal while maintaining recovery.</p>
              <div className="flex gap-3 mt-2">
                <Link href="/activity" className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Start Activity
                </Link>
                <Link href="/plan" className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-medium transition">
                  View Full Plan
                </Link>
              </div>
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Weekly Progress</h3>
              <Link href="/analytics" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[40, 60, 45, 80, 50, 90, 70].map((val, i) => (
                <div key={i} className="w-full bg-gray-50 rounded-t-lg relative group h-full flex items-end justify-center">
                  <div 
                    className="w-full bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-600" 
                    style={{ height: `${val}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-gray-400 px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
             <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Actions</h3>
             <Link href="/activity" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100">
               <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><PlayCircle className="w-5 h-5" /></div>
               <div className="flex-1 font-medium text-gray-900">Log Activity</div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </Link>
             <Link href="/sports" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100">
               <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Trophy className="w-5 h-5" /></div>
               <div className="flex-1 font-medium text-gray-900">Explore Sports</div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </Link>
             <Link href="/challenges" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100">
               <div className="bg-green-100 p-2 rounded-lg text-green-600"><Target className="w-5 h-5" /></div>
               <div className="flex-1 font-medium text-gray-900">Join Challenge</div>
               <ChevronRight className="w-5 h-5 text-gray-400" />
             </Link>
          </div>

          {/* Upcoming Challenge */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Active Challenge</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2.5 rounded-xl text-yellow-600">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">10K Steps Challenge</h4>
                  <p className="text-sm text-gray-500 mt-1">2 days left • 450 participants</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1 text-gray-600">
                  <span>8,432 / 10,000</span>
                  <span>84%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
