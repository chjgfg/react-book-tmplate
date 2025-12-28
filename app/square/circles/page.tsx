// 热门角色 & 点点圈 
"use client";

import { UserCircle2, Globe, ArrowRight, MessageCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

const CIRCLES = [
    { name: "Rust 深度交流圈", icon: "🦀", members: "1.2w", leader: "Rustacean" },
    { name: "LeetCode 每日一题", icon: "💡", members: "5.6w", leader: "Algorithm_Master" },
    { name: "独立开发者联盟", icon: "🚀", members: "8k", leader: "Solopreneur" },
];

export default function CirclesPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <BackButton />
                <h1 className="text-4xl font-black text-slate-900 my-10">点点圈与热门角色</h1>

                <div className="grid gap-8">
                    {CIRCLES.map((circle, i) => (
                        <div key={i} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
                                    {circle.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">{circle.name}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs font-bold text-slate-400">主理人: {circle.leader}</span>
                                        <span className="text-xs font-black text-blue-600">{circle.members} 位成员</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 transition-colors">
                                    <MessageCircle className="w-6 h-6" />
                                </button>
                                <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors">
                                    加入圈子
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}