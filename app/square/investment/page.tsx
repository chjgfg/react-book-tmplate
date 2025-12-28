// 新书投资
"use client";

import { TrendingUp, Coins, Target, Info } from "lucide-react";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";

export default function InvestmentPage() {
    return (
        <div className="min-h-screen bg-emerald-500 pt-24 pb-20 text-white">
            <div className="max-w-4xl mx-auto px-6">
                <BackButton className="text-white hover:bg-white/20" />
                <div className="my-12">
                    <h1 className="text-5xl font-black tracking-tighter mb-4">新书投资中心</h1>
                    <p className="text-emerald-100 font-medium">挖掘技术领域的下个爆款，投资即是共创。</p>
                </div>

                <div className="bg-white rounded-[3rem] p-10 text-slate-900 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="w-full md:w-48 h-64 bg-slate-100 rounded-3xl flex items-center justify-center text-5xl shadow-inner">
                            📘
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">当前热推</span>
                            </div>
                            <h2 className="text-3xl font-black mb-4">《分布式一致性实战案例集》</h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">由大厂中间件团队出品，涵盖 Raft/Paxos 的真实故障排查案例。投资后可获首版电子书及后期积分分红。</p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-xs font-black">
                                    <span>众筹进度 (85,000 / 100,000 pt)</span>
                                    <span className="text-emerald-600">85%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-emerald-500" />
                                </div>
                            </div>

                            <button className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 transition-all active:scale-95">
                                投入积分进行投资
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}