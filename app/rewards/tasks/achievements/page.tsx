// 我的成就/勋章墙
"use client";

import BackButton from "@/components/BackButton";
import { Award, Lock, ShieldCheck } from "lucide-react";

const MEDALS = [
    { id: 1, name: "初级读者", desc: "阅读时长满 1 小时", icon: "🌱", unlocked: true },
    { id: 2, name: "知识传播者", desc: "分享书籍超过 10 次", icon: "📢", unlocked: true },
    { id: 3, name: "React 专家", desc: "读完 5 本 React 相关书籍", icon: "⚛️", unlocked: false },
    { id: 4, name: "硬核架构师", desc: "连续签到 100 天", icon: "🏰", unlocked: false },
];

export default function AchievementPage() {
    return (
        <div className="min-h-screen bg-[#ffffff] pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <BackButton />
                <h1 className="text-4xl font-black text-slate-900 my-10 flex items-center gap-3">
                    <Award className="w-10 h-10 text-yellow-500" /> 成就勋章墙
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {MEDALS.map((medal) => (
                        <div key={medal.id} className={`p-8 rounded-[3rem] text-center border transition-all ${
                            medal.unlocked ? 'bg-white border-white shadow-xl' : 'bg-slate-50 border-slate-100 opacity-50'
                        }`}>
                            <div className="text-6xl mb-6 grayscale-0 group-hover:scale-110 transition-transform">
                                {medal.unlocked ? medal.icon : "🔒"}
                            </div>
                            <h4 className="font-black text-slate-900 mb-2">{medal.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{medal.desc}</p>
                            {!medal.unlocked && (
                                <div className="mt-4 px-3 py-1 bg-slate-200 rounded-full text-[8px] font-black uppercase text-slate-500 tracking-widest">
                                    未解锁
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}