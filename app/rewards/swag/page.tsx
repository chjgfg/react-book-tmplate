// 周边商城页面
// "use client";

// import { motion } from "framer-motion";
// import { ShoppingBag, Star, ArrowRight, Sparkles } from "lucide-react";
// import BackButton from "@/components/BackButton";
// import Image from "next/image";
// import ExchangeModal from "@/components/ExchangeModal";
// import { useState } from "react";
// import confetti from "canvas-confetti";

// const SWAG_PRODUCTS = [
//     { id: 1, name: "极客专属机械键盘托", price: 129, points: 1200, icon: "⌨️", color: "bg-orange-50", tag: "热销" },
//     { id: 2, name: "Code & Coffee 陶瓷杯", price: 49, points: 500, icon: "☕", color: "bg-blue-50", tag: "必入" },
//     { id: 3, name: "Binary 逻辑主题 T-Shirt", price: 89, points: 900, icon: "👕", color: "bg-slate-50", tag: "限量" },
//     { id: 4, name: "开发者定制盲盒 (Series 1)", price: 59, points: 600, icon: "🎁", color: "bg-purple-50", tag: "新品" },
//     { id: 5, name: "GitHub 风格极简笔记本", price: 35, points: 300, icon: "📓", color: "bg-emerald-50", tag: "推荐" },
//     { id: 6, name: "全键盘宏定义贴纸包", price: 19, points: 200, icon: "🏷️", color: "bg-red-50", tag: "超值" },
// ];

// export default function SwagStore() {
//     const [userPoints, setUserPoints] = useState(1250); // 模拟用户当前积分
//     const [selectedProduct, setSelectedProduct] = useState<any>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleExchangeClick = (product: any) => {
//         setSelectedProduct(product);
//         setIsModalOpen(true);
//     };

//     const handleConfirmExchange = () => {
//         if (!selectedProduct) return;
        
//         // 扣除积分
//         setUserPoints(prev => prev - selectedProduct.points);
//         setIsModalOpen(false);

//         // 撒花反馈
//         confetti({
//             particleCount: 200,
//             spread: 90,
//             origin: { y: 0.5 },
//             colors: ['#3b82f6', '#10b981', '#fbbf24']
//         });

//         // 实际应用中这里会调用 API
//         alert(`兑换成功！${selectedProduct.name} 已加入您的库存。`);
//     };

//     return (
//         <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
//             <div className="max-w-6xl mx-auto px-6">
//                 <BackButton />
                
//                 <header className="my-10">
//                     <div className="flex items-center gap-3 text-blue-600 mb-2">
//                         <ShoppingBag className="w-5 h-5" />
//                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Swag Store</span>
//                     </div>
//                     <h1 className="text-4xl font-black text-slate-900 tracking-tight">周边商城</h1>
//                     <p className="text-slate-400 text-sm mt-2 font-medium">使用积分或现金兑换你的开发者专属装备。</p>
//                 </header>

//                 {/* 商品网格 */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {SWAG_PRODUCTS.map((product, idx) => (
//                         <motion.div
//                             key={product.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             whileHover={{ y: -8 }}
//                             className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
//                         >
//                             {/* 商品展示区 */}
//                             <div className={`${product.color} h-48 flex items-center justify-center text-6xl relative overflow-hidden`}>
//                                 <motion.span 
//                                     whileHover={{ rotate: 12, scale: 1.2 }}
//                                     className="relative z-10"
//                                 >
//                                     {product.icon}
//                                 </motion.span>
//                                 <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
//                                     {product.tag}
//                                 </div>
//                             </div>

//                             {/* 商品信息 */}
//                             <div className="p-8">
//                                 <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
//                                     {product.name}
//                                 </h3>
//                                 <div className="flex items-center justify-between mb-6">
//                                     <div className="flex flex-col">
//                                         <span className="text-xl font-black text-slate-900">￥{product.price}</span>
//                                         <span className="text-[10px] font-bold text-slate-400">或 {product.points} 积分</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                         {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
//                                     </div>
//                                 </div>
//                                 <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-all active:scale-95">
//                                     立即购买 <ArrowRight className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* 引入弹窗 */}
//                 <ExchangeModal 
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     product={selectedProduct}
//                     userPoints={userPoints}
//                     onConfirm={handleConfirmExchange}
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Sparkles, Wallet } from "lucide-react";
import BackButton from "@/components/BackButton";
import ExchangeModal from "@/components/ExchangeModal";
import { useState } from "react";
import confetti from "canvas-confetti";

const SWAG_PRODUCTS = [
    { id: 1, name: "极客专属机械键盘托", price: 129, points: 1200, icon: "⌨️", color: "bg-orange-50", tag: "热销" },
    { id: 2, name: "Code & Coffee 陶瓷杯", price: 49, points: 500, icon: "☕", color: "bg-blue-50", tag: "必入" },
    { id: 3, name: "Binary 逻辑主题 T-Shirt", price: 89, points: 900, icon: "👕", color: "bg-slate-50", tag: "限量" },
    { id: 4, name: "开发者定制盲盒 (Series 1)", price: 59, points: 600, icon: "🎁", color: "bg-purple-50", tag: "新品" },
    { id: 5, name: "GitHub 风格极简笔记本", price: 35, points: 300, icon: "📓", color: "bg-emerald-50", tag: "推荐" },
    { id: 6, name: "全键盘宏定义贴纸包", price: 19, points: 200, icon: "🏷️", color: "bg-red-50", tag: "超值" },
];

export default function SwagStore() {
    const [userPoints, setUserPoints] = useState(1250); 
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. 修正：触发弹窗的逻辑
    const handleExchangeClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // 2. 修正：确认兑换后的逻辑
    const handleConfirmExchange = () => {
        if (!selectedProduct) return;
        
        // 扣除积分
        setUserPoints(prev => prev - selectedProduct.points);
        setIsModalOpen(false);

        // 撒花反馈
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#fbbf24']
        });

        // 这里可以添加一个更精致的 Toast 提示
        console.log(`兑换成功：${selectedProduct.name}`);
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-6">
                    <BackButton />
                    
                    {/* 新增：右上角积分展示，让用户知道自己有多少钱 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 shadow-sm"
                    >
                        <Wallet className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black text-blue-900 uppercase tracking-widest">
                            可用积分: {userPoints.toLocaleString()}
                        </span>
                    </motion.div>
                </div>
                
                <header className="my-10">
                    <div className="flex items-center gap-3 text-blue-600 mb-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Swag Store</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">周边商城</h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">使用积分兑换你的开发者专属装备，展现技术品味。</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SWAG_PRODUCTS.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className={`${product.color} h-48 flex items-center justify-center text-6xl relative overflow-hidden`}>
                                <motion.span 
                                    whileHover={{ rotate: 12, scale: 1.2 }}
                                    className="relative z-10"
                                >
                                    {product.icon}
                                </motion.span>
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                    {product.tag}
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-slate-900">￥{product.price}</span>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                                            需 {product.points} 积分
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                </div>
                                
                                {/* 修正：绑定 handleExchangeClick 弹出确认框 */}
                                <button 
                                    onClick={() => handleExchangeClick(product)}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    立即兑换 <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <ExchangeModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                    userPoints={userPoints}
                    onConfirm={handleConfirmExchange}
                />
            </div>
        </div>
    );
}