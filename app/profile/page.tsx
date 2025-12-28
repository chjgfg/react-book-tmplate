// 个人中心
"use client";

import { motion } from "framer-motion";
import {
    Settings,
    BookOpen,
    Clock,
    Award,
    PenTool,
    Bookmark,
    Share2,
    Map as MapIcon,
    ChevronRight
} from "lucide-react";
import BadgeWall from "@/components/BadgeWall";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import Link from "next/link";

export default function ProfilePage() {
    // 模拟数据 - 实际可从后端或 LocalStorage 获取
    const user = {
        name: "高级前端架构师",
        handle: "@fe_master",
        avatar: "👨‍💻",
        level: 12,
        exp: 75,
        joinedDate: "2023年10月"
    };

    const stats = [
        { label: "已购书籍", value: "12", icon: <BookOpen className="w-4 h-4" /> },
        { label: "阅读时长", value: "48h", icon: <Clock className="w-4 h-4" /> },
        { label: "获得勋章", value: "8", icon: <Award className="w-4 h-4" /> },
    ];

    const recentReads = [
        { id: 1, title: "React 进阶实战", progress: 85, color: "bg-blue-500" },
        { id: 2, title: "Next.js 全栈开发", progress: 40, color: "bg-indigo-500" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* 顶部装饰背景 */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 w-full" />

            <div className="max-w-5xl mx-auto px-4 -mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* 左侧栏：个人核心卡片 */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-xl">
                                    {user.avatar}
                                </div>
                                <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
                                <p className="text-gray-400 text-sm font-medium mb-6">{user.handle}</p>

                                <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-blue-600">Level {user.level}</span>
                                        <span className="text-gray-400">{user.exp}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${user.exp}%` }}
                                            className="h-full bg-blue-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full">
                                    {/* 使用 Link 包裹按钮 */}
                                    <Link href="/settings" className="flex-1">
                                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                                            编辑资料
                                        </button>
                                    </Link>
                                    <Link href="/settings" className="flex-1">
                                        <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all text-gray-600">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* 阅读统计快报 */}
                        <div className="grid grid-cols-1 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                            {stat.icon}
                                        </div>
                                        <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                                    </div>
                                    <span className="text-xl font-black text-gray-900">{stat.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧主栏：动态与图谱 */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* 知识图谱卡片 */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <KnowledgeGraph />
                        </motion.div> */}

                        {/* 勋章墙卡片 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100"
                        >
                            <BadgeWall />
                        </motion.div>

                        {/* 最近阅读进度 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-gray-900">正在学习</h3>
                                <Link href="/library" className="text-xs font-bold text-blue-600 flex items-center">
                                    查看全部 <ChevronRight className="w-3 h-3 ml-1" />
                                </Link>
                            </div>
                            <div className="space-y-6">
                                {recentReads.map((book) => (
                                    <div key={book.id}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-gray-800">{book.title}</span>
                                            <span className="text-xs font-mono text-gray-400">{book.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${book.progress}%` }}
                                                className={`h-full ${book.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>


                        {/* 在 ProfilePage 的右侧主栏增加这段代码 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "创作中心", icon: <PenTool />, href: "/creator", color: "text-blue-600" },
                                { label: "关注收藏", icon: <Bookmark />, href: "/profile/history", color: "text-red-500" },
                                { label: "浏览记录", icon: <Clock />, href: "/profile/history", color: "text-emerald-500" },
                                { label: "作家申请", icon: <Award />, href: "/creator", color: "text-yellow-500" },
                            ].map((tool, idx) => (
                                <Link key={idx} href={tool.href}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 text-center transition-all hover:shadow-md"
                                    >
                                        <div className={`p-3 bg-gray-50 rounded-2xl ${tool.color}`}>
                                            {tool.icon}
                                        </div>
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{tool.label}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}