// 阅读时长统计与勋章系统
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti"; // 推荐安装：npm install canvas-confetti

// 勋章定义
const BADGES = [
    { id: "newbie", name: "初学乍练", icon: "🌱", requirement: 60, desc: "累计阅读超过 1 分钟" },
    { id: "scholar", name: "技术书生", icon: "📜", requirement: 3600, desc: "累计阅读超过 1 小时" },
    { id: "master", name: "代码宗师", icon: "🔥", requirement: 36000, desc: "累计阅读超过 10 小时" },
];

export default function ReadingGamification() {
    const [seconds, setSeconds] = useState(0);
    const [activeBadge, setActiveBadge] = useState<typeof BADGES[0] | null>(null);
    const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

    // 1. 初始化读取本地进度
    useEffect(() => {
        const savedStats = localStorage.getItem("reading-stats");
        if (savedStats) {
            const { time, badges } = JSON.parse(savedStats);
            setSeconds(time || 0);
            setUnlockedIds(badges || []);
        }
    }, []);

    // 2. 计时器逻辑（仅在窗口活跃时计时）
    useEffect(() => {
        const timer = setInterval(() => {
            if (document.visibilityState === "visible") {
                setSeconds((prev) => {
                    const newTime = prev + 1;
                    checkBadges(newTime);
                    return newTime;
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [unlockedIds]);

    // 3. 检查并解锁勋章
    const checkBadges = (currentTime: number) => {
        BADGES.forEach((badge) => {
            if (currentTime >= badge.requirement && !unlockedIds.includes(badge.id)) {
                unlockBadge(badge);
            }
        });
    };

    const unlockBadge = (badge: typeof BADGES[0]) => {
        const newUnlocked = [...unlockedIds, badge.id];
        setUnlockedIds(newUnlocked);
        setActiveBadge(badge);
        localStorage.setItem("reading-stats", JSON.stringify({ time: seconds, badges: newUnlocked }));

        // 燃放五彩纸屑庆祝
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3B82F6', '#60A5FA', '#FFFFFF']
        });
    };

    return (
        <>
            {/* 侧边实时小工具 */}
            <div className="fixed left-6 bottom-10 z-40 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 animate-pulse">
                    ⏱️
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">阅读时长</p>
                    <p className="text-xs font-mono font-bold">{Math.floor(seconds / 60)}m {seconds % 60}s</p>
                </div>
            </div>

            {/* 勋章达成弹窗 */}
            <AnimatePresence>
                {activeBadge && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-4 border-blue-500"
                        >
                            <div className="text-8xl mb-6">{activeBadge.icon}</div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">获得新勋章！</h2>
                            <p className="text-blue-600 font-black text-xl mb-4 tracking-tight">{activeBadge.name}</p>
                            <p className="text-gray-400 text-sm mb-8">{activeBadge.desc}</p>

                            <button
                                onClick={() => setActiveBadge(null)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
                            >
                                太棒了，继续阅读
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}