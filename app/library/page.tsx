"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import KnowledgeGraph from "@/components/KnowledgeGraph";

export default function LibraryPage() {
    const [books, setBooks] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("library");
        if (stored) {
            setBooks(JSON.parse(stored));
        }
    }, []);

    // 删除书籍逻辑
    const handleDelete = (bookId: string) => {
        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
        localStorage.setItem("library", JSON.stringify(updatedBooks));
    };

    // 空书架状态
    if (books.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-32 text-center animate-in fade-in zoom-in duration-700">
                <div className="text-8xl mb-6 opacity-20">🏜️</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">书架空空如也</h2>
                <p className="text-gray-400 mb-8">你还没有拥有任何书籍，知识的荒原正在等待耕耘。</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                >
                    去商城选购
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 pb-20">
            {/* 顶部标题与统计 */}
            <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        我的书架 <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{books.length} 本</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">这里存放着你开启的每一段技术旅程</p>
                </div>



            </div>

            <div className="mb-12">
                <KnowledgeGraph />
            </div>
            
            {/* 书架网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="group relative bg-white rounded-2xl p-5 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-5"
                    >
                        {/* 左侧：微缩封面 */}
                        <div className={`w-20 h-28 rounded-lg shadow-md flex-shrink-0 bg-gradient-to-br ${book.id % 2 === 0 ? 'from-blue-600 to-indigo-700' : 'from-slate-700 to-slate-900'
                            } flex flex-col items-center justify-center p-2 text-center text-white`}>
                            <span className="text-xl mb-1">📖</span>
                            <span className="text-[8px] font-bold leading-tight line-clamp-2 opacity-80">{book.title}</span>
                        </div>

                        {/* 右侧：书籍信息与操作 */}
                        <div className="flex flex-col justify-between flex-grow py-1">
                            <div>
                                <h2 className="font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                    {book.title}
                                </h2>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-grow h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-1/3 rounded-full"></div> {/* 模拟进度 */}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">已读 32%</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <Link
                                    href={`/reader/${book.id}`}
                                    className="text-xs font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    继续阅读 →
                                </Link>

                                {/* 危险操作设为隐蔽的小图标 */}
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                    title="从书架移除"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* 饰品：已拥有标记 */}
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                            OWNED
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}