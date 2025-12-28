// 卡牌广场
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, X, Trophy, Wallet, Zap, Filter, Star } from "lucide-react";
import BackButton from "@/components/BackButton";
import confetti from "canvas-confetti";
import Link from "next/link"; // 在文件顶部导入

// 1. 定义卡牌数据类型与数据库
const CARD_DATABASE = [
    { id: 'ur-1', name: "架构宗师", emoji: "🏛️", rank: "UR", color: "from-indigo-600 via-purple-600 to-pink-600", probability: 0.05 },
    { id: 'ssr-1', name: "并发专家", emoji: "⚡", rank: "SSR", color: "from-amber-400 to-orange-700", probability: 0.15 },
    { id: 'ssr-2', name: "安全猎人", emoji: "🛡️", rank: "SSR", color: "from-emerald-500 to-teal-800", probability: 0.15 },
    { id: 'sr-1', name: "前端魔术师", emoji: "🎨", rank: "SR", color: "from-blue-400 to-indigo-600", probability: 0.30 },
    { id: 'r-1', name: "Bug 捕手", emoji: "🐞", rank: "R", color: "from-slate-500 to-slate-800", probability: 0.35 },
];

export default function CardsPage() {
    // 状态管理
    const [userPoints, setUserPoints] = useState(2500);
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showResult, setShowResult] = useState<any>(null);
    const [myCollection, setMyCollection] = useState<{ [key: string]: number }>({
        'r-1': 5,
        'sr-1': 2
    });

    // 计算收集进度
    const collectionProgress = useMemo(() => {
        const ownedTypes = Object.keys(myCollection).length;
        return (ownedTypes / CARD_DATABASE.length) * 100;
    }, [myCollection]);

    // 抽卡核心逻辑
    const handleDraw = () => {
        if (userPoints < 50) {
            alert("积分不足！去任务中心赚点吧。");
            return;
        }

        setUserPoints(prev => prev - 50);
        setIsDrawing(true);

        // 模拟召唤过程
        setTimeout(() => {
            const rand = Math.random();
            let cumulativeProb = 0;
            let result = CARD_DATABASE[CARD_DATABASE.length - 1];

            for (const card of CARD_DATABASE) {
                cumulativeProb += card.probability;
                if (rand < cumulativeProb) {
                    result = card;
                    break;
                }
            }

            setIsDrawing(false);
            setShowResult(result);

            // 更新库存
            setMyCollection(prev => ({
                ...prev,
                [result.id]: (prev[result.id] || 0) + 1
            }));

            // 如果是高级卡则撒花
            if (result.rank === 'UR' || result.rank === 'SSR') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#818cf8', '#fbbf24', '#ffffff']
                });
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] pt-24 pb-20 text-white relative overflow-hidden selection:bg-indigo-500/30">
            {/* 动态背景背景光 */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <BackButton className="text-white bg-white/5 border-white/10 hover:bg-white/10" />
                    <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 shadow-inner">
                        <Wallet className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-black tracking-tight">{userPoints} PT</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">
                            卡牌广场
                        </h1>
                        <p className="text-slate-400 font-medium max-w-md leading-relaxed">
                            消耗积分抽取技术职能卡牌。集齐不同等级的卡组可兑换<span className="text-white font-bold underline decoration-indigo-500 underline-offset-4"> 限量版实体勋章 </span>。
                        </p>
                    </motion.div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsBagOpen(true)}
                            className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.8rem] font-black text-xs flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95 group"
                        >
                            <Layers className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                            我的卡包 ({Object.values(myCollection).reduce((a, b) => a + b, 0)})
                        </button>
                        <button
                            onClick={handleDraw}
                            disabled={isDrawing}
                            className="px-10 py-4 bg-indigo-600 rounded-[1.8rem] font-black text-sm shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {isDrawing ? <Zap className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {isDrawing ? "召唤中..." : "抽取新卡 (50pt)"}
                        </button>
                    </div>
                </div>

                {/* 广场展示区：固定展示一些 UR 卡吸引眼球 */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {CARD_DATABASE.map((card) => (
                        <DisplayCard key={card.id} card={card} owned={!!myCollection[card.id]} />
                    ))}
                </div>
            </div>

            {/* 1. 召唤全屏动画 */}
            <AnimatePresence>
                {isDrawing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="relative w-48 h-48 border-4 border-dashed border-indigo-500/30 rounded-full flex items-center justify-center"
                        >
                            <Zap className="w-12 h-12 text-indigo-500 animate-pulse" />
                        </motion.div>
                        <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mt-12 text-sm font-black tracking-[1em] text-indigo-400"
                        >
                            SUMMONING
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. 抽卡结果弹窗 */}
            <AnimatePresence>
                {showResult && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                            onClick={() => setShowResult(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
                            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="relative w-full max-w-sm"
                        >
                            <div className={`aspect-[3/4] rounded-[3.5rem] bg-gradient-to-br ${showResult.color} p-1.5 shadow-[0_0_100px_rgba(79,70,229,0.4)]`}>
                                <div className="h-full rounded-[3.2rem] bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute top-12 text-9xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">{showResult.emoji}</div>
                                    <div className="mt-48 text-center px-8">
                                        <h2 className="text-4xl font-black italic tracking-tighter mb-2">{showResult.name}</h2>
                                        <span className="px-5 py-1.5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            {showResult.rank} CARD
                                        </span>
                                    </div>
                                    {/* 镭射光泽 */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
                                </div>
                            </div>
                            <button
                                onClick={() => setShowResult(null)}
                                className="mt-12 w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                            >
                                收下卡牌
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 3. 我的卡包抽屉 */}
            <AnimatePresence>
                {isBagOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsBagOpen(false)}
                            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[500] w-full max-w-md bg-slate-900 border-l border-white/10 p-10 overflow-y-auto no-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                                        <Layers className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-black italic tracking-tight">我的收藏</h2>
                                </div>
                                <button onClick={() => setIsBagOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-8 h-8" /></button>
                            </div>

                            {/* 统计进度 */}
                            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 mb-10">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Collection Progress</p>
                                        <p className="text-2xl font-black italic">{Math.round(collectionProgress)}%</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-amber-400" />
                                </div>
                                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${collectionProgress}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {CARD_DATABASE.map((card) => {
                                    const count = myCollection[card.id] || 0;
                                    return (
                                        <div key={card.id} className={`group relative aspect-[3/4] rounded-3xl overflow-hidden border transition-all ${count > 0 ? 'border-white/10' : 'border-dashed border-white/5 opacity-30'}`}>
                                            <div className={`h-full bg-gradient-to-br ${count > 0 ? card.color : 'from-slate-800 to-slate-900'} p-0.5`}>
                                                <div className="h-full rounded-[1.4rem] bg-slate-900/80 flex flex-col items-center justify-center">
                                                    <span className={`text-4xl mb-2 ${count > 0 ? '' : 'grayscale'}`}>{card.emoji}</span>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{card.name}</span>
                                                    {count > 1 && (
                                                        <div className="absolute top-3 right-3 bg-white text-slate-900 text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center shadow-lg">
                                                            {count}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 底部兑换按钮 */}
                            <Link href="/rewards/swag" className="block w-full">
                                <button className="w-full mt-12 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-50 transition-colors">
                                    前往周边商城兑换
                                </button>
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// 4. 展示卡牌组件 (3D Hover)
function DisplayCard({ card, owned }: { card: any, owned: boolean }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                rotateY: 15,
                rotateX: -10,
                z: 50
            }}
            className="relative aspect-[3/4] rounded-[2.5rem] bg-white/5 border border-white/10 p-1.5 cursor-pointer perspective-1000 group shadow-2xl"
        >
            <div className={`h-full rounded-[2.2rem] bg-gradient-to-br ${card.color} p-0.5`}>
                <div className="h-full rounded-[2.1rem] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                    <span className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-2xl">{card.emoji}</span>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white/50">{card.name}</h4>

                    <div className="absolute top-5 left-5 text-[8px] font-black text-white/20 border border-white/10 px-2 py-0.5 rounded italic">
                        {card.rank}
                    </div>

                    {/* 拥有标志 */}
                    {owned && (
                        <div className="absolute top-4 right-4 text-emerald-500">
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                    )}

                    {/* 镭射光泽 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
            </div>
        </motion.div>
    );
}