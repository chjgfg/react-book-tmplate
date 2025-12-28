// 注册
"use client";

import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100"
            >
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">创建新账号</h2>
                    <p className="text-slate-400 font-medium text-sm px-6">开启您的技术成长之旅，只需 30 秒。</p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">用户名</label>
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="极客 ID"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">邮箱地址</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">设置密码</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="password"
                                placeholder="至少 8 位字符"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-bold text-blue-900 leading-relaxed">
                            注册即代表您同意我们的 <span className="underline">服务协议</span> 与 <span className="underline">隐私政策</span>，并默认加入社区成长计划。
                        </p>
                    </div>

                    <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        创建账号 <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <p className="mt-8 text-center text-sm font-bold text-slate-400">
                    已经有账号? <Link href="/login" className="text-blue-600 hover:underline">返回登录</Link>
                </p>
            </motion.div>
        </div>
    );
}