// // 导航栏
// "use client";

// import Link from "next/link";
// import { useCart } from "@/app/providers/CartProvider";
// import { usePathname } from "next/navigation";

// export default function Header() {
//     const { totalCount } = useCart();
//     const pathname = usePathname();

//     // 导航配置
//     const navItems = [
//         { name: "首页", href: "/" },
//         { name: "我的书架", href: "/library" },
//     ];

//     return (
//         <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
//             <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

//                 {/* Logo 部分 */}
//                 <Link href="/" className="flex items-center gap-2 group">
//                     <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
//                         <span className="text-xl">📚</span>
//                     </div>
//                     <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
//                         图书商城
//                     </span>
//                 </Link>

//                 {/* 右侧导航与功能区 */}
//                 <div className="flex items-center gap-8">
//                     <nav className="hidden md:flex items-center gap-6">
//                         {navItems.map((item) => (
//                             <Link
//                                 key={item.href}
//                                 href={item.href}
//                                 className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? "text-blue-600" : "text-gray-500"
//                                     }`}
//                             >
//                                 {item.name}
//                             </Link>
//                         ))}
//                     </nav>

//                     <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>

//                     {/* 购物车按钮 - 视觉重点 */}
//                     <Link href="/cart" className="relative group p-2">
//                         <div className="flex items-center gap-2">
//                             <span className="text-xl group-hover:scale-110 transition-transform">🛒</span>
//                             <span className="hidden sm:inline text-sm font-bold text-gray-700 group-hover:text-blue-600">
//                                 购物车
//                             </span>
//                         </div>

//                         {/* 购物车数量气泡 */}
//                         {totalCount > 0 && (
//                             <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
//                                 {totalCount > 99 ? "99+" : totalCount}
//                             </span>
//                         )}
//                     </Link>

//                     {/* 移动端菜单入口（可选，仅占位） */}
//                     <button className="md:hidden text-gray-500">
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    LogOut,
    LayoutDashboard,
    Settings,
    Search,
    ChevronDown
} from "lucide-react";

export default function Header() {
    const { totalCount } = useCart();
    const pathname = usePathname();
    const router = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // 监听路由变化，自动关闭菜单
    useEffect(() => {
        setShowUserMenu(false);
    }, [pathname]);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && searchValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleLogout = () => {
        setShowUserMenu(false);
        router.push("/login");
    };

    const navItems = [
        { name: "首页", href: "/" },
        { name: "我的书架", href: "/library" },
        { name: "广场", href: "/square" },
    ];

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

                {/* 1. Logo */}
                <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                    <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
                        <span className="text-xl">📚</span>
                    </div>
                    <span className="text-xl font-black tracking-tight text-gray-900">
                        图书商城
                    </span>
                </Link>

                {/* 2. 搜索框 */}
                <div className="flex-1 flex justify-start ml-12">
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full max-w-md focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索书籍、章节... (回车搜索)"
                            className="bg-transparent border-none outline-none text-xs font-bold w-full text-gray-900"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* 3. 右侧功能区 */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold transition-colors ${pathname === item.href ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative group p-2">
                            <span className="text-xl group-hover:scale-110 transition-transform">🛒</span>
                            {totalCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                    {totalCount}
                                </span>
                            )}
                        </Link>

                        {/* 用户菜单容器 */}
                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all relative z-[110]"
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm shadow-sm">
                                    👨‍💻
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <>
                                        {/* 核心修复：这个透明遮罩层使用了 fixed inset-0，并且 z-index 设为 105，
                                            它会铺满整个屏幕，点击它一定会触发 setShowUserMenu(false) */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-[105] bg-transparent cursor-default"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowUserMenu(false);
                                            }}
                                        />

                                        {/* 菜单面板：z-index 设为 110，高于遮罩层 */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-60 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 overflow-hidden z-[110]"
                                        >
                                            <div className="px-5 py-4 border-b border-gray-50 mb-1 bg-blue-50/30 rounded-t-[1.5rem]">
                                                <p className="text-xs font-black text-gray-900 mb-1">高级前端架构师</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 flex-grow bg-gray-200 rounded-full">
                                                        <div className="h-full bg-blue-600 w-[75%] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                                    </div>
                                                    <span className="text-[9px] font-black text-blue-600">Lv.12</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1 mt-1">
                                                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600">
                                                    <User className="w-4 h-4 text-blue-500" /> 个人中心
                                                </Link>
                                                <Link href="/rewards" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600">
                                                    <LayoutDashboard className="w-4 h-4 text-indigo-500" /> 福利中心
                                                </Link>
                                                <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600">
                                                    <Settings className="w-4 h-4 text-slate-500" /> 账号设置
                                                </Link>
                                            </div>

                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-1 hover:bg-red-50 rounded-2xl text-xs font-bold text-red-500 border-t border-gray-50">
                                                <LogOut className="w-4 h-4" /> 退出登录
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}