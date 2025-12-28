// // 会员中心
"use client";

import { motion } from "framer-motion";
import { 
    Crown, 
    Zap, 
    BookOpen, 
    Gift, 
    CheckCircle2, 
    Star, 
    ArrowRight 
} from "lucide-react";
import BackButton from "@/components/BackButton";
import confetti from "canvas-confetti";

const BENEFITS = [
    { title: "全场图书 8 折", desc: "无论是新书还是经典，购买立享会员折扣。", icon: <Zap className="text-yellow-400" /> },
    { title: "专栏抢先读", desc: "热门角色专栏更新后，会员拥有 48 小时优先阅读权。", icon: <BookOpen className="text-blue-400" /> },
    { title: "每月免费卡包", desc: "每月月初自动发放 3 个高级卡包，助你集齐 UR 卡。", icon: <Gift className="text-purple-400" /> },
    { title: "专属头衔勋章", desc: "在广场和个人中心展示独特的『技术领航者』身份。", icon: <Crown className="text-orange-400" /> },
];

export default function MembershipPage() {
    const handleJoin = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fbbf24', '#ffffff', '#000000']
        });
        alert("恭喜！您已成功领取会员试用权益。");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-6">
                <BackButton className="text-white bg-white/10 border-transparent hover:bg-white/20" />

                <header className="my-16 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-yellow-500/20"
                    >
                        <Star className="w-3 h-3 fill-current" /> Premium Membership
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 italic">
                        解锁您的<span className="text-yellow-500"> 极客特权 </span>
                    </h1>
                    <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
                        加入 12,000+ 核心开发者行列，享受全方位的学习与社区激励特权。
                    </p>
                </header>

                {/* 权益卡片网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {BENEFITS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-yellow-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black mb-2">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 订阅行动区 */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-[3rem] p-12 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(251,191,36,0.3)]"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">限时活动：新用户首月免费</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2">立即领取会员资格</h2>
                        <p className="font-bold opacity-70">后续仅需 199 积分 / 月</p>
                    </div>
                    <button 
                        onClick={handleJoin}
                        className="px-12 py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all active:scale-95 shadow-2xl flex items-center gap-2"
                    >
                        立即领取 <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}