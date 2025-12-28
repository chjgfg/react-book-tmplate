// 任务中心
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//     Award,
//     CheckCircle2,
//     Circle,
//     Zap,
//     BookOpen,
//     MessageSquare,
//     Target,
//     ChevronRight,
//     Trophy,
//     Star
// } from "lucide-react";
// import confetti from "canvas-confetti";
// import BackButton from "@/components/BackButton";

// export default function TaskHub() {
//     const [points, setPoints] = useState(1250);
//     const [signedIn, setSignedIn] = useState(false);

//     // 签到交互
//     const handleSignIn = () => {
//         if (signedIn) return;
//         setSignedIn(true);
//         setPoints(prev => prev + 50);
//         confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { y: 0.6 },
//             colors: ['#3B82F6', '#60A5FA', '#FBBF24']
//         });
//     };

//     const dailyTasks = [
//         { id: 1, title: "每日阅读 15 分钟", reward: "+30 积分", progress: 60, icon: <BookOpen className="w-4 h-4" /> },
//         { id: 2, title: "发表一条有价值的评论", reward: "+20 积分", progress: 0, icon: <MessageSquare className="w-4 h-4" /> },
//         { id: 3, title: "分享一本书籍给好友", reward: "+50 积分", progress: 100, icon: <Zap className="w-4 h-4" /> },
//     ];

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] pt-12 pb-20">
//             <div className="max-w-6xl mx-auto px-6">
//                 <BackButton />

//                 {/* 顶部：积分概览与签到 */}
//                 <header className="mt-8 mb-12 flex flex-col md:flex-row gap-6 justify-between items-end">
//                     <div>
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center gap-3 text-blue-600 mb-2"
//                         >
//                             <Trophy className="w-5 h-5" />
//                             <span className="text-xs font-black uppercase tracking-widest">Growth Center</span>
//                         </motion.div>
//                         <h1 className="text-5xl font-black text-slate-900 tracking-tighter">任务中心</h1>
//                     </div>

//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8 min-w-[300px]"
//                     >
//                         <div>
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">当前可用积分</p>
//                             <p className="text-3xl font-black text-slate-900">{points.toLocaleString()}</p>
//                         </div>
//                         <button
//                             onClick={handleSignIn}
//                             disabled={signedIn}
//                             className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all active:scale-95 ${signedIn
//                                     ? 'bg-slate-100 text-slate-400 cursor-default'
//                                     : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
//                                 }`}
//                         >
//                             {signedIn ? '今日已签到' : '立即签到 +50'}
//                         </button>
//                     </motion.div>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                     {/* 左侧：任务列表 */}
//                     <div className="lg:col-span-8 space-y-6">
//                         {/* 每日任务 */}
//                         <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
//                             <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
//                                 <Target className="w-5 h-5 text-blue-600" /> 每日挑战
//                             </h3>
//                             <div className="space-y-6">
//                                 {dailyTasks.map((task) => (
//                                     <div key={task.id} className="group flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors">
//                                         <div className="flex items-center gap-5">
//                                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.progress === 100 ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
//                                                 {task.progress === 100 ? <CheckCircle2 className="w-5 h-5" /> : task.icon}
//                                             </div>
//                                             <div>
//                                                 <p className="font-bold text-slate-900">{task.title}</p>
//                                                 <div className="flex items-center gap-3 mt-1">
//                                                     <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                                         <motion.div
//                                                             initial={{ width: 0 }}
//                                                             animate={{ width: `${task.progress}%` }}
//                                                             className="h-full bg-blue-500"
//                                                         />
//                                                     </div>
//                                                     <span className="text-[10px] font-bold text-slate-400">{task.progress}%</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="text-xs font-black text-blue-600 mb-1">{task.reward}</p>
//                                             <button className={`text-[10px] font-black uppercase tracking-widest ${task.progress === 100 ? 'text-slate-300 pointer-events-none' : 'text-slate-900 hover:text-blue-600'}`}>
//                                                 {task.progress === 100 ? '已领取' : '去完成 →'}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* 长期成就 */}
//                         <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
//                                 <Star className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
//                                 <h4 className="text-lg font-black mb-2 italic">技术专家之路</h4>
//                                 <p className="text-slate-400 text-xs mb-8">累计阅读时长达到 100 小时可获得专属勋章与实体证书。</p>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-[10px] font-bold text-blue-400">当前进度: 48.5h</span>
//                                     <button className="text-[10px] font-black uppercase tracking-widest bg-blue-600 px-4 py-2 rounded-xl">详情</button>
//                                 </div>
//                             </div>
//                             <div className="bg-indigo-600 rounded-[3rem] p-8 text-white relative overflow-hidden group">
//                                 <Zap className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
//                                 <h4 className="text-lg font-black mb-2 italic">知识传播官</h4>
//                                 <p className="text-indigo-100 text-xs mb-8">成功邀请 3 位好友注册并购买书籍，获得￥50 无门槛券。</p>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-[10px] font-bold text-indigo-200">进度: 1/3</span>
//                                     <button className="text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 px-4 py-2 rounded-xl">去邀请</button>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>

