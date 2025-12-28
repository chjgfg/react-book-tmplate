// 我的发布
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Eye, MessageSquare, MoreVertical } from "lucide-react";
import BackButton from "@/components/BackButton";

const MY_POSTS = [
    { id: 1, title: "如何构建高性能的 Next.js 架构", views: 1240, comments: 45, date: "2025-05-10", status: "已发布" },
    { id: 2, title: "TypeScript 实战：高级类型体操技巧", views: 890, comments: 12, date: "2025-05-08", status: "已发布" },
    { id: 3, title: "Tailwind CSS 为什么是未来的趋势", views: 2100, comments: 89, date: "2025-05-01", status: "已发布" },
];

export default function MyPostsPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <BackButton />
                
                <div className="flex justify-between items-center my-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">我的发布</h1>
                    <span className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">
                        共 {MY_POSTS.length} 篇文章
                    </span>
                </div>

                <div className="space-y-4">
                    {MY_POSTS.map((post) => (
                        <div key={post.id} className="group p-6 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest">
                                        {post.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">{post.date}</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                        <Eye className="w-4 h-4" /> {post.views}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                        <MessageSquare className="w-4 h-4" /> {post.comments}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-3 bg-slate-50 text-red-500 rounded-xl hover:bg-red-50 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-3 text-slate-300">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}