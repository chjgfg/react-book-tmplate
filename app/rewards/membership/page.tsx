// 会员中心
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Crown,
    Check,
    X,
    CreditCard,
    ChevronRight,
    ShieldCheck,
    Zap,
    Star
} from "lucide-react";
import BackButton from "@/components/BackButton";
import confetti from "canvas-confetti";

// 会员方案数据
const PLANS = [
    {
        id: 'free',
        name: "免费版",
        price: "0",
        features: ["在线阅读限免书籍", "基本学习社区访问", "每日签到奖励"],
        popular: false,
        theme: "slate"
    },
    {
        id: 'pro',
        name: "Pro 会员",
        price: "29",
        features: ["全站图书 8 折", "每月 2 本新书免费读", "专属技术社群", "去广告沉浸阅读"],
        popular: true,
        theme: "blue"
    },
    {
        id: 'team',
        name: "团队版",
        price: "199",
        features: ["5 人共享账户", "企业级技术周报", "所有 Pro 权益", "专属技术专家咨询"],
        popular: false,
        theme: "indigo"
    },
];

export default function MembershipPage() {
    // 状态管理
    const [hoveredPlan, setHoveredPlan] = useState<string | null>('pro'); // 默认高亮中间
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    // 处理升级点击
    const handleUpgrade = (plan: any) => {
        if (plan.price === "0") return;
        setSelectedPlan(plan);
        setIsPayModalOpen(true);
    };

    // 模拟支付成功
    const handlePaySuccess = () => {
        setIsPayModalOpen(false);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#fbbf24', '#2563eb']
        });
        // 延迟提示，避免打断撒花动效
        setTimeout(() => {
            alert(`恭喜！您已成功开通 ${selectedPlan.name}，权益已立即生效。`);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 relative overflow-hidden">
            {/* 动态背景装饰 */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="max-w-6xl mx-auto px-6">
                <BackButton />

                <header className="text-center my-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4"
                    >
                        <Zap className="w-3 h-3 fill-current" /> Premium Growth
                    </motion.div>
                    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">选择您的成长计划</h1>
                    <p className="text-slate-400 font-medium">加入 50,000+ 高端开发者，打破技术成长的天花板</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {PLANS.map((plan, idx) => {
                        const isHighLighted = hoveredPlan === plan.id;

                        return (
                            <motion.div
                                key={plan.id}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan('pro')} // 鼠标移出后自动回弹至 Pro
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -12 }}
                                className={`relative p-10 rounded-[3rem] border transition-all duration-500 bg-white flex flex-col cursor-default ${isHighLighted
                                        ? 'border-blue-600 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.25)] scale-[1.05] z-10'
                                        : 'border-slate-100 shadow-sm opacity-60 scale-100 z-0'
                                    }`}
                            >
                                {/* 勋章标签 */}
                                {plan.popular && (
                                    <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-lg ${isHighLighted ? 'bg-blue-600 text-white shadow-blue-500/40' : 'bg-slate-200 text-slate-500'
                                        }`}>
                                        Most Popular
                                    </span>
                                )}

                                <div className="mb-8">
                                    <h3 className={`text-2xl font-black mb-3 transition-colors ${isHighLighted ? 'text-blue-600' : 'text-slate-900'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black tracking-tighter text-slate-900">￥{plan.price}</span>
                                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">/ Month</span>
                                    </div>
                                </div>

                                {/* 权益列表 */}
                                <ul className="space-y-5 mb-12 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-4 text-sm font-bold text-slate-600 leading-tight">
                                            <div className={`mt-0.5 p-1 rounded-lg transition-colors shrink-0 ${isHighLighted ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-400'}`}>
                                                <Check className="w-3.5 h-3.5" strokeWidth={4} />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* 交互按钮 */}
                                <button
                                    onClick={() => handleUpgrade(plan)}
                                    className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 ${plan.id === 'free'
                                            ? "bg-slate-50 text-slate-300 cursor-default"
                                            : isHighLighted
                                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 hover:bg-blue-700'
                                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                                        }`}
                                >
                                    {plan.id === 'free' ? "当前使用中" : "立即升级计划"}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* 极简支付弹窗 */}
            <AnimatePresence>
                {isPayModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPayModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl overflow-hidden"
                        >
                            <button onClick={() => setIsPayModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <Crown className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">订单确认</h3>
                                <p className="text-slate-400 text-sm mt-2 font-medium italic">即将解锁 Pro 级开发特权</p>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">支付总计</span>
                                    <span className="text-3xl font-black text-slate-900">￥{selectedPlan?.price}</span>
                                </div>

                                <button
                                    onClick={handlePaySuccess}
                                    className="w-full flex items-center justify-between p-5 border-2 border-slate-100 rounded-3xl hover:border-blue-600 hover:bg-blue-50/20 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100/50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-black text-slate-800">快捷支付</p>
                                            <p className="text-[10px] text-slate-400 font-bold">微信 / 支付宝 / 银联</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>

                            <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed px-6 opacity-60 uppercase tracking-tighter">
                                点击支付即同意《开发者订阅协议》<br />
                                支付完成后权益将实时同步至您的所有设备
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}