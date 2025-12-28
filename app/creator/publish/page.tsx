// 发布作品子页面
"use client";

import { useState, useCallback, useMemo } from "react";
import { Send, Image as ImageIcon, Hash, Sparkles, Eye, Code } from "lucide-react";
import BackButton from "@/components/BackButton";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";

// 重要：SimpleMDE 必须在客户端加载，否则会报 window is not defined
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function PublishPage() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    

    // 编辑器配置
    const editorOptions = useMemo(() => {
        return {
            spellChecker: false,
            autofocus: false,
            placeholder: "使用 Markdown 记录你的技术思考...",
            status: ["lines", "words", "cursor"],
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            },
            // 隐藏自带的丑工具栏，我们手动在外面做漂亮按钮
            toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "table", "|", "preview", "side-by-side", "fullscreen"],
            minHeight: "400px",
        };
    }, []);

    const onChange = useCallback((value: string) => {
        setContent(value);
    }, []);

    const handlePublish = () => {
        if (!title || !content) {
            alert("标题和内容不能为空哦！");
            return;
        }

        // 撒花反馈
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#2563eb', '#60a5fa']
        });
        
        console.log("发布内容:", { title, content });
        // 此处调用你的 API
    };

    return (
        // <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
        <div className="min-h-screen bg-[#ffffff] pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <BackButton />

                <div className="bg-white rounded-[3rem] p-10 mt-10 shadow-sm border border-slate-100 relative overflow-hidden">
                    {/* 装饰性背景 */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 -mr-32 -mt-32" />

                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">创作中心 / 新作品</h1>
                        </div>
                        
                        <button 
                            onClick={handlePublish}
                            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                            立即发布 <Send className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* 标题输入 */}
                        <div className="relative group">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="在这里输入一个震撼的标题..."
                                className="w-full text-4xl font-black placeholder:text-slate-200 outline-none border-none focus:ring-0 bg-transparent transition-all"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all group-focus-within:w-20" />
                        </div>

                        {/* 自定义 Markdown 提示栏 */}
                        <div className="flex items-center justify-between py-4 border-y border-slate-50">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">
                                    <ImageIcon className="w-4 h-4" /> 图片
                                </button>
                                <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">
                                    <Code className="w-4 h-4" /> 代码块
                                </button>
                                <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">
                                    <Hash className="w-4 h-4" /> 标签
                                </button>
                            </div>
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                <Eye className="w-3 h-3" /> 支持 Markdown 实时预览
                            </div>
                        </div>

                        {/* Markdown 编辑器 */}
                        <div className="prose prose-slate max-w-none custom-mde">
                            <SimpleMDE 
                                value={content} 
                                onChange={onChange} 
                                options={editorOptions as any} 
                            />
                        </div>
                    </div>
                </div>

                {/* 底部小贴士 */}
                <div className="mt-8 px-10 flex items-center gap-4 text-slate-400">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <p className="text-xs font-bold uppercase tracking-widest">内容已实时保存至草稿箱</p>
                </div>
            </div>

            {/* 自定义编辑器样式覆盖 */}
            <style jsx global>{`
                .custom-mde .CodeMirror {
                    border: none !important;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 16px;
                    line-height: 1.8;
                    color: #475569;
                    background: transparent !important;
                }
                .custom-mde .editor-toolbar {
                    border: none !important;
                    opacity: 0.6;
                    transition: opacity 0.3s;
                    padding-left: 0;
                    padding-right: 0;
                }
                .custom-mde .editor-toolbar:hover {
                    opacity: 1;
                }
                .custom-mde .editor-preview-active-side {
                    // background: #F8FAFC !important;
                    background: #ffffff !important;
                    border: none !important;
                    padding: 30px !important;
                }
                .custom-mde .CodeMirror-scroll {
                    min-height: 400px;
                }
            `}</style>
        </div>
    );
}