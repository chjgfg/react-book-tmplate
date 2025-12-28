// 积分明细
"use client";

import BackButton from "@/components/BackButton";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

const HISTORY = [
    { id: 1, type: 'gain', title: '每日签到奖励', amount: '+50', date: '2025-05-20 09:00' },
    { id: 2, type: 'gain', title: '完成任务: 分享一本书籍', amount: '+50', date: '2025-05-19 14:20' },
    { id: 3, type: 'loss', title: '兑换: 定制机械键盘托', amount: '-1200', date: '2025-05-18 20:15' },
];

export default function PointHistoryPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <BackButton />
                <h1 className="text-3xl font-black text-slate-900 my-10 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-blue-600" /> 积分明细
                </h1>

                <div className="space-y-4">
                    {HISTORY.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${item.type === 'gain' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {item.type === 'gain' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{item.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</p>
                                </div>
                            </div>
                            <span className={`text-xl font-black ${item.type === 'gain' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}