//                     {/* 右侧：快速兑换与等级 */}
//                     <div className="lg:col-span-4 space-y-6">
//                         <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
//                             <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center justify-between">
//                                 积分商城 <Link href="/rewards/swag"><ChevronRight className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" /></Link>
//                             </h3>
//                             <div className="space-y-4">
//                                 {[
//                                     { name: "定制机械键盘托", points: 1200, icon: "⌨️" },
//                                     { name: "Code & Coffee 陶瓷杯", points: 500, icon: "☕" },
//                                 ].map((item, i) => (
//                                     <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
//                                         <div className="flex items-center gap-3">
//                                             <span className="text-xl">{item.icon}</span>
//                                             <span className="text-xs font-bold text-slate-700">{item.name}</span>
//                                         </div>
//                                         <span className="text-[10px] font-black text-blue-600">{item.points} pt</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 text-white">
//                             <h3 className="text-sm font-black mb-6">等级特权</h3>
//                             <div className="flex items-end gap-2 mb-2">
//                                 <span className="text-4xl font-black italic">LV.12</span>
//                                 <span className="text-[10px] font-bold opacity-60 mb-1">Architecture Level</span>
//                             </div>
//                             <p className="text-xs opacity-80 leading-relaxed mb-6">您已击败了全球 85% 的开发者。升级至 LV.13 即可解锁“内测书籍”抢先读权限。</p>
//                             <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
//                                 <motion.div
//                                     initial={{ width: 0 }}
//                                     animate={{ width: '75%' }}
//                                     className="h-full bg-white shadow-[0_0_10px_#fff]"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Award,
    CheckCircle2,
    Zap,
    BookOpen,
    MessageSquare,
    Target,
    ChevronRight,
    Trophy,
    Star
} from "lucide-react";
import confetti from "canvas-confetti";
import BackButton from "@/components/BackButton";
import ExchangeModal from "@/components/ExchangeModal";

