"use client";
import Link from "next/link";
import { Activity, Target, Trophy, Users, BarChart } from 'lucide-react';
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="px-6 py-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Activity className="w-6 h-6" /> FitandBeat
        </div>
        <div className="flex gap-4">
          <Link href="/auth" className="text-slate-600 font-medium hover:text-indigo-600 transition pt-2">Login</Link>
          <Link href="/auth?tab=register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Sign Up</Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Move More. <br className="hidden md:block"/> Play More. <br className="hidden md:block"/> Live Better.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl">
            Your personalized companion for fitness, sports and healthier everyday habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth?tab=register" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Get Started
            </Link>
            <Link href="/dashboard" className="bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-4 rounded-xl font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
              Explore Demo
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
