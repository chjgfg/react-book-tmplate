// 关注收藏 & 浏览记录
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Clock, Trash2, ExternalLink, BookOpen, Tag } from "lucide-react";
import BackButton from "@/components/BackButton";

const TABS = [
    { id: 'fav', label: '我的收藏', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'history', label: '浏览记录', icon: <Clock className="w-4 h-4" /> }
];

export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState('fav');

    // 模拟数据
    const items = {
        fav: [
            { id: 1, title: "Next.js 15 全栈架构最佳实践", type: "书籍", tag: "全栈", time: "收藏于 2天前" },
            { id: 2, title: "深入理解 React Server Components", type: "文章", tag: "前端", time: "收藏于 1周前" },
        ],
        history: [
            { id: 101, title: "Tailwind CSS 魔法指南", type: "书籍", tag: "UI", time: "1小时前看过" },
            { id: 102, title: "TypeScript 高级类型体操", type: "文章", tag: "编程语言", time: "昨天看过" },
        ]
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <BackButton />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between my-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">足迹与收藏</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">回顾你在这里留下的每一个学习足迹。</p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" /> 清空{activeTab === 'fav' ? '收藏' : '记录'}
                    </button>
                </div>

                {/* Tab 导航 */}
                <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit mb-12">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                                activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* 列表渲染 */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {items[activeTab as keyof typeof items].map((item) => (
                                <div key={item.id} className="group p-6 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:flex w-14 h-14 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                                            {item.type === "书籍" ? <BookOpen className="text-blue-500 w-6 h-6" /> : <Tag className="text-emerald-500 w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.tag}</span>
                                                <h4 className="font-bold text-slate-800">{item.title}</h4>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{item.time}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-blue-600 hover:shadow-md transition-all">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}