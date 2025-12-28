// 阅读主题切换 (Color Themes)
"use client";

import { useState, useEffect } from "react";

type Theme = "paper" | "eye-care" | "night" | "ocean";

const THEMES: Record<Theme, { name: string; class: string; bg: string }> = {
    paper: { name: "纸张", class: "bg-[#FDFDFD] text-gray-900", bg: "#FDFDFD" },
    "eye-care": { name: "护眼", class: "bg-[#F1EAD0] text-[#5C4B37]", bg: "#F1EAD0" },
    night: { name: "夜间", class: "bg-[#1A1A1A] text-gray-300", bg: "#1A1A1A" },
    ocean: { name: "深海", class: "bg-[#0F172A] text-blue-100", bg: "#0F172A" },
};

export default function ReadingConfig({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSize] = useState(18);
    const [lineHeight, setLineHeight] = useState(1.8);
    const [theme, setTheme] = useState<Theme>("paper");
    const [mounted, setMounted] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        setMounted(true);
        const config = localStorage.getItem("reader-config");
        if (config) {
            const { size, theme: t, lh } = JSON.parse(config);
            if (size) setFontSize(size);
            if (t) setTheme(t);
            if (lh) setLineHeight(lh);
        }

        const updateScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setCompletion(Number((window.scrollY / scrollHeight).toFixed(2)) * 100);
            }
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("reader-config", JSON.stringify({ size: fontSize, theme, lh: lineHeight }));
        }
    }, [fontSize, theme, lineHeight, mounted]);

    if (!mounted) return <div className="bg-[#FDFDFD] min-h-screen">{children}</div>;

    return (
        <div
            className={`relative min-h-screen transition-colors duration-500 ${THEMES[theme].class}`}
            style={{
                "--reader-font-size": `${fontSize}px`,
                "--reader-line-height": lineHeight
            } as React.CSSProperties}
        >
            {/* 顶部进度条 */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${completion}%` }} />
            </div>

            {/* 环境设置按钮 */}
            <button
                onClick={() => setShowPanel(!showPanel)}
                className="fixed right-6 bottom-10 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition-all text-xl"
            >
                ⚙️
            </button>

            {/* 设置面板 */}
            {showPanel && (
                <div className="fixed right-6 bottom-24 z-50 w-72 bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-2xl rounded-3xl p-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">阅读主题</p>
                            <div className="grid grid-cols-4 gap-2">
                                {Object.entries(THEMES).map(([id, t]) => (
                                    <button
                                        key={id}
                                        onClick={() => setTheme(id as Theme)}
                                        className={`h-8 rounded-lg border-2 transition-all ${theme === id ? 'border-blue-500' : 'border-transparent'}`}
                                        style={{ backgroundColor: t.bg }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex justify-between">
                                字体大小 <span>{fontSize}px</span>
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="flex-1 bg-gray-100 hover:bg-gray-200 h-8 rounded-lg font-bold text-gray-600">-</button>
                                <button onClick={() => setFontSize(Math.min(32, fontSize + 1))} className="flex-1 bg-gray-100 hover:bg-gray-200 h-8 rounded-lg font-bold text-gray-600">+</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex justify-between">
                                行距 <span>{lineHeight}</span>
                            </p>
                            <input
                                type="range" min="1.4" max="2.4" step="0.1"
                                value={lineHeight}
                                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}