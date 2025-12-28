// 会员、优惠券、活动、周边
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Crown,
    Ticket,
    Gift,
    Zap,
    ShoppingBag,
    ChevronRight,
    Timer,
    Sparkles
} from "lucide-react";
import confetti from "canvas-confetti"; // 记得 pnpm add canvas-confetti

export default function RewardsHub() {
    const [isSigned, setIsSigned] = useState(false);

    // 签到成功特效
    const handleSignIn = () => {
        if (isSigned) return;
        setIsSigned(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#2563eb', '#fbbf24']
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* 顶部：会员身份卡片 - 链接至会员中心 */}
                <section className="mb-12">
                    <Link href="/rewards/membership">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white shadow-2xl cursor-pointer group"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="max-w-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-yellow-500/20 rounded-xl">
                                            <Crown className="w-6 h-6 text-yellow-500" />
                                        </div>
                                        <span className="text-sm font-black uppercase tracking-widest text-yellow-500">Premium Member</span>
                                    </div>
                                    <h2 className="text-4xl font-black mb-4 tracking-tight group-hover:text-yellow-400 transition-colors">加入 Pro 会员，解锁全站技术书籍</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">每月仅需一本咖啡钱，即可获得全站 8 折优惠、专属技术社群入场券及每月两本免费新书额度。</p>
                                    <div className="inline-block px-8 py-4 bg-yellow-500 text-slate-900 rounded-2xl font-black transition-all shadow-xl shadow-yellow-500/20">
                                        立即开通 · ￥29/月
                                    </div>
                                </div>
                                <div className="hidden lg:block text-8xl grayscale opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">💎</div>
                            </div>
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                        </motion.div>
                    </Link>
                </section>

                {/* 功能矩阵：Bento Grid 布局 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* 优惠券中心 - 链接 */}
                    <Link href="/rewards/coupons" className="md:col-span-4">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="h-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Ticket className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">优惠券中心</h3>
                                <p className="text-slate-400 text-xs font-medium">您有 3 张未使用的满减券即将到期。</p>
                            </div>
                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">立即领券</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* 积分/福利兑换 - 链接（由于没有专门写，暂指向商城） */}
                    <Link href="/rewards/tasks" className="md:col-span-4">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="h-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Gift className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">任务中心</h3>
                                <p className="text-slate-400 text-xs font-medium">做任务领福利。</p>
                            </div>
                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">进入商城</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* 活动中心 - 链接 */}
                    <Link href="/rewards/events" className="md:col-span-4">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="h-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Zap className="w-6 h-6 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">活动中心</h3>
                                <p className="text-slate-400 text-xs font-medium">正在进行：21天技术共读营、征文比赛。</p>
                            </div>
                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">查看活动</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* 周边商城 - 链接 */}
                    <Link href="/rewards/swag" className="md:col-span-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="h-full bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100 shadow-sm overflow-hidden relative group"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Swag Store</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">开发者周边商城</h3>
                                    <p className="text-blue-600/60 text-sm mb-6 font-medium">专属极客文化定制。键盘托、程序员主题 T 恤现已开启预售。</p>
                                    <div className="inline-block px-6 py-3 bg-white text-blue-600 rounded-xl text-xs font-black shadow-sm">前往选购</div>
                                </div>
                                <div className="w-48 h-48 bg-white/50 rounded-full flex items-center justify-center text-6xl shadow-inner group-hover:rotate-12 transition-transform duration-500">👕</div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* 每日打卡奖励 - 纯交互按钮 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Timer className={`w-5 h-5 ${isSigned ? 'text-emerald-400' : 'text-yellow-500'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isSigned ? 'text-emerald-400' : 'text-yellow-500'}`}>
                                    {isSigned ? 'Task Completed' : 'Quick Reward'}
                                </span>
                            </div>
                            <h3 className="text-xl font-black mb-2">每日签到</h3>
                            <p className="text-slate-400 text-xs font-medium">连续签到 7 天可获得 10 元无门槛优惠券。</p>
                        </div>
                        <button 
                            onClick={handleSignIn}
                            disabled={isSigned}
                            className={`mt-8 w-full py-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                                isSigned 
                                ? 'bg-emerald-500/20 text-emerald-400 cursor-default' 
                                : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
                            }`}
                        >
                            {isSigned ? (
                                <><Sparkles className="w-4 h-4" /> 今日已打卡</>
                            ) : (
                                '立即打卡 (+5 积分)'
                            )}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}