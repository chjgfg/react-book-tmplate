// 领券中心
"use client";

import { useState } from "react";
import { Ticket, Tag, Clock, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";

const INITIAL_COUPONS = [
    { id: 1, title: "全场通用满减券", value: "￥20", condition: "满 99 可用", expiry: "2026-01-01", claimed: false },
    { id: 2, title: "新用户专享券", value: "￥50", condition: "满 199 可用", expiry: "2025-12-31", claimed: true },
    { id: 3, title: "前端分类折扣券", value: "8.5折", condition: "无门槛限制", expiry: "2025-06-14", claimed: false },
];

export default function CouponPage() {
    const [coupons, setCoupons] = useState(INITIAL_COUPONS);

    const handleClaim = (id: number) => {
        setCoupons(prev => prev.map(c => {
            if (c.id === id && !c.claimed) {
                // 触发撒花
                confetti({
                    particleCount: 80,
                    spread: 50,
                    origin: { y: 0.7 },
                    colors: ['#ef4444', '#f87171', '#fee2e2']
                });
                return { ...c, claimed: true };
            }
            return c;
        }));
    };

    return (
        <div className="min-h-screen bg-[#ffffff] pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <BackButton />
                    {/* 指向“我的优惠券” */}
                    <Link href="/rewards/coupons/my" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">
                        我的优惠券 →
                    </Link>
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-2xl">
                        <Ticket className="w-8 h-8 text-red-500" />
                    </div>
                    领券中心
                </h1>
                <p className="text-slate-500 mb-12">好券每日限时发放，助你低价补给知识。</p>

                <div className="grid gap-6">
                    {coupons.map((coupon, idx) => (
                        <motion.div 
                            key={coupon.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group relative bg-white rounded-[2.5rem] border p-1 border-slate-100 flex items-stretch shadow-sm transition-all ${coupon.claimed ? 'grayscale-[0.5] opacity-80' : 'hover:shadow-xl hover:-translate-y-1'}`}
                        >
                            {/* 锯齿边缘视觉设计 */}
                            <div className={`w-32 flex flex-col items-center justify-center rounded-l-[2.3rem] text-white relative ${coupon.claimed ? 'bg-slate-400' : 'bg-red-500'}`}>
                                <span className="text-2xl font-black">{coupon.value}</span>
                                <div className="absolute -right-1.5 top-0 bottom-0 flex flex-col justify-around py-2">
                                    {/* {[1,2,3,4,5,6].map(i => <div key={i} className="w-3 h-3 bg-[#F8FAFC] rounded-full" />)} */}
                                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-3 h-3 bg-[#ffffff] rounded-full" />)}
                                </div>
                            </div>

                            <div className="flex-1 p-8 pl-10 flex items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 group-hover:text-red-500 transition-colors">{coupon.title}</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <Tag className="w-3 h-3" /> {coupon.condition}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <Clock className="w-3 h-3" /> 到期: {coupon.expiry}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleClaim(coupon.id)}
                                    disabled={coupon.claimed}
                                    className={`px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                                        coupon.claimed 
                                        ? 'bg-slate-100 text-slate-400 cursor-default' 
                                        : 'bg-slate-900 text-white shadow-lg hover:bg-red-600'
                                    }`}
                                >
                                    {coupon.claimed ? (
                                        <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> 已领取</span>
                                    ) : '立即领取'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}