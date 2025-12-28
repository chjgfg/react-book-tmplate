// 全局搜索
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/providers/CartProvider";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, LayoutDashboard, Settings, Search } from "lucide-react";

export default function Header() {
    const { totalCount } = useCart();
    const pathname = usePathname();
    const [showUserMenu, setShowUserMenu] = useState(false);

    // 导航配置
    const navItems = [
        { name: "首页", href: "/" },
        { name: "我的书架", href: "/library" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

                {/* Logo 部分 */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
                        <span className="text-xl">📚</span>
                    </div>
                    <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        图书商城
                    </span>
                </Link>

                {/* 右侧导航与功能区 */}
                <div className="flex items-center gap-4 md:gap-8">
                    {/* 1. 搜索提示 (Cmd + K) - 新增 */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400">
                        <Search className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Cmd + K 快速搜索
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? "text-blue-600" : "text-gray-500"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>

                    {/* 功能区容器 */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* 购物车按钮 */}
                        <Link href="/cart" className="relative group p-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xl group-hover:scale-110 transition-transform">🛒</span>
                                <span className="hidden sm:inline text-sm font-bold text-gray-700 group-hover:text-blue-600">
                                    购物车
                                </span>
                            </div>
                            {totalCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                    {totalCount > 99 ? "99+" : totalCount}
                                </span>
                            )}
                        </Link>

                        {/* 2. 个人中心入口 - 新增 */}
                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center text-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                👨‍💻
                            </motion.button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <>
                                        {/* 透明遮罩用于点击空白处关闭 */}
                                        <div
                                            className="fixed inset-0 z-[-1]"
                                            onClick={() => setShowUserMenu(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2 overflow-hidden"
                                        >
                                            <div className="px-5 py-4 border-b border-gray-50 mb-1">
                                                <p className="text-xs font-black text-gray-900 mb-1">高级前端架构师</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 flex-grow bg-gray-100 rounded-full">
                                                        <div className="h-full bg-blue-500 w-[75%] rounded-full" />
                                                    </div>
                                                    <span className="text-[9px] font-bold text-blue-600 uppercase">Lv.12</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 transition-colors"
                                                >
                                                    <User className="w-4 h-4 text-blue-500" /> 个人中心
                                                </Link>
                                                <Link
                                                    href="/library"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 transition-colors"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 text-indigo-500" /> 我的书架
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4 text-slate-500" /> 账号设置
                                                </Link>
                                            </div>

                                            <button className="w-full flex items-center gap-3 px-4 py-3 mt-1 hover:bg-red-50 rounded-2xl text-xs font-bold text-red-500 transition-colors border-t border-gray-50">
                                                <LogOut className="w-4 h-4" /> 退出登录
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 移动端菜单入口 */}
                    <button className="md:hidden text-gray-500 p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}