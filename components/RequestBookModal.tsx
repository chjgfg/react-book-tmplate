// 提交购书需求
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, BookPlus, MessageSquare } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function RequestBookModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        
        // 模拟 API 请求
        setTimeout(() => {
            setStatus("success");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                onClose();
                setStatus("idle");
            }, 2000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl"
                    >
                        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        {status === "success" ? (
                            <div className="py-10 text-center">
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <BookPlus className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">提交成功！</h3>
                                <p className="text-slate-500">感谢你的建议，我们将尽快评估并补货。</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">想读哪本书？</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">书名 / 技术领域</label>
                                        <input 
                                            required 
                                            placeholder="例如：Rust 性能优化指南" 
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">补充说明 (可选)</label>
                                        <textarea 
                                            rows={3} 
                                            placeholder="告诉我们为什么想读这本书..." 
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 resize-none"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                                    >
                                        {status === "submitting" ? "提交中..." : "立即提交需求"} <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}