// 付费墙
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SubscriptionWall({ bookId }: { bookId: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100"
            >
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
                    🔒
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    加入付费专栏<br />解锁深度技术
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-10">
                    本章节属于《高级实战系列》，包含独家源码解析与性能优化方案，仅对订阅会员开放。
                </p>

                <div className="space-y-4">
                    <Link href={`/checkout?type=subscription&id=${bookId}`} className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                        立即订阅专栏 ￥49
                    </Link>
                    <Link href="/" className="block w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-600">
                        返回首页
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center gap-6 opacity-40 grayscale">
                    <span className="text-xs font-bold uppercase tracking-widest">Mastercard</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Alipay</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Wechat</span>
                </div>
            </motion.div>
        </div>
    );
}