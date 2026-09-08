"use client";
import { MessageSquare, Heart, Share2, Users, UserPlus } from 'lucide-react';

const POSTS = [
  { user: 'Keerthana', time: '2 hours ago', content: 'Just finished my first 5k run! Thanks to FitandBeat for the training plan. 🏃‍♀️✨', likes: 24, comments: 5 },
  { user: 'Rahul', time: '5 hours ago', content: 'Looking for a badminton partner in the MCE campus area for weekend mornings. Anyone interested?', likes: 12, comments: 8 },
  { user: 'FitandBeat Coach', time: '1 day ago', content: 'Consistency is key! Remember that a 10-minute walk is better than 0 minutes. Keep moving! 🚀', likes: 156, comments: 12 },
];

export default function Community() {
  return (
    <div className="flex flex-col gap-8 pb-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Community</h1>
          <p className="text-slate-500 mt-1">Connect, share, and get inspired</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
          <UserPlus className="w-5 h-5" /> Find Buddy
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex shrink-0 items-center justify-center text-indigo-700 font-bold text-xl">A</div>
        <div className="flex-1">
          <textarea 
            placeholder="Share your latest workout or ask for a buddy..." 
            className="w-full bg-slate-50 rounded-xl p-3 outline-none resize-none h-20 text-slate-700 font-medium placeholder:text-slate-400"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition">Post</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {POSTS.map((post, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                {post.user.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900">{post.user}</div>
                <div className="text-xs font-medium text-slate-400">{post.time}</div>
              </div>
            </div>
            <p className="text-slate-700 font-medium mb-4 leading-relaxed">{post.content}</p>
            <div className="flex gap-6 border-t border-slate-100 pt-4">
              <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-medium transition">
                <Heart className="w-5 h-5" /> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 font-medium transition">
                <MessageSquare className="w-5 h-5" /> {post.comments}
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 font-medium transition ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
