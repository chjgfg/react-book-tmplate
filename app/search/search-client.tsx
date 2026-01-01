// 搜索详情页
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Book, FileText, Bookmark, Search as SearchIcon, ArrowRight, Filter, Sparkles, Home } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    
    // 控制当前的过滤类型
    const [filterType, setFilterType] = useState("全部内容");

    const results = [
        { id: 1, type: "book", title: "React 进阶实战", desc: "深度解析 React 18 核心原理与 Fiber 架构，涵盖最新的并发渲染机制。", icon: <Book className="w-5 h-5" />, tag: "热门推荐", cat: "核心图书" },
        { id: 2, type: "chapter", title: "JSX 核心语法", desc: "出自书籍《React 进阶实战》第二章，详细对比了 JSX 与模板引擎的差异。", icon: <FileText className="w-5 h-5" />, tag: "深度文章", cat: "精选章节" },
        { id: 3, type: "note", title: "关于组件通信的笔记", desc: "记录了 Context API、Zustand 与 Redux 在大型项目中的性能表现对比。", icon: <Bookmark className="w-5 h-5" />, tag: "个人笔记", cat: "学习笔记" },
    ];

    // 根据选择的标签过滤结果
    const filteredResults = results.filter(item => 
        filterType === "全部内容" || item.cat === filterType
    );

    const stats = [
        { label: '全部内容', val: results.length, color: 'text-slate-900', icon: <SearchIcon className="w-3 h-3" /> },
        { label: '核心图书', val: results.filter(r => r.type === 'book').length, color: 'text-blue-600', icon: <Book className="w-3 h-3" /> },
        { label: '精选章节', val: results.filter(r => r.type === 'chapter').length, color: 'text-indigo-600', icon: <FileText className="w-3 h-3" /> },
        { label: '学习笔记', val: results.filter(r => r.type === 'note').length, color: 'text-emerald-600', icon: <Bookmark className="w-3 h-3" /> },
    ];

    return (
        <div className="min-h-screen bg-[#ffffff] relative overflow-hidden">
            {/* 背景流光 */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto px-6 pt-20 pb-20"> {/* pt 从 32 改为 20，内容上移 */}
                
                {/* 1. 紧凑型头部 */}
                <header className="mb-10 relative">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-blue-600 mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Smart Search Engine</span>
                    </motion.div>
                    
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">
                        “{query}” <span className="text-slate-400 font-light italic text-2xl">的结果</span>
                    </h1>

                    {/* 顶部按钮全可点 */}
                    <div className="flex flex-wrap gap-2">
                        {['全部内容', '核心图书', '精选章节', '学习笔记'].map((filter) => (
                            <button 
                                key={filter} 
                                onClick={() => setFilterType(filter)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                                    filterType === filter 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                                    : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* 2. 左侧统计面板 - 选项全可点 */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-28 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-[2rem] shadow-sm">
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Filter className="w-3 h-3" /> 快速筛选
                            </h3>
                            <div className="space-y-1">
                                {stats.map((s) => (
                                    <button 
                                        key={s.label} 
                                        onClick={() => setFilterType(s.label)}
                                        className={`w-full flex justify-between items-center p-3 rounded-xl transition-all ${
                                            filterType === s.label ? 'bg-blue-50' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={filterType === s.label ? 'text-blue-600' : 'text-slate-400'}>{s.icon}</span>
                                            <span className={`text-xs font-bold ${filterType === s.label ? 'text-blue-700' : 'text-slate-500'}`}>{s.label}</span>
                                        </div>
                                        <span className={`text-xs font-black ${filterType === s.label ? 'text-blue-600' : 'text-slate-300'}`}>{s.val}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* 3. 结果展示区 */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredResults.length > 0 ? (
                                    filteredResults.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            whileHover={{ y: -5 }}
                                            className="group h-full"
                                        >
                                            <Link href={`/books/${item.id}`} className="block h-full">
                                                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col relative overflow-hidden">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                                                        item.type === 'book' ? 'bg-blue-600 text-white' :
                                                        item.type === 'chapter' ? 'bg-indigo-600 text-white' :
                                                        'bg-emerald-600 text-white'
                                                    }`}>
                                                        {item.icon}
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="text-[9px] font-black uppercase text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{item.tag}</span>
                                                        </div>
                                                        <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.desc}</p>
                                                    </div>

                                                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">点击阅读内容</span>
                                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-24 flex flex-col items-center">
                                        <div className="text-6xl mb-6">🏜️</div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">在该分类下没有找到内容</h3>
                                        <button 
                                            onClick={() => setFilterType("全部内容")}
                                            className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                                        >
                                            显示全部结果
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* 底部快速操作 */}
                        <div className="mt-12 flex justify-center">
                            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold">
                                <Home className="w-4 h-4" /> 返回首页逛逛
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}