// 精选专栏
"use client";

import { motion } from "framer-motion";
import { LayoutGrid, BookOpen, Star, ChevronRight, User } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link"; // 1. 引入 Link

const COLUMNS = [
    { id: 1, title: "深入浅出 Rust 异步编程", author: "Alex", count: 24, subscribers: "1.2k", color: "bg-orange-500", cover: "🦀" },
    { id: 2, title: "现代 CSS 魔法：从布局到动画", author: "Sarah", count: 18, subscribers: "3.5k", color: "bg-blue-500", cover: "🎨" },
    { id: 3, title: "微服务架构的 100 个细节", author: "架构师老王", count: 50, subscribers: "5.8k", color: "bg-indigo-600", cover: "🏗️" },
];

export default function ColumnsPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <BackButton />
                <header className="my-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">精选专栏</h1>
                    <p className="text-slate-500 mt-2">成体系的技术知识，助力每一个阶段的突破。</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COLUMNS.map((col) => (
                        <Link href={`/reader/${col.id}`} key={col.id}> {/* 2. 包裹整个卡片 */}
                            <motion.div 
                                whileHover={{ y: -10 }} 
                                className="group border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer h-full"
                            >
                                <div className={`${col.color} h-40 flex items-center justify-center text-6xl relative`}>
                                    {col.cover}
                                    <div className="absolute bottom-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white">
                                        连载中 · {col.count} 篇
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {col.title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-400 font-bold">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{col.author}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{col.subscribers} 订阅</span>
                                    </div>
                                    <div className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black group-hover:bg-blue-600 transition-all text-center">
                                        开始阅读
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}