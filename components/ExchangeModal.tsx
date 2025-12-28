// 
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ExchangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        points: number;
        icon: string;
    } | null;
    userPoints: number;
    onConfirm: () => void;
}

export default function ExchangeModal({ isOpen, onClose, product, userPoints, onConfirm }: ExchangeModalProps) {
    if (!product) return null;

    const canAfford = userPoints >= product.points;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* 弹窗主体 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                    >
                        {/* 关闭按钮 */}
                        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6">
                                {product.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">确认兑换</h3>
                            <p className="text-slate-500 text-sm mb-8">您将消耗积分兑换此商品，兑换后可在“我的订单”查看详情。</p>

                            {/* 积分详情卡片 */}
                            <div className="bg-slate-50 rounded-3xl p-6 mb-8 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-500">兑换商品</span>
                                    <span className="font-black text-slate-900">{product.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-500">消耗积分</span>
                                    <span className="font-black text-blue-600">-{product.points} pt</span>
                                </div>
                                <div className="h-[1px] bg-slate-200" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">剩余积分</span>
                                    <span className={`text-lg font-black ${canAfford ? 'text-slate-900' : 'text-red-500'}`}>
                                        {(userPoints - product.points).toLocaleString()} pt
                                    </span>
                                </div>
                            </div>

                            {/* 操作按钮 */}
                            {canAfford ? (
                                <button
                                    onClick={onConfirm}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    确认兑换 <CheckCircle2 className="w-4 h-4" />
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 justify-center text-red-500 bg-red-50 py-3 rounded-xl">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase">积分余额不足</span>
                                    </div>
                                    <Link
                                        href="/rewards/tasks"
                                        onClick={onClose}
                                        className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm text-center"
                                    >
                                        去赚积分
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}