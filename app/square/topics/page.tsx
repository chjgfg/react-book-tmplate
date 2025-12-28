// 话题广场
"use client";

import { Hash, MessageCircle, TrendingUp, ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";

const TOPICS = [
    { name: "React19新特性", heat: 12400, posts: 450, color: "text-blue-500" },
    { name: "开发者如何应对AI", heat: 8900, posts: 320, color: "text-orange-500" },
    { name: "远程办公的利弊", heat: 5600, posts: 180, color: "text-emerald-500" },
];

export default function TopicsPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <BackButton />
                <h1 className="text-4xl font-black text-slate-900 my-12 tracking-tight">热门话题</h1>
                <div className="grid gap-6">
                    {TOPICS.map((topic, i) => (
                        <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl font-black shadow-sm ${topic.color}`}>
                                    #
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900">{topic.name}</h4>
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 热度 {topic.heat}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3" /> {topic.posts} 讨论
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}