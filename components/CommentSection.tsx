// 互动模块：CommentSection.tsx (社区讨论)
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommentSection() {
    const [comments, setComments] = useState([
        { id: 1, user: "高级前端老张", content: "这一节关于 Fiber 架构的解释非常透彻！建议大家配合源码一起看。", likes: 12, time: "2小时前" },
        { id: 2, user: "React萌新", content: "请问那个生命周期图谱在哪里可以下载高清版？", likes: 3, time: "5小时前" }
    ]);
    const [input, setInput] = useState("");
    const [replyTo, setReplyTo] = useState<string | null>(null); // 记录正在回复谁
    const inputRef = useRef<HTMLInputElement>(null);

    // 处理发表（包括新评论和回复）
    const handleSubmit = () => {
        if (!input.trim()) return;

        const newContent = replyTo ? `@${replyTo} ${input}` : input;
        const newComment = {
            id: Date.now(),
            user: "我",
            content: newContent,
            likes: 0,
            time: "刚刚"
        };

        setComments([newComment, ...comments]);
        setInput("");
        setReplyTo(null); // 发表后重置回复状态
    };

    // 点击回复按钮的逻辑
    const handleReplyClick = (userName: string) => {
        setReplyTo(userName);
        inputRef.current?.focus(); // 自动聚焦到输入框
    };

    return (
        <section className="mt-32 pt-16 border-t border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
                社区讨论 <span className="text-sm font-normal text-gray-400">({comments.length})</span>
            </h3>

            {/* 动态输入区域 */}
            <div className="mb-12 space-y-2">
                <AnimatePresence>
                    {replyTo && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center justify-between bg-blue-50 px-4 py-1.5 rounded-t-2xl border-x border-t border-blue-100"
                        >
                            <span className="text-[10px] font-bold text-blue-600">正在回复 @{replyTo}</span>
                            <button onClick={() => setReplyTo(null)} className="text-blue-400 hover:text-blue-600">✕</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`bg-gray-50 p-2 border border-gray-100 flex items-center gap-2 transition-all ${replyTo ? 'rounded-b-3xl' : 'rounded-3xl'}`}>
                    <input
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400"
                        placeholder={replyTo ? "写下你的回复..." : "分享你的见解或提问..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white text-xs font-black rounded-2xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                    >
                        {replyTo ? '回复' : '发表'}
                    </button>
                </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-8">
                {comments.map((comment, idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={comment.id}
                        className="flex gap-4 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs border border-gray-100 group-hover:rotate-6 transition-transform">👤</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-gray-900 text-sm">{comment.user}</span>
                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">{comment.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                {comment.content.startsWith('@') ? (
                                    <>
                                        <span className="text-blue-500 font-bold mr-1">{comment.content.split(' ')[0]}</span>
                                        {comment.content.split(' ').slice(1).join(' ')}
                                    </>
                                ) : comment.content}
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-[10px] font-black text-gray-400 hover:text-blue-500 transition-colors">👍 {comment.likes}</button>

                                {/* ⭐ 现在这个按钮能点动了 */}
                                <button
                                    onClick={() => handleReplyClick(comment.user)}
                                    className="text-[10px] font-black text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                    回复
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}