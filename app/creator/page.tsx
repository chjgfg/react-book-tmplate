// 成为作家 & 达人中心
"use client";

import { motion } from "framer-motion";
import { PenTool, BarChart3, Users, Star, Award, Plus, ChevronRight, BookOpen } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function CreatorHub() {
    const stats = [
        { label: "文章阅读", value: "12.8k", icon: <BarChart3 className="w-4 h-4" /> },
        { label: "粉丝总数", value: "856", icon: <Users className="w-4 h-4" /> },
        { label: "获得点赞", value: "3.2k", icon: <Star className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <BackButton />
                
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end my-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">创作中心</h1>
                        <p className="text-slate-500 font-medium mt-2">在这里记录技术思考，连接全球开发者。</p>
                    </div>
                    <Link href="/creator/publish">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
                            <Plus className="w-5 h-5" /> 发布新文章
                        </button>
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* 数据看板 */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl w-fit mb-4">{stat.icon}</div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* 作家申请进度卡片 */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group"
                        >
                            <Award className="absolute -right-8 -top-8 w-48 h-48 text-white/5 rotate-12" />
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="max-w-md">
                                    <div className="flex items-center gap-2 mb-4 text-yellow-500">
                                        <Award className="w-5 h-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">成为签约作家</span>
                                    </div>
                                    <h2 className="text-2xl font-black mb-4 tracking-tight">开启你的技术写作变现之旅</h2>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                        累计发布 5 篇优质技术文章且粉丝达到 100 即可申请。享受流量分成与实体书出版机会。
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>当前申请进度</span>
                                            <span className="text-yellow-500">60%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} className="h-full bg-yellow-500" />
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:bg-yellow-500 hover:text-white transition-all whitespace-nowrap">
                                    立即申请认证
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* 内容管理侧边栏 */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">内容管理</h3>
                            <div className="space-y-4">
                                <Link href="/creator/posts" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                                    <span className="text-sm font-bold text-slate-700">我的发布</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
                                </Link>
                                <Link href="/creator/drafts" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                                    <span className="text-sm font-bold text-slate-700">草稿箱</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}