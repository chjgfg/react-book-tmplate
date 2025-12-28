// 我的优惠券
"use client";

import BackButton from "@/components/BackButton";
import { Ticket, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MyCouponsPage() {
    // 模拟已领取的券
    const myCoupons = [
        { id: 2, title: "新用户专享券", value: "￥50", condition: "满 199 可用", status: "可用" },
        { id: 4, title: "节日礼券", value: "￥10", condition: "无门槛", status: "可用" },
    ];

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <BackButton />
                
                <header className="my-12 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">我的优惠券</h1>
                        <p className="text-slate-400 mt-2 font-medium">账户内共有 {myCoupons.length} 张可用卡券</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-3xl flex items-center gap-3">
                        <Wallet className="text-blue-600 w-5 h-5" />
                        <span className="text-sm font-black text-blue-900">去卡包兑换</span>
                    </div>
                </header>

                <div className="space-y-4">
                    {myCoupons.map((coupon) => (
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            key={coupon.id} 
                            className="border-2 border-slate-50 rounded-[2rem] p-6 flex items-center justify-between hover:border-blue-100 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-3xl font-black text-blue-600 w-20">{coupon.value}</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{coupon.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{coupon.condition}</p>
                                </div>
                            </div>
                            <Link href="/">
                                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                    立即去使用 <ArrowRight className="w-3 h-3" />
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}