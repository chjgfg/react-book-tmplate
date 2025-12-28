// 登录
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Lock, ArrowRight, Github, Chrome,
    Sparkles, X, ShieldCheck, CheckCircle2, Command
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const router = useRouter();


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // 模拟登录成功后的反馈
        setTimeout(() => {
            setIsLoading(false);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#ffffff']
            });
        }, 1500);
        router.push("/library");
    };


    return (
        <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-6 selection:bg-blue-100">
            {/* 装饰性背景：流光动效 */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">

                {/* 左侧：品牌视觉区 */}
                <div className="hidden lg:flex bg-slate-900 p-16 flex-col justify-between relative overflow-hidden">
                    <div className="z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-12 shadow-2xl shadow-blue-500/40"
                        >
                            <Command className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-black text-white leading-[1.1] tracking-tighter"
                        >
                            构建未来，<br />
                            <span className="text-blue-500 italic">从这里启程。</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 text-slate-400 font-medium leading-relaxed max-w-xs"
                        >
                            登录以访问您的个性化工作台、勋章墙及开发者社区。
                        </motion.p>
                    </div>

                    <div className="z-10">
                        <div className="flex -space-x-3 mb-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black">
                                    {i === 4 ? "+2k" : "👤"}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">超过 50,000 名极客已加入</p>
                    </div>

                    {/* 装饰性背景圆 */}
                    <div className="absolute top-[20%] right-[-20%] w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                {/* 右侧：登录表单区 */}
                <div className="p-12 md:p-20 flex flex-col justify-center relative">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">欢迎回来</h2>
                        <p className="text-slate-400 font-medium mt-2 text-sm">还没有账号? <Link href="/register" className="text-blue-600 font-black hover:underline">立即注册</Link></p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">电子邮箱</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="architect@geekhub.com"
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">访问密码</label>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotOpen(true)}
                                    className="text-[10px] font-black text-blue-600 uppercase hover:text-blue-700 transition-colors"
                                >
                                    忘记密码?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isLoading ? "安全验证中..." : "立即进入工作台"} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-12">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                            <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">第三方快捷登录</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="text-xs font-black">GitHub</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                                <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="text-xs font-black">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 忘记密码弹窗 */}
            <AnimatePresence>
                {isForgotOpen && (
                    <ForgotPasswordModal onClose={() => setIsForgotOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}

// --- 忘记密码 Modal 组件 ---
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                className="relative w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-10 right-10 p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                    <X className="w-6 h-6" />
                </button>

                {step === 1 ? (
                    <div>
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">安全验证</h3>
                        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                            请输入您的账号邮箱，我们将发送重置指令。
                        </p>

                        <div className="space-y-6">
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="email"
                                    placeholder=" architect@example.com"
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
                                />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95"
                            >
                                发送验证邮件
                            </button>
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-6">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">指令已发出</h3>
                        <p className="text-slate-500 font-medium mb-10 px-4">
                            重置链接已发送。请在 15 分钟内通过邮箱中的链接完成重置。
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all active:scale-95"
                        >
                            返回登录界面
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}