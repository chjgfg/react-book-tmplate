"use client";

import { useCart } from "@/app/providers/CartProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, increaseCount, removeFromCart, decreaseCount, clearCart } = useCart();
    const router = useRouter();

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

    // 空购物车状态美化
    if (items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-24 text-center">
                <div className="text-8xl mb-6">🛒</div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">购物车空空如也</h2>
                <p className="text-gray-400 mb-8 text-lg">这里的书还没准备好跟你回家，快去挑几本吧！</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                >
                    回首页逛逛
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 pb-20">
            {/* 顶部标题栏 */}
            <div className="flex items-baseline justify-between mb-8 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">我的购物车</h1>
                    <p className="text-gray-400 text-sm mt-1">共 {items.length} 种书籍</p>
                </div>
                <button
                    onClick={clearCart}
                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                    <span>🗑️</span> 清空全部
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* 左侧商品列表 (占 2 份) */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            {/* 模拟封面缩略图 */}
                            <div className="w-16 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                                📖
                            </div>

                            {/* 信息区 */}
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-xs mt-1 font-medium">单价：¥{item.price}</p>
                            </div>

                            {/* 数量控制区 */}
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                <button
                                    onClick={() => decreaseCount(item.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center font-bold text-gray-800 text-sm">{item.count}</span>
                                <button
                                    onClick={() => increaseCount(item.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                                >
                                    +
                                </button>
                            </div>

                            {/* 价格与删除 */}
                            <div className="flex flex-col items-end gap-2 ml-4 min-w-[80px]">
                                <div className="font-black text-gray-900">
                                    ¥{item.price * item.count}
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider"
                                >
                                    移除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 右侧：结算卡片 (Sticky) */}
                <div className="lg:sticky lg:top-24 space-y-4">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                        <h3 className="text-lg font-bold mb-6">订单摘要</h3>

                        <div className="space-y-4 text-sm opacity-80">
                            <div className="flex justify-between">
                                <span>商品总额</span>
                                <span>¥{totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>运费</span>
                                <span className="text-green-400">免运费</span>
                            </div>
                            <div className="h-[1px] bg-white/10 my-2"></div>
                        </div>

                        <div className="mt-6 flex flex-col gap-1">
                            <span className="text-sm opacity-60">实付款</span>
                            <div className="text-4xl font-black text-white">
                                <span className="text-xl mr-1">¥</span>{totalPrice}
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="mt-8 w-full bg-blue-500 hover:bg-blue-400 py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            去结算 <span className="text-xl">→</span>
                        </Link>

                        <p className="mt-4 text-[10px] text-center opacity-40">
                            安全支付保障 | 7天无理由退款
                        </p>
                    </div>

                    {/* 优惠信息占位 */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
                        <span className="text-xl">🎁</span>
                        <p className="text-xs text-blue-700 font-medium">
                            满 ¥200 赠送 10 元书券，还差 <span className="font-bold">¥{Math.max(0, 200 - totalPrice)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}