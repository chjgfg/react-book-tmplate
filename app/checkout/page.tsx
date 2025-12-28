"use client";

import { useCart } from "@/app/providers/CartProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

    // 防止直接访问空购物车
    if (items.length === 0 && !isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-6">💳</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">订单已失效</h2>
                <p className="text-gray-400 mb-8">您当前的购物车中没有需要支付的商品</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    返回首页继续探索
                </button>
            </div>
        );
    }

    const handlePay = () => {
        setIsProcessing(true);
        // 模拟支付延迟，增加真实感
        setTimeout(() => {
            clearCart();
            const purchased = JSON.parse(localStorage.getItem("library") || "[]");
            const newBooks = items.map(item => ({ id: item.id, title: item.title }));
            localStorage.setItem("library", JSON.stringify([...purchased, ...newBooks]));
            router.push("/library");
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20">
            {/* 状态步骤指示器 */}
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shadow-lg shadow-blue-200">1</span>
                    确认订单
                </div>
                <div className="w-12 h-[1px] bg-gray-200"></div>
                <div className="flex items-center gap-2 text-gray-400 font-medium">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">2</span>
                    完成购买
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* 左侧：信息填写 */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-blue-500">📍</span> 收货信息
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                placeholder="收货人姓名"
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                            />
                            <input
                                placeholder="手机号"
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                            />
                            <textarea
                                placeholder="详细收货地址"
                                rows={3}
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-blue-500">💰</span> 支付方式
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-2 border-blue-600 bg-blue-50/50 p-4 rounded-xl relative cursor-pointer">
                                <p className="font-bold text-sm text-blue-700">在线支付</p>
                                <p className="text-[10px] text-blue-500">微信/支付宝/银行卡</p>
                                <div className="absolute top-2 right-2 text-blue-600">✓</div>
                            </div>
                            <div className="border-2 border-gray-100 p-4 rounded-xl opacity-50 grayscale cursor-not-allowed">
                                <p className="font-bold text-sm text-gray-400">货到付款</p>
                                <p className="text-[10px] text-gray-400">暂不支持</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 右侧：订单明细卡片 */}
                <div className="sticky top-24">
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                            <h3 className="font-black text-gray-900">订单详单</h3>
                        </div>

                        {/* ⭐ 关键优化：限制最大高度并允许内部滚动 */}
                        <div className="p-6 space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm group">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </span>
                                        <span className="text-xs text-gray-400">数量 × {item.count}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 ml-4">¥{item.price * item.count}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-6 bg-slate-900 text-white">
                            <div className="flex justify-between items-center mb-6">
                                <span className="opacity-60 text-sm">应付总额</span>
                                <span className="text-3xl font-black">¥{totalPrice}</span>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${isProcessing
                                    ? "bg-slate-700 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-400 shadow-blue-500/20"
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="animate-spin text-xl">⏳</span>
                                        正在处理...
                                    </>
                                ) : (
                                    <>安全支付 ¥{totalPrice}</>
                                )}
                            </button>

                            <p className="text-[10px] text-center mt-4 opacity-40 uppercase tracking-widest">
                                SSL Secure Encrypted Payment
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}