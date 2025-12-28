// import CartIcon from "@/components/CartIcon";

// export default function Navbar() {
//     return (
//         <nav className="flex justify-between items-center p-4 border-b">
//             <span className="font-bold text-lg">📚 Book Store</span>
//             <CartIcon />
//         </nav>
//     );
// }




// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { User, LogOut, LayoutDashboard } from "lucide-react";
// import { useState } from "react";

// export default function Navbar() {
//     const [showUserMenu, setShowUserMenu] = useState(false);

//     return (
//         <nav className="fixed top-0 left-0 w-full z-[80] px-6 py-4 flex justify-between items-center bg-white/50 backdrop-blur-xl border-b border-gray-100">
//             <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600">
//                 DEV<span className="text-slate-900">BOOK</span>
//             </Link>

//             <div className="flex items-center gap-6">
//                 {/* 之前的搜索快捷键提示 */}
//                 <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-xl text-gray-400 text-[10px] font-bold">
//                     <span>COMMAND + K</span>
//                 </div>

//                 {/* 用户头像入口 */}
//                 <div className="relative">
//                     <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setShowUserMenu(!showUserMenu)}
//                         className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
//                     >
//                         👨‍💻
//                     </motion.button>

//                     {/* 下拉菜单 */}
//                     {showUserMenu && (
//                         <>
//                             <div className="fixed inset-0 z-[-1]" onClick={() => setShowUserMenu(false)} />
//                             <motion.div
//                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2"
//                             >
//                                 <div className="px-4 py-3 border-b border-gray-50 mb-2">
//                                     <p className="text-xs font-black text-gray-900 leading-none mb-1">高级前端架构师</p>
//                                     <p className="text-[10px] text-gray-400 font-bold">Level 12</p>
//                                 </div>

//                                 <Link href="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 transition-colors">
//                                     <User className="w-4 h-4" /> 个人中心
//                                 </Link>
//                                 <Link href="/library" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl text-xs font-bold text-gray-600 transition-colors">
//                                     <LayoutDashboard className="w-4 h-4" /> 我的书架
//                                 </Link>
//                                 <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-2xl text-xs font-bold text-red-500 transition-colors">
//                                     <LogOut className="w-4 h-4" /> 退出登录
//                                 </button>
//                             </motion.div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }