"use client";
import { Trophy, Star, Users, MapPin, ChevronRight, Search } from 'lucide-react';
import Link from "next/link";

const SPORTS = [
  { name: 'Badminton', image: 'bg-blue-500', difficulty: 'Beginner', location: 'Indoor', users: '2.4k' },
  { name: 'Football', image: 'bg-green-500', difficulty: 'Intermediate', location: 'Outdoor', users: '5.1k' },
  { name: 'Cycling', image: 'bg-orange-500', difficulty: 'Beginner', location: 'Outdoor', users: '3.8k' },
  { name: 'Swimming', image: 'bg-cyan-500', difficulty: 'Intermediate', location: 'Both', users: '1.2k' },
  { name: 'Basketball', image: 'bg-red-500', difficulty: 'Advanced', location: 'Indoor', users: '2.1k' },
  { name: 'Tennis', image: 'bg-yellow-500', difficulty: 'Intermediate', location: 'Outdoor', users: '1.5k' },
];

export default function Sports() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Discover Sports</h1>
          <p className="text-slate-500 mt-1">Find your next favorite activity</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
          <Star className="w-5 h-5" /> Find Your Sport (AI)
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search sports, categories, or locations..." 
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 font-medium text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPORTS.map((sport) => (
          <div key={sport.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition">
            <div className={`h-32 ${sport.image} p-4 flex items-end relative`}>
               <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                 {sport.difficulty}
               </div>
               <h3 className="text-2xl font-extrabold text-white">{sport.name}</h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {sport.location}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {sport.users} players</span>
              </div>
              <button className="w-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