export default function TaskHub() {
    // 1. 统一状态管理
    const [points, setPoints] = useState(1250);
    const [signedIn, setSignedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // 2. 签到逻辑
    const handleSignIn = () => {
        if (signedIn) return;
        setSignedIn(true);
        setPoints(prev => prev + 50);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3B82F6', '#60A5FA', '#FBBF24']
        });
    };

    // 3. 兑换逻辑
    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmExchange = () => {
        if (selectedProduct) {
            setPoints(p => p - selectedProduct.points);
            setIsModalOpen(false);
            confetti({ 
                particleCount: 150,
                spread: 100,
                colors: ['#10B981', '#3B82F6']
            });
        }
    };

    // 4. 任务数据
    const dailyTasks = [
        { id: 1, title: "每日阅读 15 分钟", reward: "+30 积分", progress: 60, icon: <BookOpen className="w-4 h-4" />, href: "/" },
        { id: 2, title: "发表一条有价值的评论", reward: "+20 积分", progress: 0, icon: <MessageSquare className="w-4 h-4" />, href: "/library" },
        { id: 3, title: "分享一本书籍给好友", reward: "+50 积分", progress: 100, icon: <Zap className="w-4 h-4" />, href: "/library" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-12 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <BackButton />

                {/* 顶部：积分概览与签到 (整合版) */}
                <header className="mt-8 mb-12 flex flex-col md:flex-row gap-6 justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-blue-600 mb-2"
                        >
                            <Trophy className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">Growth Center</span>
                        </motion.div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">任务中心</h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8 min-w-[320px]"
                    >
                        <Link href="/rewards/tasks/history" className="hover:opacity-70 transition-opacity">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">可用积分 (点击明细)</p>
                            <p className="text-3xl font-black text-slate-900">{points.toLocaleString()}</p>
                        </Link>
                        <button
                            onClick={handleSignIn}
                            disabled={signedIn}
                            className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all active:scale-95 ${
                                signedIn
                                ? 'bg-slate-100 text-slate-400 cursor-default'
                                : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
                            }`}
                        >
                            {signedIn ? '今日已签到' : '立即签到 +50'}
                        </button>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* 左侧：任务列表与成就 */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* 每日挑战部分 */}
                        <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" /> 每日挑战
                            </h3>
                            <div className="space-y-6">
                                {dailyTasks.map((task) => (
                                    <div key={task.id} className="group flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.progress === 100 ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {task.progress === 100 ? <CheckCircle2 className="w-5 h-5" /> : task.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{task.title}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${task.progress}%` }}
                                                            className="h-full bg-blue-500"
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400">{task.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-blue-600 mb-1">{task.reward}</p>
                                            <Link 
                                                href={task.href}
                                                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                                                    task.progress === 100 ? 'text-slate-300 pointer-events-none' : 'text-slate-900 hover:text-blue-600'
                                                }`}
                                            >
                                                {task.progress === 100 ? '已领取' : '去完成 →'}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 长期成就卡片部分 */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                                <Star className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                <h4 className="text-lg font-black mb-2 italic text-blue-400">技术专家之路</h4>
                                <p className="text-slate-400 text-xs mb-8">累计阅读时长达到 100 小时可获得专属勋章与实体证书。</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-blue-400">当前进度: 48.5h</span>
                                    <Link href="/rewards/tasks/achievements" className="text-[10px] font-black uppercase tracking-widest bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors">勋章墙</Link>
                                </div>
                            </div>
                            <div className="bg-indigo-600 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                                <Zap className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
                                <h4 className="text-lg font-black mb-2 italic">知识传播官</h4>
                                <p className="text-indigo-100 text-xs mb-8">成功邀请 3 位好友注册并购买书籍，获得￥50 无门槛券。</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-indigo-200">进度: 1/3</span>
                                    <button className="text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 px-4 py-2 rounded-xl">去邀请</button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* 右侧：积分商城与等级 */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 积分商城快捷兑换 */}
                        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">积分商城</h3>
                                <Link href="/rewards/swag">
                                    <ChevronRight className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: "定制机械键盘托", points: 1200, icon: "⌨️" },
                                    { name: "Code & Coffee 陶瓷杯", points: 500, icon: "☕" },
                                ].map((item, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleProductClick(item)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">{item.name}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-blue-600">{item.points} pt</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 等级展示部分 */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 text-white">
                            <h3 className="text-sm font-black mb-6 uppercase tracking-widest">等级特权</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black italic">LV.12</span>
                                <span className="text-[10px] font-bold opacity-60 mb-1">Architecture Level</span>
                            </div>
                            <p className="text-xs opacity-80 leading-relaxed mb-6">您已击败了全球 85% 的开发者。升级至 LV.13 即可解锁“内测书籍”抢先读权限。</p>
                            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    className="h-full bg-white shadow-[0_0_10px_#fff]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. 统一弹窗组件 */}
            <ExchangeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                userPoints={points}
                onConfirm={handleConfirmExchange}
            />
        </div>
    );
}