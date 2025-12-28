// 红包广场
"use client";

import { Wallet, Timer, Zap } from "lucide-react";
import BackButton from "@/components/BackButton";

const PACKETS = [
    { id: 1, sender: "Next.js 官方", amount: "￥1000", total: 100, left: 12, status: "进行中" },
    { id: 2, sender: "架构师社区", amount: "5000 积分", total: 50, left: 0, status: "已领完" },
];

export default function RedPacketPage() {
    return (
        <div className="min-h-screen bg-red-500 pt-24 pb-20">
            <div className="max-w-2xl mx-auto px-6">
                <BackButton className="text-white hover:bg-white/20" />
                <h1 className="text-4xl font-black text-white my-10 flex items-center gap-4">
                    <Wallet className="w-10 h-10" /> 红包广场
                </h1>
                
                <div className="space-y-4">
                    {PACKETS.map(p => (
                        <div key={p.id} className="bg-white rounded-[2rem] p-8 flex items-center justify-between shadow-xl">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black">
                                    🧧
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900">{p.sender} 的红包</h4>
                                    <p className="text-xs font-bold text-red-500 mt-1">{p.amount}</p>
                                </div>
                            </div>
                            <button className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                                p.left > 0 ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-100 text-slate-400'
                            }`}>
                                {p.left > 0 ? `抢 (剩${p.left}个)` : '已领完'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}