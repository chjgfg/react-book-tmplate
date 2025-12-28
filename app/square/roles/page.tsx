// 热门角色
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle2, Star, MessageSquare, Heart, ShieldCheck, Zap, ChevronRight, X } from "lucide-react";
import BackButton from "@/components/BackButton";
import confetti from "canvas-confetti";

const ROLES = [
    {
        id: 1, name: "Rustacean 🦀", title: "底层架构守望者",
        bio: "专注于高性能异步编程与内存安全。'内存安全是架构的第一准则'。",
        fans: "12.5k", posts: 142, level: "SSR", color: "from-orange-500 to-red-600",
        badges: ["并发专家", "性能猎人"]
    },
    {
        id: 2, name: "Next.js 导师", title: "全栈全明星",
        bio: "Vercel 社区核心贡献者，精通 RSC 与性能极致优化。",
        fans: "8.9k", posts: 86, level: "SR", color: "from-blue-600 to-indigo-700",
        badges: ["RSC 专家", "全栈达人"]
    },
    {
        id: 3, name: "Tailwind 魔法师", title: "视觉交互专家",
        bio: "用原子化 CSS 构建最丝滑的 UI 体验，拒绝臃肿代码。",
        fans: "15.2k", posts: 210, level: "SSR", color: "from-emerald-400 to-teal-600",
        badges: ["UI 大师", "原子化先驱"]
    },
];

export default function RolesPage() {
    const [followed, setFollowed] = useState<number[]>([]);

    const handleFollow = (id: number) => {
        if (followed.includes(id)) {
            setFollowed(prev => prev.filter(fid => fid !== id));
        } else {
            setFollowed(prev => [...prev, id]);
            confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.8 },
                colors: ['#3b82f6', '#f59e0b']
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#ffffff] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <BackButton />

                <header className="my-12">
                    <div className="flex items-center gap-3 text-indigo-600 mb-2">
                        <UserCircle2 className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Hot Roles</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">热门角色</h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">与顶尖技术灵魂同行，关注即可获取他们的实时动态。</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ROLES.map((role) => (
                        <motion.div
                            key={role.id}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group"
                        >
                            {/* 角色卡片头部 */}
                            <div className={`h-32 bg-gradient-to-br ${role.color} p-6 relative`}>
                                <div className="absolute -bottom-10 left-8">
                                    <div className="w-20 h-20 bg-white rounded-[2rem] p-1 shadow-xl">
                                        <div className="w-full h-full bg-slate-100 rounded-[1.8rem] flex items-center justify-center text-3xl">
                                            {role.name.includes("🦀") ? "👨‍💻" : role.name.includes("导师") ? "🧙‍♂️" : "🎨"}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white italic tracking-tighter">
                                    {role.level} RANK
                                </div>
                            </div>

                            {/* 角色信息 */}
                            <div className="pt-14 p-8">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-black text-slate-900">{role.name}</h3>
                                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-xs font-bold text-blue-600 mb-4 tracking-wide italic">{role.title}</p>
                                <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium line-clamp-2">
                                    {role.bio}
                                </p>

                                {/* 勋章展示 */}
                                <div className="flex gap-2 mb-8">
                                    {role.badges.map(badge => (
                                        <span key={badge} className="px-2 py-1 bg-slate-50 text-[9px] font-black text-slate-400 rounded-lg uppercase tracking-widest border border-slate-100">
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <p className="text-sm font-black text-slate-900">{role.fans}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">粉丝</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-black text-slate-900">{role.posts}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">动态</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleFollow(role.id)}
                                        className={`px-6 py-3 rounded-2xl text-xs font-black transition-all active:scale-95 ${followed.includes(role.id)
                                                ? 'bg-slate-100 text-slate-400'
                                                : 'bg-slate-900 text-white shadow-lg hover:bg-blue-600'
                                            }`}
                                    >
                                        {followed.includes(role.id) ? "已关注" : "关注"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}