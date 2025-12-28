"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    ShieldCheck,
    Eye,
    CloudUpload,
    Globe,
    Settings as LucideSettings,
    Smartphone,
    Check
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    // --- 新增：偏好设置的状态管理 ---
    const [fontSize, setFontSize] = useState("中");
    const [notifications, setNotifications] = useState(true);
    const [syncEnabled, setSyncEnabled] = useState(false);
    const [theme, setTheme] = useState("明亮");

    const tabs = [
        { id: "profile", name: "个人信息", icon: <User className="w-4 h-4" /> },
        { id: "security", name: "账号安全", icon: <ShieldCheck className="w-4 h-4" /> },
        { id: "preference", name: "偏好设置", icon: <SettingsIcon className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">账号设置</h1>
                    <p className="text-gray-400 text-sm mt-1">管理您的个人资料、安全偏好和系统设置。</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* 左侧：标签导航 */}
                    <aside className="lg:col-span-3 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                                    }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </aside>

                    {/* 右侧：主内容区域 */}
                    <main className="lg:col-span-9 space-y-6">
                        {/* 1. 个人资料模块 (逻辑已存在，增加简单的提交反馈) */}
                        {activeTab === "profile" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-4xl border-4 border-white shadow-lg overflow-hidden">
                                            👨‍💻
                                        </div>
                                        <button className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity flex items-center justify-center">
                                            <CloudUpload className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">更换头像</h4>
                                        <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG 或 GIF 格式。</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">用户名</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none" defaultValue="高级前端架构师" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">电子邮箱</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="email" className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none" defaultValue="dev@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button onClick={() => alert('设置已保存')} className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:shadow-xl transition-all active:scale-95">
                                        保存修改
                                    </button>
                                </div>
                            </motion.div>
                        )}


                        {/* --- 2. 账号安全模块 (补全这里) --- */}
                        {activeTab === "security" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                {/* 修改密码 */}
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                                    <h4 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-red-500" /> 修改登录密码
                                    </h4>
                                    <div className="space-y-4 max-w-md">
                                        <input type="password" placeholder="当前密码" className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                        <input type="password" placeholder="设置新密码" className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all">更新密码</button>
                                    </div>
                                </div>

                                {/* 两步验证 */}
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900">两步验证 (2FA)</h4>
                                            <p className="text-xs text-gray-400 mt-1">登录时需要输入手机验证码，保护账号安全。</p>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black hover:bg-slate-800 transition-all">开启保护</button>
                                </div>

                                {/* 登录设备管理 */}
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                                    <h4 className="text-sm font-black text-gray-900 mb-6">活跃的登录设备</h4>
                                    <div className="space-y-4">
                                        {[
                                            { device: "MacBook Pro", location: "北京, 中国", status: "当前在线", icon: "💻" },
                                            { device: "iPhone 15 Pro", location: "上海, 中国", status: "2天前登录", icon: "📱" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl">{item.icon}</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{item.device}</p>
                                                        <p className="text-[10px] text-gray-400">{item.location} • {item.status}</p>
                                                    </div>
                                                </div>
                                                {i !== 0 && <button className="text-[10px] font-black text-red-500 hover:underline">下线设备</button>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. 偏好设置模块 (重点：交互补全) */}
                        {activeTab === "preference" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                                    <h4 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-blue-600" /> 阅读体验
                                    </h4>

                                    <div className="space-y-8">
                                        {/* 字体大小：点击切换选中状态 */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">默认字体大小</p>
                                                <p className="text-xs text-gray-400 mt-1">设置阅读器默认显示的文字大小。</p>
                                            </div>
                                            <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-1">
                                                {['小', '中', '大'].map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setFontSize(size)}
                                                        className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${fontSize === size
                                                            ? 'bg-white shadow-md text-blue-600 scale-105'
                                                            : 'text-gray-400 hover:text-gray-600'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-[1px] bg-gray-50" />

                                        {/* 通知开关：点击切换背景色和滑块位置 */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">新章节通知</p>
                                                <p className="text-xs text-gray-400 mt-1">开启后将通过系统推送接收书籍更新。</p>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(!notifications)}
                                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${notifications ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={{ x: notifications ? 24 : 0 }}
                                                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                                                />
                                            </button>
                                        </div>

                                        <div className="h-[1px] bg-gray-50" />

                                        {/* 进度同步 */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">跨设备同步进度</p>
                                                <p className="text-xs text-gray-400 mt-1">在所有设备上同步您的阅读历史。</p>
                                            </div>
                                            <button
                                                onClick={() => setSyncEnabled(!syncEnabled)}
                                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${syncEnabled ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={{ x: syncEnabled ? 24 : 0 }}
                                                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 主题选择：点击切换边框颜色 */}
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                                    <h4 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-indigo-500" /> 显示与主题
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['明亮', '深色', '系统'].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTheme(t)}
                                                className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all relative ${theme === t
                                                    ? 'border-blue-600 bg-blue-50/30'
                                                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {theme === t && (
                                                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                )}
                                                <div className={`w-full h-12 rounded-xl shadow-inner ${t === '深色' ? 'bg-slate-900' :
                                                    t === '明亮' ? 'bg-white border border-gray-100' :
                                                        'bg-gradient-to-r from-white to-slate-900'
                                                    }`} />
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

function SettingsIcon(props: any) {
    return <LucideSettings {...props} />;
}