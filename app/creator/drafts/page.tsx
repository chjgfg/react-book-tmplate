// 草稿箱
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Edit3,
    Trash2,
    Clock,
    ChevronRight,
    FileWarning,
    Search
} from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

// 模拟草稿数据
const INITIAL_DRAFTS = [
    { id: 1, title: "深度解析 React 19 的新特性", lastSaved: "10分钟前", wordCount: 1240 },
    { id: 2, title: "现代 CSS 布局：从 Grid 到容器查询", lastSaved: "昨天 14:20", wordCount: 856 },
    { id: 3, title: "如何优化 Next.js 应用的 LCP 指标", lastSaved: "3天前", wordCount: 420 },
];

export default function DraftsPage() {
    const [drafts, setDrafts] = useState(INITIAL_DRAFTS);
    const [searchQuery, setSearchQuery] = useState("");

    const deleteDraft = (id: number) => {
        if (confirm("确定要删除这份草稿吗？删除后无法恢复。")) {
            setDrafts(prev => prev.filter(d => d.id !== id));
        }
    };

    const filteredDrafts = drafts.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <BackButton />

                <div className="flex flex-col md:flex-row md:items-center justify-between my-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            草稿箱 <span className="text-blue-600 text-xl">({drafts.length})</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">所有未发布的灵感都在这里安全存储。</p>
                    </div>

                    {/* 搜索过滤 */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="搜索草稿..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 pr-6 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-sm font-bold min-w-[260px] shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredDrafts.length > 0 ? (
                            filteredDrafts.map((draft, idx) => (
                                <motion.div
                                    key={draft.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate max-w-[200px] sm:max-w-[400px]">
                                                {draft.title || "无标题草稿"}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" /> {draft.lastSaved}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Edit3 className="w-3 h-3" /> {draft.wordCount} 字
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link href={`/creator/publish?edit=${draft.id}`}>
                                            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteDraft(draft.id)}
                                            className="p-3 bg-slate-50 text-red-500 rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            /* 空状态 */
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileWarning className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">草稿箱是空的</h3>
                                <p className="text-slate-400 text-sm mb-8">开始记录你的下一个伟大创意吧！</p>
                                <Link href="/creator/publish">
                                    <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors">
                                        立即去创作
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}