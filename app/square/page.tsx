// 广场
"use client";

import { motion } from "framer-motion";
import {
    LayoutGrid, BookOpen, Wallet, Ticket,
    Hash, UserCircle2, Globe, TrendingUp, Sparkles, ChevronRight
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

const SQUARE_MODULES = [
    { id: "columns", title: "精选专栏", desc: "深度技术解析", icon: <LayoutGrid />, color: "bg-blue-500", href: "/square/columns", size: "lg" },
    { id: "investment", title: "新书投资", desc: "挖掘潜力好书", icon: <TrendingUp />, color: "bg-emerald-500", href: "/square/investment", size: "sm" },
    { id: "redpacket", title: "红包广场", desc: "手慢无，速抢", icon: <Wallet />, color: "bg-red-500", href: "/square/redpacket", size: "sm" },
    { id: "cards", title: "卡牌广场", desc: "集齐赢限量周边", icon: <Sparkles />, color: "bg-purple-500", href: "/square/cards", size: "md" },
    { id: "topics", title: "话题广场", desc: "正在热议中...", icon: <Hash />, color: "bg-orange-500", href: "/square/topics", size: "md" },
    { id: "roles", title: "热门角色", desc: "技术偶像入驻", icon: <UserCircle2 />, color: "bg-indigo-500", href: "/square/roles", size: "sm" },
    { id: "circles", title: "点点圈", desc: "极客兴趣小组", icon: <Globe />, color: "bg-pink-500", href: "/square/circles", size: "sm" },
];

export default function SquarePage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <BackButton />

                <header className="my-10 text-center">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">社区广场</h1>
                    <p className="text-slate-500 font-medium">在这里，遇见有趣的灵魂与前沿的技术灵感。</p>
                </header>

                {/* 模块网格 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[160px]">
                    {SQUARE_MODULES.map((mod) => (
                        <motion.div
                            key={mod.id}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`${mod.size === 'lg' ? 'col-span-2 row-span-2' :
                                    mod.size === 'md' ? 'col-span-2 row-span-1' : 'col-span-1'
                                } ${mod.color} rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg`}
                        >
                            <Link href={mod.href} className="h-full flex flex-col justify-between relative z-10">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl w-fit">
                                    {mod.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-1">{mod.title}</h3>
                                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{mod.desc}</p>
                                </div>
                                <ChevronRight className="absolute right-0 bottom-0 opacity-30 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            {/* 背景装饰 */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}