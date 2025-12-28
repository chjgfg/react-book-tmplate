// 活动中心
// "use client";

// import { motion } from "framer-motion";
// import { Zap, Timer, Users, ArrowRight } from "lucide-react";
// import BackButton from "@/components/BackButton";

// const EVENTS = [
//     { id: 1, title: "21天 React 源码共读营", status: "报名中", participants: 1240, cover: "⚛️", color: "bg-blue-600" },
//     { id: 2, title: "2025 技术趋势征文大赛", status: "进行中", participants: 450, cover: "📝", color: "bg-indigo-600" },
//     { id: 3, title: "开发者线下交流会 - 上海站", status: "已结束", participants: 100, cover: "☕", color: "bg-slate-400" },
// ];

// export default function EventsPage() {
//     return (
//         <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
//             <div className="max-w-5xl mx-auto px-6">
//                 <BackButton />
//                 <h1 className="text-3xl font-black text-slate-900 my-10">社区活动</h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {EVENTS.map(event => (
//                         <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group">
//                             <div className={`${event.color} h-40 flex items-center justify-center text-6xl`}>
//                                 {event.cover}
//                             </div>
//                             <div className="p-8">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <span className={`text-[10px] font-black px-3 py-1 rounded-full text-white ${event.status === '已结束' ? 'bg-slate-300' : 'bg-emerald-500'}`}>
//                                         {event.status}
//                                     </span>
//                                     <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
//                                         <Users className="w-3 h-3" /> {event.participants} 人参与
//                                     </span>
//                                 </div>
//                                 <h3 className="text-xl font-black text-slate-900 mb-6">{event.title}</h3>
//                                 <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-xs font-black group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center gap-2">
//                                     查看详情 <ArrowRight className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Timer, Users, ArrowRight, X, Calendar, MapPin, Trophy } from "lucide-react";
import BackButton from "@/components/BackButton";
import confetti from "canvas-confetti";

const EVENTS = [
    {
        id: 1,
        title: "21天 React 源码共读营",
        status: "报名中",
        participants: 1240,
        cover: "⚛️",
        color: "bg-blue-600",
        details: "深度解析 React 架构，从 Fiber 树到调度系统，名师带队打卡。",
        time: "2025-02-01 开营",
        location: "线上直播间"
    },
    {
        id: 2,
        title: "2025 技术趋势征文大赛",
        status: "进行中",
        participants: 450,
        cover: "📝",
        color: "bg-indigo-600",
        details: "分享你对未来技术的思考，赢取最高 5000 元奖金及出版社签约机会。",
        time: "截止日期：2025-03-15",
        location: "社区专栏"
    },
    {
        id: 3,
        title: "开发者线下交流会 - 上海站",
        status: "已结束",
        participants: 100,
        cover: "☕",
        color: "bg-slate-400",
        details: "面对面交流架构心得，更有大厂专家分享面试避坑指南。",
        time: "2024-12-20",
        location: "上海市浦东新区张江高科"
    },
];

export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleJoin = (e: React.MouseEvent, title: string) => {
        e.stopPropagation(); // 防止触发打开详情
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#3b82f6']
        });
        alert(`报名成功！已将《${title}》加入您的行程。`);
    };

    return (
        <div className="min-h-screen bg-[#ffffff] pt-24 pb-20 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <BackButton />
                <header className="my-10">
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">社区活动</h1>
                    <p className="text-slate-400 font-medium">参与技术挑战与交流，在实践中突破成长。</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {EVENTS.map((event, idx) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            <div className={`${event.color} h-44 flex items-center justify-center text-7xl transition-transform group-hover:scale-110 duration-500`}>
                                {event.cover}
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <span className={`text-[10px] font-black px-4 py-1 rounded-full text-white tracking-widest uppercase ${event.status === '已结束' ? 'bg-slate-300' :
                                            event.status === '报名中' ? 'bg-blue-600' : 'bg-emerald-500'
                                        }`}>
                                        {event.status}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Users className="w-3.5 h-3.5" /> {event.participants} Members
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-8 leading-tight group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-black transition-all hover:bg-slate-100 flex items-center justify-center gap-2">
                                        查看详情
                                    </button>
                                    {event.status === '报名中' && (
                                        <button
                                            onClick={(e) => handleJoin(e, event.title)}
                                            className="px-6 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95"
                                        >
                                            立即报名
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 活动详情弹窗 (Overlay) */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-[3.5rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <button onClick={() => setSelectedEvent(null)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            <div className={`${selectedEvent.color} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-inner`}>
                                {selectedEvent.cover}
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 mb-6">{selectedEvent.title}</h2>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 text-slate-500">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-bold">{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500">
                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-bold">{selectedEvent.location}</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-bold">参与即可获得 200 成长积分</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl mb-10">
                                <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                                    “ {selectedEvent.details} ”
                                </p>
                            </div>

                            <button
                                onClick={(e) => { handleJoin(e, selectedEvent.title); setSelectedEvent(null); }}
                                className={`w-full py-5 rounded-2xl font-black text-sm transition-all active:scale-95 ${selectedEvent.status === '已结束'
                                        ? 'bg-slate-100 text-slate-400 cursor-default'
                                        : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700'
                                    }`}
                            >
                                {selectedEvent.status === '已结束' ? '活动已结束' : '立即锁定席位'}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}