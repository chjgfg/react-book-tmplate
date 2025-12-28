// 成就墙
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 1. 补全勋章定义（需与 ReadingGamification 中的定义保持一致）
const BADGES = [
    { id: "newbie", name: "初学乍练", icon: "🌱", desc: "开启技术之旅" },
    { id: "scholar", name: "技术书生", icon: "📜", desc: "阅读超过1小时" },
    { id: "marathon", name: "阅读马拉松", icon: "🏃", desc: "单次阅读30分钟" },
    { id: "fire", name: "渐入佳境", icon: "🔥", desc: "连续阅读3天" },
    { id: "master", name: "代码宗师", icon: "💎", desc: "完成一本神作" },
    { id: "legend", name: "知识传奇", icon: "👑", desc: "累计阅读100小时" },
];

export default function BadgeWall() {
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("reading-stats");
        if (saved) {
            try {
                const stats = JSON.parse(saved);
                setUnlocked(stats.badges || []);
            } catch (e) {
                console.error("解析阅读数据失败", e);
            }
        }
    }, []);

    // 预渲染保护
    if (!mounted) return <div className="grid grid-cols-3 gap-4 opacity-0" />;

    return (
        <div className="space-y-6">
            <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-black text-gray-900">荣誉勋章</h3>
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                    已解锁 {unlocked.length} / {BADGES.length}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {BADGES.map((badge, idx) => {
                    const isUnlocked = unlocked.includes(badge.id);

                    return (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                            className={`relative group p-4 rounded-3xl flex flex-col items-center justify-center border transition-all duration-500 ${isUnlocked
                                    ? 'bg-white border-blue-100 shadow-sm shadow-blue-500/5'
                                    : 'bg-gray-50/50 border-transparent opacity-40 grayscale'
                                }`}
                        >
                            {/* 勋章图标 */}
                            <span className={`text-4xl mb-3 transition-transform duration-500 ${isUnlocked ? 'drop-shadow-md group-hover:rotate-12' : ''
                                }`}>
                                {badge.icon}
                            </span>

                            {/* 勋章名称 */}
                            <span className={`text-[10px] font-black uppercase text-center tracking-tighter leading-none ${isUnlocked ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                {badge.name}
                            </span>

                            {/* 悬浮提示说明 */}
                            {isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-3xl p-2 text-center">
                                    <p className="text-[9px] font-bold text-blue-600 leading-tight">
                                        {badge.desc}
                                    </p>
                                </div>
                            )}

                            {/* 未解锁时的锁定小图标 */}
                            {!isUnlocked && (
                                <span className="absolute top-2 right-2 text-[10px]">🔒</span>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}